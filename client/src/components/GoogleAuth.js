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
      return <div>I don't know if I signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am singed in!</div>;
    } else {
      return <div>I am not singed in</div>;
    }
  }

  // Print their authentication status on the screen

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
