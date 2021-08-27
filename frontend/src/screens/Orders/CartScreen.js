import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import queryString from 'qs';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { Link } from 'react-router-dom';
import MessageBox from '../../components/MessageBox';

export default function CartScreen(props) {

    const productId = props.match.params.id;
    //location.search to get qty from url behind ? 
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1]) 
        : 1;


    // const size = props.location.search 
    //     ? Number(props.location.search.split('=')[2]) : 'S';

    // console.log('props', props);
    // console.log('location', props.location.search)


    // let params = queryString.parse(props.location.search);
    // console.log('params', params);

    // const search = props.location.search;
    // const qty = new URLSearchParams(search).get('qty');
    // const size = new URLSearchParams(search).get('size');
    // console.log('size', size)
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
            // dispatch(addToCart(productId, size));
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }


    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    }


    const renderSubtotal = () => {
        let totalItem = cartItems.reduce((totalItem, item) => {
            return totalItem += item.qty;
        },0)

        let totalPrice = cartItems.reduce((totalPrice, item) => {
                return totalPrice += item.price * item.qty;
        },0)

        
        return <h2>Subtotal({totalItem} items) : ${totalPrice.toLocaleString()} </h2>
    }


    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {error && (<MessageBox variant="danger">{error}</MessageBox>)}
                {cartItems.length === 0 ?
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox> :
                    (
                        <ul>
                            {
                                cartItems.map((item, index) => (
                                    <li key={index}>
                                        <div className="row">
                                            <div>
                                                <img src={item.image} alt={item.name} className="small" />
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            {/* <div className="wrapper">
                                                <select className="selection"
                                                    value={item.size}
                                                    onChange={e => dispatch(addToCart(item.product, String(e.target.value)))}>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                </select>
                                            </div> */}
                                            <div className="wrapper">
                                                <select className="selection"
                                                    value={item.qty}
                                                    onChange={
                                                        e => dispatch(addToCart(item.product, Number(e.target.value)))
                                                    }>
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                ${item.price.toLocaleString()}
                                            </div>
                                            <div>
                                                <button type="button" className="delete-button"onClick={() => removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
            </div>

            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            {renderSubtotal()}
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>
                                Proceed to Checkout.
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
