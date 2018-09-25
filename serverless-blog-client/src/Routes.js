import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NewPost from "./containers/NewPost";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/posts/new" exact component={NewPost} />
    <Route component={NotFound} />
  </Switch>;
