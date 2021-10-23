import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HomeRoute } from './components/HomeRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { NoneHomeRoute } from './components/NoneHomeRoute';
import { AdminRoute } from './components/AdminRoute';
import { SellerRoute } from './components/SellerRoute';
import SellerScreen from './screens/Users/SellerScreen';
import OrderScreen from './screens/Orders/OrderScreen';
import CartScreen from './screens/Orders/CartScreen';

import ProductScreen from './screens/Products/ProductScreen';
import ProductEditScreen from './screens/Products/ProductEditScreen';
import SigninScreen from './screens/Users/SigninScreen';
import RegisterScreen from './screens/Users/RegisterScreen';
import PaymentMethodScreen from './screens/Orders/PaymentMethodScreen';
import ShippingAddressScreen from './screens/Orders/ShippingAddressScreen';
import PlaceOrderScreen from './screens/Orders/PlaceOrderScreen';
import OrderHistoryScreen from './screens/Orders/OrderHistoryScreen';
import SearchScreen from './screens/Products/SearchScreen';
import UserScreen from './screens/Users/UserScreen';
import ProfileScreen from './screens/Users/ProfileScreen';
import MapScreen from './screens/Orders/MapScreen';
import DashboardScreen from './screens/Users/DashboardScreen';
import SupportScreen from './screens/Users/SupportScreen';
import UserListScreen from './screens/Users/UserListScreen';
import ProductListScreen from './screens/Products/ProductListScreen';
import OrderListScreen from './screens/Orders/OrderListScreen';
import UserEditScreen from './screens/Users/UserEditScreen';
import HomeScreen from './screens/Products/HomeScreen';

import GoongMap from './screens/Orders/Maps/GoongMap';


function App() {

  return (
    <BrowserRouter>
      <HomeRoute exact path="/seller/:id" component={SellerScreen}></HomeRoute>
      <HomeRoute exact path="/product/:id" component={ProductScreen}></HomeRoute>
      <HomeRoute exact path="/product/:id/edit" component={ProductEditScreen}></HomeRoute>
      <HomeRoute exact path="/cart/:id?" component={CartScreen}></HomeRoute>
      <NoneHomeRoute exact path="/signin" component={SigninScreen}></NoneHomeRoute>
      <NoneHomeRoute exact path="/register" component={RegisterScreen}></NoneHomeRoute>
      <HomeRoute exact path="/shipping" component={ShippingAddressScreen}></HomeRoute>
      <HomeRoute exact path="/payment" component={PaymentMethodScreen}></HomeRoute>
      <HomeRoute exact path="/placeorder" component={PlaceOrderScreen}></HomeRoute>
      <HomeRoute exact path="/order/:id" component={OrderScreen}></HomeRoute>
      <HomeRoute exact path="/orderhistory" component={OrderHistoryScreen}></HomeRoute>
      <HomeRoute exact path="/search/name/:name?" component={SearchScreen}></HomeRoute>
      <HomeRoute exact path="/search/category/:category" component={SearchScreen}></HomeRoute>
      <HomeRoute exact path="/search/category/:category/name/:name" component={SearchScreen}></HomeRoute>
      <HomeRoute exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen}></HomeRoute>

      <HomeRoute exact path="/user" component={UserScreen}></HomeRoute>


      <PrivateRoute exact path="/profile" component={ProfileScreen}></PrivateRoute>
      <PrivateRoute exact path="/map" component={MapScreen}></PrivateRoute>
      <NoneHomeRoute exact path="/goongmap" component={GoongMap}></NoneHomeRoute>


      <AdminRoute exact path="/dashboard" component={DashboardScreen}></AdminRoute>
      <AdminRoute exact path="/support" component={SupportScreen}></AdminRoute>


      <AdminRoute exact path="/productlist" component={ProductListScreen}></AdminRoute>
      <AdminRoute exact path="/productlist/pageNumber/:pageNumber" component={ProductListScreen}></AdminRoute>

      <AdminRoute exact path="/orderlist" component={OrderListScreen}></AdminRoute>
      <AdminRoute exact path="/userlist" component={UserListScreen}></AdminRoute>
      <AdminRoute exact path="/users/:id/edit" component={UserEditScreen}></AdminRoute>

      <SellerRoute exact path="/productlist/seller" component={ProductListScreen}></SellerRoute>
      <SellerRoute exact path="/orderlist/seller" component={OrderListScreen}></SellerRoute>

      <HomeRoute exact path="/" component={HomeScreen}></HomeRoute>
      <HomeRoute exact path="/pageNumber/:pageNumber" component={HomeScreen}></HomeRoute>

    </BrowserRouter>
  );
}

export default App;
