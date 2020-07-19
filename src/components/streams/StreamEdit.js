import React from "react";

import { connect } from "react-redux";

const StreamEdit = (props) => {
  return (
    <>
      <div>StreamEdit</div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, ownProps };
};

export default connect(mapStateToProps)(StreamEdit);
