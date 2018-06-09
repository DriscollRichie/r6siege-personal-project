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
      await axios.post(`/api/forums/postEdit/${id}}`, { post_id, post_text });
      console.log("sending post_text", this.state.post_text);
      console.log(this.props.postIndex);
      this.props.updatePostText(this.state.post_text, this.props.postIndex);
      this.toggleEdit();
    } catch (err) {
      console.error("saveChanges method failed in Post.js:", err);
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
            <button>Delete</button>
          </div>
        ) : null}
      </div>
    );
  }
}
