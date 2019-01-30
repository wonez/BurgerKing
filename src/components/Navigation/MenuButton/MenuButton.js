import React from 'react'

import classes from './MenuButton.css';

const MenuButton = (props) => {
    return(
        <div className={classes.MenuBurgerCont} onClick={props.click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default MenuButton;