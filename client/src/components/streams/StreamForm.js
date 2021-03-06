import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError = ({ error, touched }) => {
        //show only click of submit or onblur
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };
    renderInput = ({ input, label, meta }) => {
        // console.log(meta);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                <div>{this.renderError(meta)}</div>
            </div>

        );
    };

    onSubmit = (formValues) => {
        //console.log(formValues);
        //this.props.createStream(formValues);
        this.props.onSubmit(formValues);
    };

    render() {

        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title"></Field>
                <Field name="description" component={this.renderInput} label="Enter Description"></Field>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);

