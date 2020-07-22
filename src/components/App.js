import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import PopUp from "./Popup";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import EditProfile from "./user/EditProfile";
import StreamOwned from "./streams/StreamOwned";

import { connect } from "react-redux";

const App = (props) => {
  const ifSignedIn = () => {
    if (props.isSignedIn) {
      return (
        <>
          <Route
            path="/streams/owned"
            exact
            render={({ history }) => <StreamOwned history={history} />}
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
            path="/profile/edit/:id"
            exact
            render={({ history }) => <EditProfile />}
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
          <Route render={({ history, location }) => <Header history={history}/>} />
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
