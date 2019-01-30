import React, { Component } from 'react';

import classes from './Modal.css';

import Aux from '../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return(
            <Aux>
                <Backdrop handleClick={this.props.handleModal} show={this.props.show} />
                <div className={[classes.Modal, this.props.show ? classes.Show : ''].join(' ')}>
                    {this.props.children}
                </div> 
            </Aux>
        );
    }
}

export default Modal;