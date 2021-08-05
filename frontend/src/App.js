import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import { HomeRoute } from './components/HomeRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { NoneHomeRoute } from './components/NoneHomeRoute';
import {AdminRoute} from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import { SellerRoute } from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchScreen from './screens/SearchScreen';


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
      <HomeRoute exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen}></HomeRoute>

      <PrivateRoute exact path="/profile" component={ProfileScreen}></PrivateRoute>
      <AdminRoute exact path="/productlist" component={ProductListScreen}></AdminRoute>
      <AdminRoute exact path="/orderlist" component={OrderListScreen}></AdminRoute>
      <AdminRoute exact path="/userlist" component={UserListScreen}></AdminRoute>
      <AdminRoute exact path="/users/:id/edit" component={UserEditScreen}></AdminRoute>

      <SellerRoute exact path="/productlist/seller" component={ProductListScreen}></SellerRoute>
      <SellerRoute exact path="/orderlist/seller" component={OrderListScreen}></SellerRoute>

      <HomeRoute exact path="/" component={HomeScreen}></HomeRoute>

    </BrowserRouter>
  );
}

export default App;
