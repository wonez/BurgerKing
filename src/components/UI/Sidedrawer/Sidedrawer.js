import React from 'react';

import classes from './Sidedrawer.css'
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../hoc/Aux';

const Sidedrawer = (props) => {

    const sdClasses = [classes.Sidedrawer, classes.Hide];
    props.show && sdClasses.pop();

    return(
        <Aux>
            <Backdrop show={props.show} handleClick={props.handleBD}/>
            <div className={sdClasses.join(' ')}>
                {props.children}
            </div>
        </Aux>
    );
};

export default Sidedrawer;