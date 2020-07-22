import React from "react";
import { connect } from "react-redux";
import { generateStreamKey } from "../../actions/auth";

const EditProfile = (props) => {
  const generateNewKey = () => {
    let query = {
      idToken: props.token,
      userInstance: props.userInstance,
    };
    props.generateStreamKey(query);
  };

  return (
    <>
      <h1>EditProfile</h1>
      {/* <div>{props.stream_key}</div> */}
      <button onClick={generateNewKey}>generate new stream key</button>
    </>
  );
};

const mapStateToProps = (state) => {
  const { stream_key, token, userInstance } = state.auth;

  return { stream_key, token, userInstance };
};

export default connect(mapStateToProps, { generateStreamKey })(EditProfile);
