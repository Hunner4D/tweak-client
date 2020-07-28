import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  TextArea,
} from "semantic-ui-react";

import { connect } from "react-redux";
import { editProfile } from "../../actions/auth";

const options = [
  { key: "Art", text: "Art", value: "Art" },
  { key: "ASMR", text: "ASMR", value: "ASMR" },
  { key: "Chat", text: "Chat Show", value: "Chat Show" },
  { key: "Games", text: "Games", value: "Games" },
  { key: "Podcast", text: "Podcast", value: "Podcast" },
  { key: "Music", text: "Music", value: "Music" },
];

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: false, error: false };
  }

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSelectChange = (e) => {
    this.setState({ ...this.state, category: e.target.innerText });
  };

  handleCheckbox = (e) => {
    this.setState({ ...this.state, checked: !this.state.checked });
  };

  handleSubmit = async () => {
    if (this.state.checked) {
      await this.props.editProfile({
        idToken: this.props.token,
        userInstance: this.props.instance,
        data: this.state,
      });
      this.props.history.push("/profile");
    } else {
      this.setState({ ...this.state, error: true });
    }
  };

  handleErrorClose = () => {
    this.setState({ ...this.state, error: false });
  };

  renderErrorMessage = () => {
    return (
      <Modal
        basic
        open={this.state.error}
        onClose={this.handleErrorClose}
        centered
      >
        <h3>Please agree to Terms and Conditions to proceed</h3>
      </Modal>
    );
  };

  render() {
    return (
      <>
        {this.renderErrorMessage()}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="username"
              label="Username"
              placeholder={this.props.location.state.username}
              onChange={this.handleInputChange}
            />
            {/* <Form.Field
            control={Input}
            label="Last name"
            placeholder="Last name"
          /> */}
            <Form.Field
              control={Select}
              name="category"
              label="Category"
              options={options}
              placeholder="..."
              onChange={this.handleSelectChange}
            />
          </Form.Group>
          {/* <Form.Group inline>
          <label>Quantity</label>
          <Form.Field
            control={Radio}
            label="One"
            value="1"
            checked={value === "1"}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label="Two"
            value="2"
            checked={value === "2"}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label="Three"
            value="3"
            checked={value === "3"}
            onChange={this.handleChange}
          />
        </Form.Group> */}
          <Form.Field
            control={TextArea}
            name="about"
            label="About"
            placeholder="Tell us more about you..."
            onChange={this.handleInputChange}
          />
          <Form.Checkbox
            inline
            label="I agree to the Terms and Conditions"
            required
            onChange={this.handleCheckbox}
            checked={this.state.checked}
          />

          <br />
          <Button fluid type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token, instance: state.auth.userInstance };
};

export default connect(mapStateToProps, { editProfile })(EditProfile);
