// 14155923312-s58irp21l5ehi1jpu1v8ih2k83uloadf.apps.googleusercontent.com
// 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

import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../redux/actions";

class GoogleAuth extends Component {
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
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // when ever the signup is change it going to change the text without refreshing the page
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // passing the user id who logged in to the system as a parameter
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // Figure out if the user is currently singed in
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
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

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
