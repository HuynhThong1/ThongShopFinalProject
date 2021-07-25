import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';

function App() {

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();


  const signoutHandler = () => {
    dispatch(signout());
    console.log('cartItems logout', cartItems)
    
  }

  return (
    <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="/">ThongShop</Link>
            </div>
            <div>
              <Link to="/cart">Cart {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}</Link>
              {
                userInfo ? (
                  <div className="dropdown">
                    <Link to="#">{userInfo.name} <i className="fas fa-caret-down"></i></Link>

                    <ul className="dropdown-content">
                      <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </ul>
                  </div>
                  
                ) : 
                (
                  <Link to="/signin">Sign In</Link>
                )
              }
              
            </div>
          </header>
          <main>
            <Route exact path="/product/:id" component={ProductScreen}></Route>
            <Route exact path="/" component={HomeScreen}></Route>
            <Route exact path="/cart/:id?" component={CartScreen}></Route>
            <Route exact path="/signin" component={SigninScreen}></Route>
            <Route exact path="/register" component={RegisterScreen}></Route>
          </main>
          <footer className="row center">
            All right reserved.
          </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
