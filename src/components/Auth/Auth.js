import React, { Component } from 'react'
import { connect } from 'react-redux';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

import axios from 'axios'

import { signUp, signIn } from '../../store/index';

import classes from './Auth.css';
import withErrorModal from '../hoc/withErrorModal';

class Auth extends Component {

    state = {
        form:{
            email:{
                inputtype: 'input',
                tagattributes: {
                    type: 'email',
                    placeholder: 'Your Email',
                    value:''
                },
                formValidationProps:{
                    validation:{
                        required: true,
                        email: true
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                }
            },
            password:{
                inputtype: 'input',
                tagattributes: {
                    type: 'password',
                    placeholder: 'Your Password',
                    value:''
                },
                formValidationProps:{
                    validation:{
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                }
            },
        },
        validForm: false,
        showModal: false,
    }

    inputHandler = (val, key) => {
        const form = {...this.state.form};
        form[key].tagattributes = {...form[key].tagattributes};
        form[key].tagattributes.value = val;
        
        const item = form[key];

        item.formValidationProps.valid = this.isFieldValid(item.tagattributes.value, item.formValidationProps.validation)
        item.touched = true;

        const validForm = this.isFormValid();
        this.setState({ form: form, validForm: validForm });
    }

    isFormValid = () => {
        let valid = true;
        for(let key in this.state.form){
            valid = valid && this.state.form[key].formValidationProps.valid;
        }
        return valid;
    }

    isFieldValid = (value, validation) => {

        let valid = true;

        if(validation.required){
            valid = valid && value.trim() !== '';
        }
        if(validation.email){
            valid = valid && /^[A-Za-z0-9.-_]+@[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)+$/.exec(value);
        }
        if(validation.minLength){
            valid = valid && value.length >= validation.minLength
        }

        return valid;
    }

    handleSignUp = () => {
        const args = [];
        for(let field in this.state.form){
            args.push(this.state.form[field].tagattributes.value);
        }
        this.props.signUp(...args, ()=>{this.setState({showModal: true})})
    }

    handleSignIn = () => {
        const args = [];
        for(let field in this.state.form){
            args.push(this.state.form[field].tagattributes.value);
        }
        this.props.signIn(...args);
    }

    handleModal = () => {
        this.setState({showModal: false})
    }


    render(){

        const formFieldsArray = [];
        for(let key in this.state.form){
            formFieldsArray.push({
                key: key,
                data: this.state.form[key]
            });
        }

        const formFields = formFieldsArray.map( (item) => {
            return <Input   key={item.key} 
                            input={(e)=> this.inputHandler(e.target.value, item.key) } 
                            invalid={!item.data.formValidationProps.valid}
                            touched={item.data.formValidationProps.touched}
                            shouldValidate={item.data.formValidationProps.shouldValidate}
                            {...item.data} />
        })

        return(
            <div className={classes.Auth}>
                <Modal handleModal={this.handleModal} show={this.state.showModal}>Account created Successfuly</Modal>
                {formFields}
                <Button click={this.handleSignIn} invalid={!this.state.validForm} btnType='Success'>Sign In</Button>
                <Button click={this.handleSignUp} invalid={!this.state.validForm} btnType='Danger'>Sign Up</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth.idToken !== null,
        built: state.burgerMenu.built
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (email, pw, cb) => dispatch(signUp(email, pw, cb)),
        signIn: (email, pw) => dispatch(signIn(email, pw)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorModal(Auth, axios));