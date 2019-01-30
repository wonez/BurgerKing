import React from 'react';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let burger = Object.keys(props.ingredients).map( (key, i) => {
       
        return Array.apply(null, Array(props.ingredients[key])).map((_, j)=>{
            return <BurgerIngredient key={key+i+j} type={key}></BurgerIngredient>
        })
    }).reduce( (acc, curr ) => {
        return acc.concat(curr);
    }, []);

   if(burger.length === 0){
       burger = <h3 style={{color: '#835528'}}>Start adding ingredients</h3>
   }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
                {burger}
            <BurgerIngredient type='bread-bottom'/>
            {props.price ? <h1 style={{color: '#835528', paddingTop: '30px'}}>{props.price.toFixed(2)}$</h1> : null}
        </div>
    );
}

export default Burger;