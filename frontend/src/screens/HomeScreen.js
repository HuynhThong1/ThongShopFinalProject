import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';

export default function HomeScreen() {

  const {
    pageNumber = 1,
  } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userTopSellersList = useSelector(state => state.userTopSellersList);
  const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellersList;

  useEffect(() => {
    const action = listProducts({pageNumber});
    dispatch(action);
    dispatch(listTopSellers());
  }, [dispatch, pageNumber]);

  return (
    <div>
      <div className="row">
        <h2>Our Stores</h2>
      </div>

      {loadingSellers ?
        <LoadingBox></LoadingBox>
        : errorSellers
          ? <MessageBox variant="danger">{errorSellers}</MessageBox>
          : (
            <>
              {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {sellers.map((seller) => (
                  <div key={seller._id}>
                    <Link to={`/seller/${seller._id}`}>
                      <img src={seller.seller.logo} alt={seller.seller.name} />
                      <p className="legend">{seller.seller.name}</p>
                    </Link>
                  </div>
                ))}
              </Carousel>
            </>
          )}

      <h2>Featured Products</h2>
      {loading ?
        <LoadingBox></LoadingBox>
        : error
          ? <MessageBox variant="danger">{error}</MessageBox>
          : (
            <>
              {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
              <div className="cards">
                {products.map((product, index) => {
                  return <Product key={index} product={product} />
                })}
              </div>

              {pages > 1 ? <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={`/pageNumber/${x + 1}`}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div> : ''}
            </>
          )}

    </div>
  )
}
