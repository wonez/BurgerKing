import React from 'react'

import classes from './SideDrawerItems.css';

import Logo from '../Navigation/Logo/Logo';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';

const SideDrawerItems = (props) =>{
    return(
        <div className={classes.SideDrawerItems}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <ul>
                <NavigationItem to='/burger-builder'>Burger Builder</NavigationItem>
                {props.auth  ? <NavigationItem to="/orders" >Orders</NavigationItem> : null }
                {!props.auth ? <NavigationItem to='/auth' >Authentication</NavigationItem>
                             : <NavigationItem to='/logout'>Logout</NavigationItem>}
            </ul>
        </div>
    )
}

export default SideDrawerItems;