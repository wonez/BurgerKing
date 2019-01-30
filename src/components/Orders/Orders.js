import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-order';
import classes from './Orders.css';
import withErrorModal from '../hoc/withErrorModal';

import { getOrders } from '../../store/index';

import Order from './Order/Order';

class Orders extends Component {

    componentDidMount(){
        this.props.getOrders(this.props.token, this.props.id);
    }

    render(){
        let orders = <div style={{paddingTop: '30px'}}><Spinner /></div>

        if(this.props.loaded){
            if(this.props.orders.length > 0){
            orders = this.props.orders.map( (order, i) => {
                    return <Order key={i} ingredients={order.ingredients} price={(+order.price).toFixed(2)} />
            });
            } else if (this.props.orders.length === 0){
                orders = <div style={{paddingTop: '200px'}}>No orders to be shown</div>
            }
        }
        return(
            <div className={classes.Orders}>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderDetails.orders,
        loaded: state.orderDetails.loaded,
        token: state.auth.idToken,
        id: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token, id) => dispatch(getOrders(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorModal(Orders, axios));