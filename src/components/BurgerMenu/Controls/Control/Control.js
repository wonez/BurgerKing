import React from 'react'

import classes from './Control.css';

const Control = (props) => {
    return(
        <div className={classes.Control}>
            <h2>{props.title}</h2>
            <button data-val={props.val}
                    disabled={props.disabled} 
                    onClick={ () => props.clickRemove(props.val) } 
                    className={[classes.Btn, classes.Less].join(' ')}>Less</button>
                    
            <button data-val={props.val} 
                    onClick={ () => props.clickAdd(props.val) } 
                    className={classes.Btn}>More</button>
        </div>
    );
}

export default Control;