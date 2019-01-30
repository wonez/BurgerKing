import React from 'react';

import classes from './BurgerIngredient.css';

import Aux from '../../../hoc/Aux';

const BurgerIngredient = (props) => {

    let ingredient = null;

    switch(props.type){
        case 'bread-top': 
            ingredient = 
            <div className={classes['bread-top']}>
                <div className={classes['seed']} id={classes['one']}></div>
                <div className={classes['seed']} id={classes['two']}></div>
                <div className={classes['seed']} id={classes['three']}></div>
                <div className={classes['seed']} id={classes['four']}></div>
            </div>
            break;
        case 'bread-bottom': ingredient = <div className={classes['bread-bottom']}></div>
            break;
        case 'meat': ingredient = <div className = {classes['meat']}></div>
            break;
        case 'cheese': ingredient = <div className = {classes['cheese']}></div>
            break;
        case 'letuce': ingredient = <div className = {classes['letuce']}></div>
            break;
        case 'tomato': ingredient = <div className = {classes['tomato']}></div>
            break;
        default: ingredient = null;
    }

    return(
        <Aux>
            {ingredient}
        </Aux>
    );
}

export default BurgerIngredient;