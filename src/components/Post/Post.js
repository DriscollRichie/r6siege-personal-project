import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  state = {
    editMode: false,
    post_text: ""
  };

  toggleEdit = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  saveChanges = async () => {
    try {
      let id = this.props.params;
      let { post_id } = this.props.postData;
      let { post_text } = this.state;
      await axios.put(`/api/forums/postEdit/${id}}`, { post_id, post_text });
      this.props.updatePostText(this.state.post_text, this.props.postIndex);
      this.toggleEdit();
    } catch (err) {
      console.error("saveChanges method failed in Post.js:", err);
    }
  };

  deletePost = async () => {
    try {
      let { post_id } = this.props.postData;
      console.log("The post_id is:", post_id);
      const {data} = await axios.delete(`/api/forums/postDelete/${post_id}`);
      console.log("await data", data);
      this.props.deletePostReply(this.props.postIndex)
    } catch (err) {
      console.error("deletePost method failed in Post.js:", err);
    }
  };

  handleChange = (key, prop) => {
    this.setState({ [key]: prop });
  };

  render() {
    let { postData, loadedUser, currentUser } = this.props;
    return (
      <div className="post-container">
        <span>{postData.post_text}</span>
        {loadedUser && postData.post_user_id === currentUser.id ? (
          <div>
            <button onClick={this.toggleEdit}>Edit</button>
            {this.state.editMode ? (
              <div>
                <input
                  onChange={e => this.handleChange("post_text", e.target.value)}
                />
                <button onClick={this.saveChanges}>Save Changes</button>
              </div>
            ) : null}
            <button onClick={this.deletePost}>Delete</button>
          </div>
        ) : null}
      </div>
    );
  }
}
