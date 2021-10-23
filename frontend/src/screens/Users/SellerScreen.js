import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import { detailsUser } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Product from '../../components/Product';
import Rating from '../../components/Rating';

export default function SellerScreen(props) {

    const {
        pageNumber = 1,
    } = useParams();

    const sellerId = props.match.params.id;

    const productList = useSelector(state => state.productList);
    const { page, pages } = productList;
    const { loading: loadingProducts, error: errorProducts, products } = productList;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;






    const dispatch = useDispatch();

    useEffect(() => {
        const action = listProducts({ pageNumber });
        dispatch(action);
        dispatch(detailsUser(sellerId))
        dispatch(listProducts({ seller: sellerId }));
    }, [dispatch, sellerId, pageNumber]);

    return (
        <div className="row top">
            <div className="col-1">
                {loading ? '' :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        (
                            <ul className="card card-body">
                                <li>
                                    <div className="row start">
                                        <div className="p-1">
                                            <img className="small" src={user.seller.logo} alt={user.seller.name} />
                                        </div>
                                        <div className="p-1">
                                            <h1>{user.seller.name}</h1>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <Rating rating={user.seller.rating} numReviews={user.seller.numReviews} />
                                </li>
                                <li>
                                    <a href={`mailto:${user.email}`}>Contact User</a>
                                </li>
                                <li>
                                    {user.seller.description}
                                </li>
                            </ul>
                        )
                }
            </div>
            <div className="col-3">
                {loadingProducts ? <LoadingBox></LoadingBox> :
                    errorProducts ? <MessageBox variant="danger">{errorProducts}</MessageBox> : (
                        <>
                            {products.length === 0 && (<MessageBox>No Product Found</MessageBox>)}
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
                                        to={`seller/${sellerId}/pageNumber/${x + 1}`}
                                    >
                                        {x + 1}
                                    </Link>
                                ))}
                            </div> : ''}
                        </>
                    )}
            </div>
        </div>
    )
}
