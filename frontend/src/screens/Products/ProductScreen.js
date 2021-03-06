import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../../actions/cartActions";
import { createReview, detailsProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import PageHero from "../../components/PageHero";
import Rating from "../../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../../constants/productConstants";

export default function ProductScreen(props) {
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  // const [size, setSize] = useState('S');
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  console.log("productID", productId)



  useEffect(() => {

    window.scrollTo(0, 0);

    if (successReviewCreate) {
      window.alert("Review submitted successfully.");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  // const addToCartHandler = () => {
  //    // props.history.push(`/cart/${productId}?qty=${qty}&&size=${size}`);
  //      props.history.push(`/cart/${productId}?qty=${qty}`);
  // };

  return (
    <div>
      <PageHero link={`search/name/`} name={`Products`} link2={`/product/${productId}`} name2={`${product?.name}`}></PageHero>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          {/* <Link to="/">
            <button className="button back">
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </Link> */}
          <div className="row top body-container">
            <div className="col-2">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="large"
                />
              </div>
            </div>
            <div className="col-2">
              <div>
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
                  <li>Price : ${product.price}</li>
                  <li>
                    Description:
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>
              <div className="card card-body" style={{ margin: 0 }}>
                <ul>
                  <li>
                    Store{" "}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                  </li>
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
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row" style={{ margin: '2rem 0' }}>
                          <div>Qty</div>
                          {/* <div className="wrapper">
                            <select
                              className="selection"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div> */}
                          <WrapperButton>
                            <ButtonPlusMinus onClick={() => {
                              setQty(qty + 1);
                            }}>+</ButtonPlusMinus>
                            <div style={{ fontSize: '3rem', margin: '0 3rem' }}>{qty}</div>
                            <ButtonPlusMinus onClick={() => {
                              if (qty <= 1) {
                                alert('Quantity must be more than 1. ')
                                setQty(1);
                              } else {
                                setQty(qty - 1);
                              }

                            }}>-</ButtonPlusMinus>
                          </WrapperButton>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            dispatch(addToCart(product._id, qty));
                          }}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 id="reviews">Reviews</h2>

            {product.reviews.length === 0 && (
              <MessageBox>There is no reviews.</MessageBox>
            )}

            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excellent</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write your
                    review.
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


const WrapperButton = styled.div`
    display: grid;
    width: 140px;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    -webkit-box-align: center;
`

const ButtonPlusMinus = styled.button`
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0px;
    width: 2rem;
    height: 1rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 3rem;
`



