import React from 'react';

import classes from './ModalBurger.css';
import Aux from '../../hoc/Aux';
import Button from '../../UI/Button/Button';

const ModalBurger = (props) => {

    const ingredients = Object.keys(props.ingredients).map( (key) => {
        return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>
                        {key}
                    </span> : {props.ingredients[key]}
                </li>
        )
    });
    return(
        <Aux>
            <h3>Your order: </h3>
            <ul className={classes.ModalBurger}>
                {ingredients}
            </ul>
            <h2>{props.price.toFixed(2)}$</h2>
            <Button click={props.cancel} btnType='Danger'>CANCEL</Button>
            <Button click={props.continue} btnType='Success'>CONTINUE</Button>
        </Aux>
    );
}

export default ModalBurger;