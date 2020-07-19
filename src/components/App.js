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
    <div className="ui container">
      <BrowserRouter>
        <div>
          <PopUp />
          <Header />
          <Route path="/" exact render={({ history }) => <StreamList />} />
          <Route
            path="/streams/new"
            exact
            render={({ history }) => <StreamCreate history={history} />}
          />
          <Route
            path="/streams/edit/:id"
            exact
            render={({ history, location }) => <StreamEdit location={location}/>}
          />
          <Route
            path="/streams/delete"
            exact
            render={({ history }) => <StreamDelete />}
          />
          <Route
            path="/streams/show"
            exact
            render={({ history }) => <StreamShow />}
          />
          <Route path="/profile/edit" exact render={({ history }) => <EditProfile />} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
