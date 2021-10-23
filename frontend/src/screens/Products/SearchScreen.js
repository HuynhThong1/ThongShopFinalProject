import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import Product from '../../components/Product';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { prices, ratings } from '../../utils.js';
import Rating from '../../components/Rating';

export default function SearchScreen(props) {

    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest',
        pageNumber = 1,
    } = useParams();

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products, page, pages } = productList;

    const productCategoryList = useSelector(state => state.productCategoryList);

    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

    useEffect(() => {
        dispatch(listProducts({
            pageNumber,
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            min,
            max,
            rating,
            order,
        })
        );
    }, [category, dispatch, max, min, name, order, rating, pageNumber])


    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max || max;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
    }

    return (
        <div>
            <div className="row top">
                <div className="col-1">
                    <h3>Category</h3>
                    <div>
                        {loadingCategories ? '' :
                            errorCategories ? <MessageBox variant="danger">{errorCategories}</MessageBox> :
                                (
                                    <ul>
                                        <li>
                                            <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({ category: 'all' })}>All</Link>
                                        </li>
                                        {categories.map((c => (
                                            <li key={c}>
                                                <Link className={c === category ? 'active' : ''} to={getFilterUrl({ category: c })}>{c}</Link>
                                            </li>
                                        )))}
                                    </ul>
                                )
                        }
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            {prices.map((p) => (
                                <li key={p.name}>
                                    <Link to={getFilterUrl({ min: p.min, max: p.max })}
                                        className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}>{p.name}</Link>


                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Avg. Customer Reviews</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link to={getFilterUrl({ rating: r.rating })}
                                        className={`${r.rating}` === `${rating}` ? 'active' : ''}><Rating caption={" & up"} rating={r.rating}></Rating></Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className="col-3">
                    <div className="row product-found" style={{ marginLeft: 10 }}>
                        {loading ? '' :
                            error ? <MessageBox variant="danger">{error}</MessageBox> :
                                (
                                    <div>
                                        {products.length} Product Found
                                    </div>
                                )
                        }
                        <div>
                            Sort by {' '}
                            <select value={order} onChange={e => {
                                props.history.push(getFilterUrl({ order: e.target.value }));
                            }} style={{ background: '0 0' }}>
                                <option value="newest">Newest</option>
                                <option value="lowest">Lowest</option>
                                <option value="highest">Highest</option>
                                <option value="toprated">Avg. Customer Reviews</option>
                            </select>
                        </div>
                    </div>
                    {loading ? <LoadingBox></LoadingBox> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            (
                                <>
                                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                    <div className="cards">
                                        {products.map((product, index) => {
                                            return <Product key={index} product={product} />
                                        })}
                                    </div>

                                    <div className="row center pagination">
                                        {[...Array(pages).keys()].map((x) => (
                                            <Link
                                                className={x + 1 === page ? 'active' : ''}
                                                key={x + 1}
                                                to={getFilterUrl({ page: x + 1 })}
                                                style={{ color: '#254053' }}
                                            >
                                                {x + 1}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
