import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';



class SigninPage extends Component{

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
        this.props.signinUser(formProps);
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
                    <h2>Signin</h2>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Field label='Email:' name="email" type='email' component={this.renderField}/>
                        <Field label='Password:' name="password" type='password' component={this.renderField}/>
                        {this.renderAlert()}
                        <div className="form-actions">
                            <button disabled={!valid || submitting} type="submit" className="btn btn-primary">Submit</button>
                            <Link className="btn btn-link" to={'/signup'}>Signup</Link>
                        </div>
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

    return errors;
}


const SigninForm = reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
    validate
})(SigninPage);

function mapStateToProps(state){
    return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, actions)(SigninForm);