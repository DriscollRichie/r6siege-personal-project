import React, { Component } from "react";
import "./Account.css";
import { connect } from "react-redux";
import axios from "axios";
import { updateUser, logoutUser } from "../../reducers/user-reducer";
import { MoonLoader } from "react-spinners";

class Account extends Component {
  state = {
    r6Username: "",
    r6Platform: "",
    r6PlayerProfile: [],
    playerFound: false,
    loading: false
  };
  componentDidMount = async () => {
    try {
      if (!this.props.user) {
        const { data } = await axios.get("/api/auth/check");
        this.props.updateUser(data.id, data.username);
      }
    } catch (err) {
      console.error("componentDidMount failed in Account.js:", err);
      if (err.response.status === 403) {
        this.props.history.push("/auth");
        console.log(err.response.status);
      }
    }
  };

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  logoutUser = async () => {
    try {
      await axios.post("/apit/auth/lougout");
      this.props.history.push("/auth");
      this.props.logoutUser();
    } catch (err) {
      console.error("logoutUser failed in Account.js:", err);
    }
  };

  getPlayerStats = async () => {
    let { r6Username, r6Platform } = this.state;
    this.handleChange("loading", true);
    try {
      let playerStats = await axios.post("/RainbowSixApi/playerstats", {
        r6Username,
        r6Platform
      });

      this.setState({
        r6PlayerProfile: { ...playerStats.data.player }
      });
      this.handleChange("playerFound", true);
      this.handleChange("loading", false);
    } catch (err) {
      console.error("getPlayerStats failed in Account.js");
    }
  };

  render() {
    return (
      <div className="account-container">
        <div className="sweet-loading">
          <MoonLoader color={"#123abc"} loading={this.state.loading} />
        </div>
        {this.props.user ? (
          <div className="account-content">
            <span>Hello {this.props.user.username || ""}</span>
            <button onClick={this.logoutUser}>Logout</button>
          </div>
        ) : null}
        <div className="dropdown">
          <input
            placeholder="Username"
            onChange={e => this.handleChange("r6Username", e.target.value)}
          />
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.r6Platform}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button
              onClick={() => this.handleChange("r6Platform", "ps4")}
              className="dropdown-item"
              href="#"
            >
              Playstation 4
            </button>
            <button
              onClick={() => this.handleChange("r6Platform", "xone")}
              className="dropdown-item"
              href="#"
            >
              Xbox One
            </button>
            <button
              onClick={() => this.handleChange("r6Platform", "uplay")}
              className="dropdown-item"
              href="#"
            >
              Uplay
            </button>
          </div>
          <button onClick={() => this.getPlayerStats()}>
            Get Player Stats
          </button>
        </div>
        {this.state.playerFound ? (
          <div className="player-stats-container">
            <span>Username: {this.state.r6PlayerProfile.username}</span>
            <span>Platform: {this.state.r6PlayerProfile.platform}</span>
            <span>
              Player level: {this.state.r6PlayerProfile.stats.progression.level}
            </span>
            <span>Casual Statistics:</span>
            <span>Wins: {this.state.r6PlayerProfile.stats.casual.wins}</span>
            <span>
              Losses: {this.state.r6PlayerProfile.stats.casual.losses}
            </span>
            <span>
              Win/Loss Ratio: {this.state.r6PlayerProfile.stats.casual.wlr}
            </span>
            <span>Kills: {this.state.r6PlayerProfile.stats.casual.kills}</span>
            <span>
              Deaths: {this.state.r6PlayerProfile.stats.casual.deaths}
            </span>
            <span>
              Kill/Death Ratio: {this.state.r6PlayerProfile.stats.casual.kd}
            </span>
            <span>
              Playtime: {this.state.r6PlayerProfile.stats.casual.playtime}
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  state => state,
  { updateUser, logoutUser }
)(Account);
