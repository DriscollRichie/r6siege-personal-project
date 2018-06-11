import React, { Component } from "react";
import "./newThread.css";
import axios from "axios";
import { connect } from "react-redux";

class newThread extends Component {
  state = {
    title: "",
    initial_post: ""
  };

  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push("/auth");
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  createThread = async () => {
    console.log("button hit");
    try {
      let { title, initial_post } = this.state;
      let { id } = this.props.user;
      await axios.post("/api/forums/threads/new_thread", {
        title,
        initial_post,
        id
      });
      this.props.history.push('/forums')
    } catch (err) {
      console.error("createThread failed in newThread.js:", err);
    }
  };
  render() {
    return (
      <div className="post-container">
        <div className="title-container">
          <span>title: </span>
          <input
            className="title-input"
            onChange={e => this.handleChange("title", e.target.value)}
          />
        </div>
        <div className="intial_post-container">
          <textarea
            className="intial_post-input"
            onChange={e => this.handleChange("initial_post", e.target.value)}
          />
        </div>
        <button onClick={this.createThread}>Post</button>
      </div>
    );
  }
}

export default connect(
  state => state,
  {}
)(newThread);
