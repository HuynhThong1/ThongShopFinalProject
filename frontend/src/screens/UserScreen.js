import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/userActions';

export default function UserScreen(props) {


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
        props.history.push('/');
        // cartItems.map((item, index) => (dispatch(removeFromCart(item.product))));
        // console.log('cartItems logout', cartItems);
    }

    return (
        <div>
            <div className="row top" style={{margin: 'auto'}}>
                <div className="col-1 user-left">
                    {
                        userInfo && userInfo.isAdmin && (
                            <div>
                                <h1>ADMIN</h1>
                                <ul>
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
                                    </li><li>
                                        <Link to="/support">Support</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }

                    {
                        userInfo && userInfo.isSeller && (
                            <div>
                                <h1>STORE</h1>
                                <ul>
                                    <li><Link to="/productlist/seller">Products</Link></li>
                                    <li><Link to="/orderlist/seller">Orders</Link></li>
                                </ul>
                            </div>
                        )
                    }

                    {userInfo && (
                        <div>
                            <h1>ACCOUNT</h1>
                            <ul>
                                <li><Link to="/orderhistory">Order History</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></li>
                            </ul>
                        </div>
                    )
                    }


                </div>
                <div className="col-3 user-right">
                    <h2>Personal Data</h2>
                </div>
            </div>




        </div>
    )
}
