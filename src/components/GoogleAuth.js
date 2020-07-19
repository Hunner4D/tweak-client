import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/auth";

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
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      console.log("sign in info here: ", this.auth.currentUser.get())
      let id = this.auth.currentUser.get().Qt.JU;
      let username = this.auth.currentUser.get().Qt.Bd;
      let profileImage = this.auth.currentUser.get().Qt.MK
      this.props.signIn({id, username, profileImage}); 
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
        <button
          className="ui purple google button"
          onClick={this.onSignOutClick}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui purple google button"
          onClick={this.onSignInClick}
        >
          <i className="google icon" />
          Sign In with Google
        </button>
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
