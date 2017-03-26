import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';



class SignupPage extends Component{

    renderField(field) {
        return(
            
            <fieldset className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-danger' : ''}`}>
                <label>{field.label}</label>
                <input {...field.input} type={field.type} className='form-control'/>
                {field.meta.touched && field.meta.error && 
                <div className='form-control-feedback'>{field.meta.error}</div>}
            </fieldset>
        );
    }

    handleFormSubmit(formProps) {
        // Call action creator to sign up the user
        this.props.signupUser(formProps);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className='alert alert-danger'>
                    <strong>Error: </strong>{this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
       const { handleSubmit, valid, submitting } = this.props;
        return(
            <div className='container'>
                <div className="col-xs-12 col-md-10 offset-md-1 page">
                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Field label='Email:' name="email" type='email' component={this.renderField}/>
                        <Field label='Password:' name="password" type='password' component={this.renderField}/>
                        <Field label='Confirm Password:' name="passwordConfirm" type='password' component={this.renderField}/>
                        {this.renderAlert()}
                        <button type='submit' disabled={!valid || submitting} className='btn btn-primary'>Sign up</button>
                    </form>
                </div>
            </div>
        );
    }
}

function validate(formProps){
    const errors = {};

    if(!formProps.email){
        errors.email = 'Please enter an email';
    }
    if(!formProps.password){
        errors.password = 'Please enter a password';
    }
    if(!formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if(formProps.password !== formProps.passwordConfirm){
        errors.password = 'Passwords must match';
    }

    return errors;
}


const SignupForm = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(SignupPage);

function mapStateToProps(state){
    return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, actions)(SignupForm);

