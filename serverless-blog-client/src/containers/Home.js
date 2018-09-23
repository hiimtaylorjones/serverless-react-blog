import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Serverless Blog Example</h1>
          <p>Here's a starter kit to creating a Serverless Blog with React and AWS!</p>
        </div>
      </div>
    );
  }
}
