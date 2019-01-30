import React from 'react'
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const NavigationItem = (props) => {
    return(
        <li className={classes.NavigationItem} >
            <NavLink activeClassName={classes.Active}
                    to={props.to}>{props.children}</NavLink>
        </li>
    );
};

export default NavigationItem;