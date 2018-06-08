import React, { Component } from "react";
import axios from "axios";
import "./Thread.css";
import { connect } from "react-redux";
import { updateUser } from "../../reducers/user-reducer";

class Thread extends Component {
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

  handleChange = (key, prop) => {
    this.setState({ [key]: prop });
  };

  getTitle() {
    axios
      .get(`/api/forum/title_by_id/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ title: res.data.title });
      });
  }

  editPost = () => {
    this.setState({ editMode: true });
  };

  savePost = () => {
    let user_id = this.props.user.id;
    let { id } = this.props.match.params;
    let { initialPost } = this.state;
    axios
      .put(`/api/forums/threads/edit_thread/${id}`, { initialPost, user_id })
      .then(res => {
        console.log(res.data);
        this.setState({ editMode: false });
      });
  };

  componentDidMount() {
    // this.getInitialPost();
    // this.getTitle();
    
    axios.get(`/api/forums/thread/${this.props.match.params.id}`).then(res => {
      console.log('res.data', res.data)
      this.setState({ posts: res.data });
    });
    if (!this.props.user) {
      axios.get("/api/auth/check").then(res => {
        this.props.updateUser(res.data.id, res.data.username);
      });
    }
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
        {this.state.editMode ? (
          <div>
            <input
              onChange={e => this.handleChange("initialPost", e.target.value)}
            />
            <button onClick={this.savePost}>Save</button>
          </div>
        ) : (
          this.state.initialPost
        )}
        {this.props.user ? (
          <button onClick={this.editPost}>Edit Post</button>
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
