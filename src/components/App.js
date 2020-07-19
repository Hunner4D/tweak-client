import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import PopUp from "./Popup";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

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
            render={({ history }) => <StreamCreate />}
          />
          <Route
            path="/streams/edit"
            exact
            render={({ history }) => <StreamEdit />}
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
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
