import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import PopUp from "./Popup";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import EditProfile from "./user/EditProfile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <PopUp />
          <Route render={({ history }) => <Header history={history} />} />
          <div className="ui container">
            <Route
              path="/"
              exact
              render={({ history }) => <StreamList history={history} />}
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
              path="/streams/delete/:id"
              exact
              render={({ history, location }) => (
                <StreamDelete location={location} />
              )}
            />
            <Route
              path="/streams/show/:id"
              exact
              render={({ history, location }) => (
                <StreamShow location={location} />
              )}
            />
            <Route
              path="/profile/edit/:id"
              exact
              render={({ history }) => <EditProfile />}
            />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
