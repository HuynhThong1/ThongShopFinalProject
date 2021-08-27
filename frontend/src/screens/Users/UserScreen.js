import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { detailsUser } from "../../actions/userActions";
import { listOrderMine } from "../../actions/orderActions";
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function UserScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingUser, error: errorUser, user } = userDetails;

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
      dispatch(listOrderMine());
    } else {
      // if (user.seller) {
      //   setSellerName(user.seller.name);
      //   setSellerDescription(user.seller.description);
      // }
    }
  }, [dispatch, userInfo._id, user]);

  const signoutHandler = () => {
    dispatch(signout());
    props.history.push("/");
    // cartItems.map((item, index) => (dispatch(removeFromCart(item.product))));
    // console.log('cartItems logout', cartItems);
  };

  return (
    <div>
      <div className="row top" style={{ margin: "auto" }}>
        <div className="col-1 user-left">
          {userInfo && userInfo.isAdmin && (
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
                </li>
                <li>
                  <Link to="/support">Support</Link>
                </li>
              </ul>
            </div>
          )}

          {userInfo && userInfo.isSeller && (
            <div>
              <h1>STORE</h1>
              <ul>
                <li>
                  <Link to="/productlist/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Orders</Link>
                </li>
              </ul>
            </div>
          )}

          {userInfo && (
            <div>
              <h1>ACCOUNT</h1>
              <ul>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="col-3 user-right">
          <h1>Personal Data</h1>
          <h3>profile</h3>
          <div className="user-information">
            <div>Name: {userInfo.name}</div>
            <div>Email: {userInfo.email}</div>
            <div>
              Total Orders:  
              {loading ? '' : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <span style={{marginLeft: 10}}>{orders.length}</span>
              )}
            </div>
          </div>

          {loadingUser ? '' : errorUser ? <MessageBox variant="danger">{errorUser}</MessageBox> : (
              userInfo.isSeller && user && user.isSeller && (
                <div>
                  <h3>store information</h3>
                  <div className="user-information">
                    <div>Store name: {user.seller.name}</div>
                    <div>Store description: {user.seller.description}</div>
                  </div>
                </div>
              )
          )}

          <div className="user-button-edit">
            <Link to="/profile">
              <button className="button-edit">EDIT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
