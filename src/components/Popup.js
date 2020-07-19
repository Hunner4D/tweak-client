import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import { connect } from "react-redux";
import { newUserFalse } from "../actions/auth";

const PopupComponent = (props) => {
  return (
    <Modal
      dimmer={"blurring"}
      open={props.newUser}
      onClose={props.newUserFalse}
    >
      <Modal.Header>Welcome to Tweak!</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={props.profileImage} />
        <Modal.Description>
          <Header>Hello{props.username ? ` ${props.username}` : "..."}</Header>
          <p>
            We've found the following image associated with your e-mail address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={props.newUserFalse}>
          Nope
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Yep, that's me"
          onClick={props.newUserFalse}
        />
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    newUser: state.auth.newUser,
    username: state.auth.username,
    profileImage: state.auth.profileImage,
  };
};

export default connect(mapStateToProps, { newUserFalse })(PopupComponent);
