import React, {Component} from 'react';
import Aux from './Aux';
import Modal from '../UI/Modal/Modal';

const withErrorModal = (OtherComponent, axios) => {
    return class extends Component{

        state = {
            err: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({err: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({err: err});
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        handleBackdropClick = () => {
            this.setState({err: null});
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.err} handleModal={this.handleBackdropClick}>
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <OtherComponent {...this.props}/>
                </Aux>
            );
        };
    }
};

export default withErrorModal;