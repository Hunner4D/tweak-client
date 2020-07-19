import React from "react";
import Popup from "reactjs-popup";

import { connect } from "react-redux";

const PopupComponent = (props) => {
  return (
    <Popup open={props.newUser} closeOnDocumentClick modal>
      <div>Popup content here !!</div>
    </Popup>
  );
};

const mapStateToProps = (state) => {
  return { newUser: state.auth.newUser };
};

export default connect(mapStateToProps)(PopupComponent);
