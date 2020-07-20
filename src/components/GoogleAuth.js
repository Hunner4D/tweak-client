import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/auth";
import { Menu } from "semantic-ui-react";

class GoogleAuth extends React.Component {
  componentDidMount() {
    //window states that this variable is only available in window scope
    //gives insane amount of google auth methods
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1084490200688-63h0sm7oejth3l43mfbs6hj9vu81s38l.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.auth.signOut()
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = async (isSignedIn) => {
    let user = await this.auth.currentUser.get();
    if (isSignedIn) {
      let id = user.Qt.JU;
      let username = user.Qt.Bd;
      let profileImage = user.Qt.MK;
      this.props.signIn({ id, username, profileImage });
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
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

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
