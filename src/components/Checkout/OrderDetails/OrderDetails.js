import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tryPostIngredients } from '../../../store';

import classes from './OrderDetails.css';
import axios from '../../../axios-order';
import withErrorModal from '../../hoc/withErrorModal'

import Button from '../../UI/Button/Button';
import Aux from '../../hoc/Aux';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';

class OrderDetails extends Component {
    resetFrom = () => {
        const form = {...this.state.form}
        Object.keys(form).slice(0,5).forEach( key => {
            form[key] = {...form[key]}
            form[key].tagattributes = {...form[key].tagattributes}
            form[key].tagattributes.value = '';
        });
        this.setState({
           form: form  
        })
    }
    state={
        form: {
            name:{
                inputtype: 'input',
                tagattributes: {
                    type: 'text',
                    placeholder: 'Your Name',
                    value:''
                },
                formValidationProps:{
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                }
            },
            phone:{
                inputtype: 'input',
                tagattributes: {
                    type: 'tel',
                    placeholder: '123-456-7890',
                    value:''
                },
                formValidationProps:{
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                }
            },
            email:{
                inputtype: 'input',
                tagattributes: {
                    type: 'email',
                    placeholder: 'email@example.com',
                    value:''
                },
                formValidationProps:{
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                }
            },
            street:{
                inputtype: 'input',
                tagattributes: {
                    type: 'text',
                    placeholder: 'Your Address',
                    value:''
                },
                formValidationProps:{
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                }
            },
            houseNum:{
                inputtype: 'input',
                tagattributes: {
                    type: 'number',
                    placeholder: 'House Number',
                    value:''
                },
                formValidationProps:{
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                }
            },
            delivery:{
                inputtype: 'select',
                tagattributes:{
                    value: 'fastest'
                },
                options: [
                    {value: 'fastest', viewValue: 'Fastest'},
                    {value: 'cheapest', viewValue: 'Cheapest'},
                ],
                formValidationProps:{
                    validation:{
                        required: true,
                    },
                    valid: true,
                    touched: false,
                    shouldValidate: false
                }
            },
        },
        validForm: false,
        showModal: false
    }

    handleOrder = ()=>{

        const deliveryData = {}
        for(let key in this.state.form){
            deliveryData[key] = this.state.form[key].tagattributes.value
        }
        this.props.tryPostIngredients({
            ingredients: this.props.ingredients,
            deliveryData: deliveryData,
            id: this.props.id
        }, this.props.token, () => {this.setState({showModal: true})});
    }

    handleModal = () => {
        this.setState({showModal: false});
        this.resetFrom();
    }
    
    inputHandler = (val, key) => {
        const form = {...this.state.form};
        form[key].tagattributes = {...form[key].tagattributes};
        form[key].tagattributes.value = val;
        
        const item = form[key];

        if(item.formValidationProps.validation.required){
            item.formValidationProps.valid = item.tagattributes.value.trim() !== '';
        }
        item.touched = true;

        const validForm = this.formValid();
        this.setState({ form: form, validForm: validForm });
    } 

    formValid = () => {
        const form = this.state.form;
        let formValid = true;
        for(let val in form){
            formValid = formValid && form[val].formValidationProps.valid;
        }
        return formValid;
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
        });

        let content = (
            <Aux>
                <h4>Your data: </h4>
                <form>
                    {formFields}
                    <Button invalid={!this.state.validForm} click={this.handleOrder} btnType="Success">ORDER</Button>
                </form> 
            </Aux>
        );

        if(this.props.loading)
            content = <Spinner /> 

        return(
            <Aux>
                <Modal show={this.state.showModal} handleModal={this.handleModal}>
                    Order placed Successfuly
                </Modal>
                <div className={classes.OrderDetails}>
                    {content}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerMenu.ingredients,
        err: state.orderDetails.err,
        loading: state.orderDetails.loading,
        token: state.auth.idToken,
        id: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryPostIngredients: (postdata, token, handleModal) => dispatch(tryPostIngredients(postdata, token, handleModal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorModal(OrderDetails, axios));