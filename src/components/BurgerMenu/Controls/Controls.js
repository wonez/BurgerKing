import React from 'react';

import classes from './Controls.css';

import Control from './Control/Control';

const Controls = (props) => {

    const controls = [
        { title: 'Cheese', value: 'cheese'},
        { title: 'Meat', value: 'meat'},
        { title: 'Letuce', value: 'letuce'},
        { title: 'Tomato', value: 'tomato'},
    ];

    const classNames = [classes.Purchase];
    !props.disable && classNames.push(classes.Ani);
    
    
    return(
        <div className={classes.Controls}>
            {controls.map( (ctrl) => {
                return <Control clickAdd={props.clickAdd}
                                disabled={!props.ingredients[ctrl.value]}
                                clickRemove={props.clickRemove}  
                                title={ctrl.title}
                                key={ctrl.title}
                                val={ctrl.value} />
            })}
            <button onClick={props.purchasing} 
                    className={classNames.join(' ')} 
                    disabled={props.disable}>
            {props.auth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
}

export default Controls;