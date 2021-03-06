import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import MessageBox from '../../components/MessageBox';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import LoadingBox from '../../components/LoadingBox';

export default function PlaceOrderScreen(props) {


    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)); //5.123 => '5.12' => 5.12
    cart.itemsPrice = toPrice(cart.cartItems.reduce((total, item) => total + item.qty * item.price, 0));

    // cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0): toPrice(10);
    cart.shippingPrice = 0;
    // cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.taxPrice = 0;
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();


    const placeOrderHandler = () => {
        //Dispatch placeOrder action
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));

    }

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET
            });
        }
    }, [dispatch, order, props.history, success]); //if success get true this function will run.


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address},  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body wrapper">
                                <h2>Order Items</h2>
                                <ul style={{ overflow: 'auto', maxHeight: '400px', height: '100%', paddingRight: 10 }}>
                                    {
                                        cart.cartItems.map((item, index) => (
                                            <li key={index}>
                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small" />
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping Fee</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax Fee</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Order Total</div>
                                    <div>${cart.totalPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
