import React from "react";
import { Menu } from "semantic-ui-react";

import { connect } from "react-redux";
import { signIn, signOut } from "../actions/auth";
import { clearStreams, fetchMultipleStreams } from "../actions/streams";

class GoogleAuth extends React.Component {
  componentDidMount() {
    //window states that this variable is only available in window scope
    //gives insane amount of google auth methods
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_OAUTH_CLIENT,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.auth.signOut();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = async (isSignedIn) => {
    if (isSignedIn) {
      let user = await this.auth.currentUser.get();
      let idToken = user[Object.keys(user)[1]].id_token;
      this.props.signIn(idToken);
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
    this.props.clearStreams();
    this.props.fetchMultipleStreams();
    this.props.history.push("/");
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <Menu.Item
          name="logout"
          onClick={this.onSignOutClick}
          icon={"google"}
        />
      );
    } else {
      return (
        <Menu.Item
          name="Sign in with google"
          onClick={this.onSignInClick}
          icon={"google"}
        />
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  clearStreams,
  fetchMultipleStreams,
})(GoogleAuth);
