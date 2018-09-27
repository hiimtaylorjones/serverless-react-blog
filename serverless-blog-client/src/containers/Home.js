import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
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
        i !== 0
          ? <ListGroupItem
              key={posts.postId}
              href={`/notes/${post.postId}`}
              onClick={this.handlePostClick}
              header={post.title.trim().split("\n")[0]}
            >
              {"Created: " + new Date(post.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/posts/new"
              onClick={this.handlePostClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new post
              </h4>
            </ListGroupItem>
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
      <div className="Home">
        {this.renderPosts()}
      </div>
    );
  }
}
