import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { listProductCategories } from '../actions/productActions';
import { signout } from '../actions/userActions';
import SearchBox from './SearchBox';
// import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Header(props) {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const productCategoryList = useSelector(state => state.productCategoryList);

    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
        props.history.push('/');
        // cartItems.map((item, index) => (dispatch(removeFromCart(item.product))));
        // console.log('cartItems logout', cartItems);
    }

    useEffect(() => {
        dispatch(listProductCategories());
    }, [dispatch]);


    return (
        <>
            <header className="row container">
                <div>
                    <button className="open-sidebar" type="button" onClick={() => setSidebarIsOpen(true)}><i className="fas fa-bars"></i></button>
                    <Link className="brand" to="/">ThongShop</Link>
                </div>
                <div>
                    <Route render={({ history }) => <SearchBox history={history}></SearchBox>}></Route>
                </div>
                <div >
                    <div className="cart">
                        <Link to="/cart" ><i className="fas fa-shopping-cart"></i> {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}</Link>
                    </div>
                    {
                        userInfo ? (
                            <div className="dropdown">
                                <Link to="#">{userInfo.name} <i className="fas fa-caret-down"></i></Link>

                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">Order History</Link>
                                    </li>
                                    <li>
                                        <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                    </li>
                                </ul>
                            </div>

                        ) :
                            (
                                <Link to="/signin"><i className="fas fa-user"></i></Link>
                            )
                    }
                    {
                        userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                                <Link to="#admin">Seller {''} <i className="fas fa-caret-down"></i></Link>

                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist/seller">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist/seller">Orders</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">Admin {''} <i className="fas fa-caret-down"></i></Link>

                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </header>

            <aside className={sidebarIsOpen ? 'open' : ''}>
                <ul className="categories">
                    <li>
                        <strong>Categories</strong>
                        <button className="close-sidebar" onClick={() => setSidebarIsOpen(false)}><i className="fas fa-times"></i></button>
                    </li>

                    {loadingCategories ? '' :
                        errorCategories ? <MessageBox variant="danger">{errorCategories}</MessageBox> :
                            (
                                categories.map(c => (
                                    <li key={c}>
                                        <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}>{c}</Link>
                                    </li>
                                ))
                            )
                    }
                </ul>
            </aside>
        </>
    )
}
