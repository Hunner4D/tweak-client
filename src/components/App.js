import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import PopUp from "./Popup";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamsOwned from "./streams/StreamOwned";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Subscriptions from "./user/Subscriptions";

import { connect } from "react-redux";

const App = (props) => {
  const ifSignedIn = () => {
    if (props.isSignedIn) {
      return (
        <>
            <Route
              path="/streams/owned"
              exact
              render={({ history }) => <StreamsOwned history={history} />}
            />
            <Route
              path="/streams/new"
              exact
              render={({ history }) => <StreamCreate history={history} />}
            />
            <Route
              path="/streams/edit/:id"
              exact
              render={({ history, location }) => (
                <StreamEdit location={location} history={history} />
              )}
            />
            <Route
              path="/profile"
              exact
              render={({ history, location }) => (
                <Profile history={history} />
              )}
            />
            <Route
              path="/profile/edit/:id"
              exact
              render={({ history, location }) => (
                <EditProfile history={history} location={location} />
              )}
            />
            <Route
              path="/subscriptions"
              exact
              render={({ history, location }) => (
                <Subscriptions location={location} />
              )}
            />
        </>
      );
    }
  };

  return (
    <>
      <BrowserRouter>
        <div>
          <PopUp />
          <Route
            render={({ history, location }) => <Header history={history} />}
          />
          <div className="ui container">
            <Route
              path="/"
              exact
              render={({ history }) => <StreamList history={history} />}
            />
            <Route
              path="/streams/show/:id"
              exact
              render={({ history, location }) => (
                <StreamShow location={location} />
              )}
            />
            {ifSignedIn()}
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(App);
