import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
                            <NavigationItem to="/burger-builder" >Burger Builder</NavigationItem>
            {props.auth  ?  <NavigationItem to="/orders" >Orders</NavigationItem>  : null } 
            {!props.auth ?  <NavigationItem to="/auth" >Authorization</NavigationItem>
                         :  <NavigationItem to='/logout'>Logout</NavigationItem>}
        </ul>
    );
};

export default NavigationItems;