import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { addToCart } from '../actions/cartActions';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props) {

    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    // const [size, setSize] = useState('S');
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId])


    const addToCartHandler = () => {
        //props.history.push(`/cart/${productId}?qty=${qty}&&size=${size}`);
        props.history.push(`/cart/${productId}?qty=${qty}`);
        
    };

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/"><button className="button back"><i className="fas fa-arrow-left"></i> Back</button></Link>
                    <div className="row top">
                        <div className="col-2">
                            <img
                                className="large"
                                src={product.image}
                                alt={product.name}
                            ></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </li>
                                <li>Pirce : ${product.price}</li>
                                <li>
                                    Description:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                    <span className="danger">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                {/* <li>
                                                    <div className="row">
                                                        <div>Size</div>
                                                        <div className="wrapper">
                                                            <select className="selection" value={size} onChange={e => setSize(e.target.value)}>
                                
                                                                    <option value="S">S</option>
                                                                    <option value="M">M</option>
                                                                    <option value="L">L</option>
                                                                    <option value="XL">XL</option>
                                                                
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li> */}
                                                <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        <div className="wrapper">
                                                            <select className="selection" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                        <option key={x+1} value={x + 1}>{x + 1}</option>
                                                                        
                                                                    ))

                                                                    
                                                                    
                                                                }

                                                                
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                </li>
                                            </>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
