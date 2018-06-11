import React, { Component } from "react";
import "./newThreadReply.css";
import axios from "axios";
import {connect} from 'react-redux'

class newThreadReply extends Component {
  state = {
    reply: ""
  };
  handleChange = (key, prop) => {
    this.setState({ [key]: prop });
  };

  replyToPost = async () => {
    try {
      let { reply } = this.state;
      let { id } = this.props.match.params;
      await axios.post(`/api/forums/threadReply/${id}`, { reply });
      this.props.history.push(`/forums/thread/${id}`);
    } catch (err) {
      console.error("replyToPost method failed in newThreadReply.js:", err);
    }
  };
  render() {
    return (
      <div className="newThreadReply-container">
        <textarea className='newThreadReply-input' onChange={e => this.handleChange("reply", e.target.value)} />
        <button onClick={this.replyToPost}>Reply</button>
      </div>
    );
  }
}

export default connect(state => state, {})(newThreadReply)
