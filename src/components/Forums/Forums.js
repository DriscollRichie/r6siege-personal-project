import React, { Component } from "react";
import "./Forums.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Forums extends Component {
  constructor() {
    super();
    this.state = {
      threads: []
    };
  }

  componentDidMount() {
    axios.get("/api/forums/threads").then(res => {
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
    let threads = this.state.threads.map((elem, i) => {
      return (
        <Link
          className="link"
          to={`/forums/thread/${elem.id}`}
          key={`thread-${elem.id}`}
        >
          {i === 0 && <hr />}
          <div>{elem.title}</div>
          <hr />
        </Link>
      );
    });
    return (
      <div className="forums-container">
        <span>
          <div>Threads</div>
          <button onClick={this.redirectToNewThread}>Post new thread</button>
        </span>

        <div className="thread-container">{threads}</div>
      </div>
    );
  }
}

export default connect(
  state => state,
  {}
)(Forums);
