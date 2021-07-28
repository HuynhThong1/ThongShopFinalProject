import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/userActions';

export default function Header(props) {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
        // cartItems.map((item, index) => (dispatch(removeFromCart(item.product))));
        // console.log('cartItems logout', cartItems);
    
      }
    return (
        <header className="row container">
            <div>
                <Link className="brand" to="/">ThongShop</Link>
            </div>
            <div >


                <div className="cart">
                    <Link to="/cart" ><i className="fas fa-shopping-cart"></i> {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}</Link>
                </div>
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">{userInfo.name} <i className="fas fa-caret-down"></i></Link>

                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/orderhistory">Order History</Link>
                                </li>
                                <li>
                                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                </li>
                            </ul>
                        </div>

                    ) :
                        (
                            <Link to="/signin"><i className="fas fa-user"></i></Link>
                        )
                }
                {
                    userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <Link to="#admin">Admin {''} <i className="fas fa-caret-down"></i></Link>

                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/productlist">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist">Orders</Link>
                                </li>
                                <li>
                                    <Link to="/userlist">Users</Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </header>
    )
}
