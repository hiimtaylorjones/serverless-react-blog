import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./BlogIndex.css";

export default class BlogIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
  }

  async componentDidMount() {
    try {
      const posts = await this.posts();
      this.setState({ posts });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }

  posts() {
    return API.get("posts", "/posts");
  }

  renderPostsList(posts) {
    return [{}].concat(posts).map(
      (post, i) =>
        <div className="post">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-body">
            <p>{post.body}</p>
          </div>
          <hr />
        </div>
    );
  }

  handlePostClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderPosts() {
    return (
      <div className="posts">
        <PageHeader>My Blog Posts</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderPostsList(this.state.posts)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="BlogIndex">
        {this.renderPosts()}
        <ListGroupItem
          key="new"
          href="/posts/new"
          onClick={this.handlePostClick}>
          <h4><b>{"\uFF0B"}</b>Write New Post</h4>
        </ListGroupItem>
      </div>
    );
  }
}
