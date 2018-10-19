import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewPost.css";

export default class NewPost extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      title: "",
      body: ""
    };
  }

  validateForm() {
    if (this.state.title === "") {
      return false;
    } else if (this.state.body === "") {
      return false;
    }
    return true;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await this.createPost({
        title: this.state.title,
        body: this.state.body
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createPost(post) {
    return API.post("posts", "/posts", {
      body: post
    });
  }

  render() {
    return (
      <div className="center NewPost">
        <h1>Write A New Post</h1>
        <h4>Use the form below to create the content you want to write about.</h4>
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              componentClass="input"
            />
          </FormGroup>
          <FormGroup controlId="body">
            <ControlLabel>Body</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.body}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Submit Content"
            loadingText="Creating Your Post..."
          />
        </form>
      </div>
    );
  }
}
