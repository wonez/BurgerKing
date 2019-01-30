import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutItems from './CheckoutItems/CheckoutItems';
import { connect } from 'react-redux'


import classes from './Checkout.css';
import OrderDetails from './OrderDetails/OrderDetails';

class Checkout extends Component{

    continueBtn = () => {
        this.props.history.replace(`${this.props.match.path}/order-details`);
    }

    cancelBtn = () => {
        this.props.history.goBack();
    }

    render(){
        if(!this.props.ingredients)
            return <Redirect to='/'/>
                
        return(
            <div className={classes.Checkout}>
                <h1>Enjoy your burger</h1>
                <CheckoutItems  price={this.props.price}
                                continueBtn={this.continueBtn}
                                cancelBtn={this.cancelBtn}/>
                <Route path={`${this.props.match.path}/order-details`} component={OrderDetails} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        price: state.burgerMenu.price,
        ingredients: state.burgerMenu.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);