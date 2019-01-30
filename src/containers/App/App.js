import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'

import { signOut, authInit } from '../../store/index';

import classes from './App.css';

import Navigation from '../../components/Navigation/Navigation';
import Sidedrawer from '../../components/UI/Sidedrawer/Sidedrawer';
import SideDrawerItems from '../../components/SideDrawerItems/SideDrawerItems';
import Checkout from '../../components/Checkout/Checkout';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import Orders from '../../components/Orders/Orders';
import Auth from '../../components/Auth/Auth';
import Logout from '../../components/Logout/Logout';

class App extends Component {

  state = {
    sideDrawer: false
  }

  componentDidMount(){
    this.props.authInit()
  }

  toggleSideDrawer = ()=>{
    this.setState((prevState) => ({ sideDrawer: !prevState.sideDrawer}));
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/burger-builder" exact component={BurgerMenu}/>   
          <Route path="/auth" component={Auth} />
          <Redirect to="/burger-builder" />
      </Switch>
    );
    if(this.props.auth){
      routes = (<Switch>
                  <Route path="/burger-builder" exact component={BurgerMenu}/>
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/logout" render={ () => <Logout logout={this.props.logout}/>} />
                  {this.props.built ? <Redirect from='/auth' to='/checkout' /> : null } 
                  <Redirect from="/" to="/burger-builder" />
                </Switch>)
    }

    return (
      <BrowserRouter>
        <div className={classes.App}>
          <header>
            <Navigation show={!this.state.sideDrawer} auth={this.props.auth} sdHandler={this.toggleSideDrawer}/>
            <Sidedrawer show={this.state.sideDrawer} handleBD={this.toggleSideDrawer}>
              <SideDrawerItems auth={this.props.auth} />
            </Sidedrawer>
          </header>
          <main>
            {routes}
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth.idToken !== null,
    built: state.burgerMenu.built
  }
}

const mapDispatchToProps = dispatch => {
  return{
    logout: () => dispatch(signOut()),
    authInit: () => dispatch(authInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
