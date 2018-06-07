import React, { Component } from "react";
import "./Forums.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

class Forums extends Component {
  constructor() {
    super();
    this.state = {
      threads: []
    };
  }

  componentDidMount() {
    axios.get("/api/forum/threads").then(res => {
      this.setState({ threads: res.data });
    });
  }

  redirectToNewThread = () => {
    if (!this.props.user) {
      this.props.history.push("/auth");
    } else {
      this.props.history.push("/forums/new/thread");
    }
  };

  render() {
    let threads = this.state.threads.map(elem => {
      return (
        <Link to={`/forums/thread/${elem.id}`} key={`thread-${elem.id}`}>
          <div className="thread-container">{elem.title}</div>
        </Link>
      );
    });
    return (
      <div className="forums-container">
        <button onClick={this.redirectToNewThread}>Post new thread</button>
        <span>Threads</span>
        {threads}
      </div>
    );
  }
}

export default connect(state => state, {})(Forums)
