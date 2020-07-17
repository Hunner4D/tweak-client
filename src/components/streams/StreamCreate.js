import React from "react";
import { Field, reduxForm } from "redux-form";
// Field = componenet, reduxForm = connect function
import { connect } from "react-redux";
import { createStream } from "../../actions/index";

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

  onSubmit = (formValues) => {
    let query = {
      userInstance: this.props.userInstance,
      ...formValues
    }
    this.props.createStream(query);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { userInstance: state.auth.userInstance }
}

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

export default connect(mapStateToProps, { createStream })(formWrapped);
