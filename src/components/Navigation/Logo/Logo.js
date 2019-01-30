import React from 'react';

import classes from './Logo.css';

import logoSrc from '../../../assets/img/burger-logo.png';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={logoSrc} alt='BurgerKing'/>
    </div>
)

export default Logo;