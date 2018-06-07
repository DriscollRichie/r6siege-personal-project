import React, { Component } from "react";
import r6Badge from "../../assets/r6-six-mobile-logo.png";
import "./Auth.css";
import axios from "axios";
import maestroImage from "../../assets/r6-operator-maestro_324452.png";
import alibiImage from "../../assets/r6-operator-alibi_324451.png";
import { updateUser } from "../../reducers/user-reducer";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  registerUser = () => {
    let { username, password } = this.state;
    axios.post("/api/auth/register", { username, password }).then(res => {
      this.props.updateUser(res.data.id, res.data.username);
      this.props.history.push("/account");
    });
  };

  loginUser = () => {
    let { username, password } = this.state;
    axios.post("/api/auth/login", { username, password }).then(res => {
      this.props.updateUser(res.data.id, res.data.username);
      this.props.history.push("/account");
    });
  };

  render() {
    return (
      <div className="auth-container">
        <div className="text-container">
          <span className="account-registration-text">
            Join the Rainbow Six Siege Community Today!
          </span>
        </div>
        <div className="main-container">
          <div className="maestro-image">
            <img src={maestroImage} alt="" width="600px" />
          </div>
          <div className="registration-container">
            <img src={r6Badge} alt="" width="80px" />
            <input
              placeholder="Username"
              onChange={e => this.handleInputChange("username", e.target.value)}
              value={this.state.username}
            />
            <input
              placeholder="Password"
              onChange={e => this.handleInputChange("password", e.target.value)}
              value={this.state.password}
            />
            <button onClick={this.registerUser}>Register</button>
            <span className="sign-in-text">Already have an account?</span>
            <button onClick={this.loginUser}>Sign in</button>
          </div>
          <div className="alibi-image">
            <img src={alibiImage} alt="" width="600px" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateUser })(Auth);
