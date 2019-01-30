import React from 'react'

import classes from './Navigation.css';

import Logo from './Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import MenuButton from './MenuButton/MenuButton';

const Navigation = (props) => {

    return(
        <div className={classes.NavContainer}>
            <div className={classes.Navigation}>
                <MenuButton click={props.sdHandler}/>
                <Logo />
                <nav>
                    <NavigationItems auth={props.auth} />
                </nav>
            </div>
        </div>
    );
}

export default Navigation;