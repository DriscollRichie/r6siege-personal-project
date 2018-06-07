import React, { Component } from "react";
import axios from "axios";
import "./Thread.css";

export default class Thread extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      initialPost: "",
      title: "",
      editMode: false
    };
  }

  getInitialPost() {
    axios
      .get(`/api/forum/threads/initialPost/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ initialPost: res.data.initialPost });
      });
  }

  getTitle() {
    axios
      .get(`/api/forum/title_by_id/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ title: res.data.title });
      });
  }

  editPost = () => {
    this.setState({editMode: true})
  }

  componentDidMount() {
    this.getInitialPost();
    this.getTitle();
    axios.get(`/api/forum/thread/${this.props.match.params.id}`).then(res => {
      this.setState({ posts: res.data });
    });
  }

  render() {
    let posts = this.state.posts.map(elem => {
      return (
        <div className="post-container" key={elem.id}>
          {elem.content}
        </div>
      );
    });
    return (
      <div className="thread-container">
      {
        this.state.editMode ? (
        <input />
        ) : (
        this.state.initialPost
        )}
        <button onClick={this.editPost}>Edit Post</button>
        {posts}
      </div>
    );
  }
}
