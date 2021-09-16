import React from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

export default function Product(props) {

    const { product } = props;
    const qty = 1;
    const dispatch = useDispatch();

    const addToCartEvent = () => {

        if (product.countInStock < 1) {
            alert('Product is not available.')
        } else {
            let bottom = document.getElementById('bottom' + product._id);
            bottom.classList.add('clicked');
            dispatch(addToCart(product._id, qty));
        }
    }

    const removeFromCartEvent = () => {
        let bottom = document.getElementById('bottom' + product._id);
        bottom.classList.remove('clicked');

        dispatch(removeFromCart(product._id));
    }

    return (

        <div className="card-product" key={product._id}>
            <div className="card-product-body">
                <div className="top">
                    <Link to={`/product/${product._id}`}>
                        <img className="card-product-image" src={product.image} alt={product.name} />
                    </Link>
                </div>
                <div className="bottom" id={'bottom' + product._id}>
                    <div className="left">
                        <div className="details">
                            <h1>{product.name}</h1>
                            <p>$ {product.price.toLocaleString()}</p>
                        </div>
                        <div className="buy" onClick={addToCartEvent}><i className="fas fa-shopping-cart" /></div>
                    </div>
                    <div className="right">
                        <div className="done"><i className="fas fa-check" /></div>
                        <div className="details">
                            <h1>{product.name}</h1>
                            <p>Added to your cart</p>
                        </div>
                        <div className="remove" onClick={removeFromCartEvent}><i className="fas fa-times" /></div>
                    </div>
                </div>
            </div>
            <div className="inside">
                <div className="icon"><i className="fas fa-eye" /></div>
                <div className="contents">
                    <h4 className="product-title">{product.name}</h4>
                    <div className="content-item">
                        {/* first seller is return of product seller, second seller is return a user seller */}
                        <Link className="sellerName" to={`/seller/${product.seller._id}`}>Store:  {product.seller.seller.name} </Link>
                    </div>

                    <div className="content-item">
                        Price: {product.price.toLocaleString()}$
                    </div>
                    <div className="content-item">
                        Category: {product.category}
                    </div>
                    <div className="content-item">
                        Brand: {product.brand}
                    </div>
                    <div className="description">
                        Description: {product.description}
                    </div>
                    <div>
                        <span style={{ marginTop: 20, color: 'white !important' }}>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </span>
                    </div>
                </div>
            </div>
        </div>



    )
}
