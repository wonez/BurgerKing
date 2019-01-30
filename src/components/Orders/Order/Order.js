import React from 'react';

import classes from './Order.css';

const order = (props) => {

    let ingredients = null;

    if(props.ingredients){

        ingredients = Object.keys(props.ingredients).map((ing)=>{
            return <p key={ing}><span style={{textTransform: 'capitalize'}}>{ing}</span>: {props.ingredients[ing]}</p>
        });
    }

    if(!ingredients)
        return null;

    return(
        <div className={classes.Order}>
            <div className={classes.Border}>
                <div className={classes.InsideDiv}>
                    <b>Ingredients: </b>
                    {ingredients}
                </div>
                <b style={{color:'goldenrod'}}>{props.price}$</b>
            </div>
        </div>
    );
}

export default order;