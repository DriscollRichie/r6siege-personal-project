import React, { Component } from "react";
import axios from "axios";
import "./Thread.css";
import { connect } from "react-redux";
import { updateUser } from "../../reducers/user-reducer";
import { Link } from "react-router-dom";
import Post from "../Post/Post";

class Thread extends Component {
  constructor() {
    super();
    this.state = {
      thread: { posts: [] },
      newThreadText: "",
      editThreadMode: false,
      loadedUser: false
    };
  }

  handleChange = (key, prop) => {
    this.setState({ [key]: prop });
  };

  editPost = () => {
    this.setState({ editThreadMode: true });
  };

  cancelPost = () => {
    this.setState({ editThreadMode: false });
  };

  updatePostText = (text, index) => {
    console.log("this.state.thread", this.state.thread);
    let postsCopy = [...this.state.thread.posts];
    postsCopy[index].post_text = text;
    this.setState({
      thread: Object.assign({}, this.state.thread, { posts: postsCopy })
    });
  };

  deletePostReply = (index) => {
    console.log('this.state.thread.posts', this.state.thread.posts)
    let postsCopy = [...this.state.thread.posts]
    postsCopy.splice(index)
    this.setState({
      thread: Object.assign({}, this.state.thread, { posts: postsCopy })
    });
    
  }

  deletePost = async () => {
    try {
      let user_id = this.props.user.id;
      let { id } = this.props.match.params;
      await axios.delete(`/api/forums/delete_thread/${id}`, { user_id });
      this.props.history.push("/forums");
    } catch (err) {
      console.error("deletePost method failed in Thread.js:", err);
    }
  };

  savePost = async () => {
    try {
      let user_id = this.props.user.id;
      let { id } = this.props.match.params;
      let { newThreadText } = this.state;
      const { data: thread } = await axios.put(
        `/api/forums/threads/edit_thread/${id}`,
        {
          newThreadText,
          user_id
        }
      );

      this.setState({
        editThreadMode: false,
        thread: Object.assign({}, this.state.thread, {
          thread_text: thread.initialPost
        }),
        newThreadText: ""
      });
    } catch (err) {
      console.error("savePost method failed in Thread.js:", err);
    }
  };

  componentDidMount = async () => {
    try {
      let { id } = this.props.match.params;
      const { data: thread } = await axios.get(`/api/forums/thread/${id}`);
      this.setState({ thread });
      if (!this.props.user) {
        const { data } = await axios.get("/api/auth/check");
        this.props.updateUser(data.id, data.username);
      }
      this.setState({ loadedUser: true });
    } catch (err) {
      console.error("componentDidMount failed in Thread.js:", err);
    }
  };
  render() {
    let posts = this.state.thread.posts.map((elem, i) => {
      return (
        <Post
          postData={elem}
          loadedUser={this.state.loadedUser}
          currentUser={this.props.user}
          params={this.props.match.params.id}
          postIndex={i}
          updatePostText={this.updatePostText}
          key={elem.post_id}
          deletePostReply={this.deletePostReply}
        />
      );
    });
    return (
      <div className="thread-container">
        {this.state.editThreadMode &&
        this.state.thread.thread_user_id === this.props.user.id ? (
          <div>
            <input
              onChange={e => this.handleChange("newThreadText", e.target.value)}
            />
            <button onClick={this.savePost}>Save</button>
            <button onClick={this.cancelPost}>Cancel</button>
          </div>
        ) : (
          this.state.thread.thread_text
        )}
        {this.state.loadedUser &&
        this.state.thread.thread_user_id === this.props.user.id ? (
          <div>
            <button onClick={this.editPost}>Edit Post</button>
            <button onClick={this.deletePost}>Delete Post</button>
          </div>
        ) : null}
        {this.state.loadedUser ? (
          <div>
            <Link to={`/forums/newReply/${this.props.match.params.id}`}>
              <button onClick={this.replyToPost}>Reply To Post</button>
            </Link>
          </div>
        ) : null}
        {posts}
      </div>
    );
  }
}

export default connect(
  state => state,
  { updateUser }
)(Thread);
