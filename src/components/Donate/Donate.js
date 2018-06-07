import React, { Component } from "react";
import Checkout from "../Checkout/Checkout";

export default class Donate extends Component {
  state = {
    amount: 0
  };

  handleDonation(e) {
    this.setState({ amount: e });
  }

  render() {
    return (
      <div className="donate">
        <input onChange={e => this.handleDonation(e.target.value)} />
        <Checkout amount={+this.state.amount * 100} />
      </div>
    );
  }
}
