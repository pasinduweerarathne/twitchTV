// 14155923312-s58irp21l5ehi1jpu1v8ih2k83uloadf.apps.googleusercontent.com
// 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

import React, { Component } from "react";

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  /* we need to load the library when this page is rendered. this auth2 take some time to process this and get some additional js from google. so we can add a callback funciton. this callback function is going to run this process has been completed*/
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "14155923312-s58irp21l5ehi1jpu1v8ih2k83uloadf.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // when ever the signup is change it going to change the text without refreshing the page
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  // Figure out if the user is currently singed in
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button
          onClick={() => {
            this.auth.signOut();
          }}
          className="ui red google button"
        >
          <i className="google icon" />
          Sing Out
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            this.auth.signIn();
          }}
          className="ui red google button"
        >
          <i className="google icon" />
          Sing With Google
        </button>
      );
    }
  }

  // Print their authentication status on the screen

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
