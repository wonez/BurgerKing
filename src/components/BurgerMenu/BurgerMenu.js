import React, {Component} from 'react'
import { connect } from 'react-redux';

import classes from './BurgerMenu.css';

import { addIng, removeIng, getIngredients, setBuilt } from '../../store';

import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import ModalBurger from './ModalBurger/ModalBurger';
import Modal from '../UI/Modal/Modal';
import WithErrorModal from '../hoc/withErrorModal';
import axios from '../../axios-order';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../hoc/Aux';

export const PRICES = {
    cheese: 0.6,
    letuce: 0.3,
    tomato: 0.3,
    meat: 1.4
}

export class BurgerMenu extends Component {

    state = {
        saved: false,
        purchasing: false,
    }

    componentDidMount(){
        this.props.getIngredients();
        this.props.setBuilt(false);
    }

    handlePurchasing = () => {
        if(this.props.auth)
            this.setState({purchasing: !this.state.purchasing});
        else{
            this.props.setBuilt(true);
            this.props.history.push('/auth')
        }
    }

    handleContinue = () => {
        this.props.history.push('/checkout')
    }

    render(){

        let modalContent = <Spinner />
        if(this.props.ingredients){
             modalContent = <ModalBurger 
                                continue = {this.handleContinue}
                                cancel = {this.handlePurchasing}
                                price = {this.props.price}
                                ingredients = {this.props.ingredients} />
        }

        let burgerContent = <div style={{paddingTop: '150px'}}> <Spinner /> </div>
        if(this.props.ingredients){
            burgerContent = 
                    <div className={classes.Wraper}>
                        <Burger price={this.props.price} 
                                ingredients = {this.props.ingredients} />
                        <Controls purchasing={this.handlePurchasing}
                                ingredients = {this.props.ingredients}
                                auth={this.props.auth} 
                                disable={this.props.price.toFixed(2) === "3.00"} 
                                clickRemove={this.props.clickRemove}
                                clickAdd={this.props.clickAdd}/>
                    </div>
        }
        if (this.props.err){
            burgerContent = <h1 style={{textAlign: 'center', margin: "0", paddingTop: '200px'}}>No content to be shown</h1>
        }
            
        return(
            <Aux>
                <div className={classes.BurgerMenu}>
                    <Modal show={this.state.purchasing} handleModal={this.handlePurchasing}>
                        {modalContent}
                    </Modal>
                    <Modal show={this.state.saved} handleModal={() => {this.setState({saved: false})}}>
                        Item saved Successfully
                    </Modal>
                        {burgerContent}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerMenu.ingredients,
        price: state.burgerMenu.price,
        err: state.burgerMenu.err,
        auth: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        clickAdd: (ing) => dispatch(addIng(ing)),
        clickRemove: (ing) => dispatch(removeIng(ing)),
        getIngredients: () => dispatch(getIngredients()),
        setBuilt: (val) => dispatch(setBuilt(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorModal(BurgerMenu, axios));