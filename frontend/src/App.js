import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  console.log('cartItems initial', cartItems)


  const signoutHandler = () => {
    dispatch(signout());
    // cartItems.map((item, index) => (dispatch(removeFromCart(item.product))));
    console.log('cartItems logout', cartItems);

  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row container">
          <div>
            <Link className="brand" to="/">ThongShop</Link>
          </div>
          <div >


            <div className="cart">
              <Link to="/cart" ><i class="fas fa-shopping-cart"></i> {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}</Link>
            </div>
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
                  <Link to="/signin"><i class="fas fa-user"></i></Link>
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
        <footer>
          <div className="row center social-icon">
            <span>
              <a href="#facebook"><i class="fab fa-facebook"></i></a>
            </span>
            <span>
              <a href="#instagram"><i class="fab fa-instagram"></i></a>
            </span>
            <span>
              <a href="#youtube"><i class="fab fa-youtube"></i></a>
            </span>
            <span>
              <a href="#github"><i class="fab fa-github"></i></a>
            </span>
          </div>
          <div className="footer-top row center">
            <div className="col-2">
              <h2>Greenwich information</h2>
              <p>Location: </p>
              <p>Contact: </p>
            </div>
            <div className="col-2">
              <h2>Profile information</h2>
              <p>Location: </p>
              <p>Contact: </p>
            </div>
          </div>
          <div className="row center">
            <div className="footer-bottom">
              <p> © 2021. All Rights Reserved |  Design by Huynh Minh Thong.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
