import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions/streams";
import { changePath } from "../../actions/header";

class StreamCreate extends React.Component {
  renderInput({ input, label, meta }) {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {meta.touched ? (
          <div className="ui error message">{meta.error}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  onSubmit = async (formValues) => {
    let query = {
      idToken: this.props.token,
      userInstance: this.props.userInstance,
      ...formValues,
    };
    await this.props.createStream(query);
    this.props.changePath("/streams/owned");
    this.props.history.push("/streams/owned");
  };

  render() {
    return (
      <>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <p>
          You can use{" "}
          <a target="_blank" href="https://obsproject.com/">
            OBS
          </a>{" "}
          or
          <a target="_blank" href="https://www.xsplit.com/">
            XSplit
          </a>{" "}
          to Live stream. If you're using OBS, go to Settings > Stream and
          select Custom from service dropdown. Enter{" "}
          <b>rtmp://127.0.0.1:1935/live</b> in server input field. Also, add
          your stream key for a given stream found in "My Streams".
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token, userInstance: state.auth.userInstance };
};

const validate = (formValues) => {
  const errors = {};
  //error properties must match name is field components
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate: validate,
})(StreamCreate);

export default connect(mapStateToProps, { createStream, changePath })(
  formWrapped
);
