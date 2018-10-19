import React from "react";
import { Route, Switch } from "react-router-dom";
import BlogIndex from "./containers/BlogIndex";
import NewPost from "./containers/NewPost";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={BlogIndex} />
    <Route path="/posts/new" exact component={NewPost} />
    <Route component={NotFound} />
  </Switch>;
