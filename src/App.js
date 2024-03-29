import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { onSnapshot } from '@firebase/firestore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import { createUserProfileDocument, auth } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
          createUserProfileDocument(userAuth).then(userRef => {
            onSnapshot(userRef, snapShot=> {
                setCurrentUser(
                  {
                    currentUser: {
                      id: snapShot.id,
                      ...snapShot.data()
                    }
                  }
                );
              });
          });
      }

      setCurrentUser(userAuth);

    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route path='/shop' component={ ShopPage }/>
          <Route exact path='/checkout' component={ CheckoutPage }/>
          <Route exact path='/sign-in-and-sign-up' render={() => (
            this.props.currentUser ? 
            <Redirect to='/'/> :
             <SignInAndSignUp/>)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
