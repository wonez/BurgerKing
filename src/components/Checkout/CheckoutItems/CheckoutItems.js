import React from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Button from '../../UI/Button/Button';
import Burger from '../../BurgerMenu/Burger/Burger';

const checkoutItems = (props) => (
    <Aux>
        <Burger ingredients={props.ingredients} price={props.price}/>
        <Button click={props.continueBtn} btnType='Success'>CONTINUE</Button>
        <Button click={props.cancelBtn} btnType='Danger'>CANCEL</Button>
    </Aux>
)

const mapStateToProps = state => {
    return {
        ingredients: state.burgerMenu.ingredients
    }
}

export default connect(mapStateToProps)(checkoutItems);