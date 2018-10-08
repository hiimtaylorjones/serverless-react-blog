import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import config from "./config";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "serverless-blog-api",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
