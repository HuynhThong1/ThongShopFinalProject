import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { listProductCategories } from "../actions/productActions";
import SearchBox from "./SearchBox";
// import LoadingBox from '../components/LoadingBox';
import MessageBox from "../components/MessageBox";
import ChatBox from "./ChatBox";
import SearchBoxMobile from "./SearchBoxMobile";

export default function Header(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  const productCategoryList = useSelector((state) => state.productCategoryList);

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <>
      <header className="row container">
        <div className="btn-sidebar">
          <button
            className="open-sidebar"
            type="button"
            onClick={() => setSidebarIsOpen(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div>
          <Link className="brand" to="/">
            ThongShop
          </Link>
        </div>
        <div className="row icon">
          <div>
            <Link
              to="#search"
              onClick={() => {
                clicked ? setClicked(false) : setClicked(true);
              }}
            >
              <i className="fas fa-search"></i>
            </Link>
          </div>
          <div>
            {userInfo ? (
              <Link to="/user">
                <i className="fas fa-user"></i>
              </Link>
            ) : (
              <Link to="/signin">
                <i className="fas fa-user"></i>
              </Link>
            )}
          </div>
          <div className="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-bag"></i>{" "}
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>

        <div className={clicked ? "searchClicked active" : "searchClicked"} style={{textAlign: "center"}}>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
      </header>

      <aside id="side" className={sidebarIsOpen ? "open" : "close"}>
        <div>
          <div className={clicked ? "row top-menu d-none" : "row top-menu"}>
            <div>
              {userInfo ? (
                <Link to="/user">
                  <i className="fas fa-user"></i>
                </Link>
              ) : (
                <Link to="/signin">
                  <i className="fas fa-user"></i>
                </Link>
              )}
            </div>
            <div>MENU</div>
            <div onClick={() => setClicked(true)}>
              {" "}
              <i className="fas fa-search" />
            </div>
          </div>
          <div
            className={clicked ? "row top-menu-box" : "row top-menu-box d-none"}
          >
            <div className="">
              <div className="search-mobile">
                <span onClick={() => setClicked(false)}>
                  <i className="fas fa-chevron-left"></i>
                </span>
                <Route
                  render={({ history }) => (
                    <SearchBoxMobile history={history}></SearchBoxMobile>
                  )}
                ></Route>
              </div>
            </div>
          </div>
          <div className="closeButton" onClick={() => setSidebarIsOpen(false)}>
            <span>
              <i className="fas fa-chevron-left"></i>
              CLOSE
            </span>
          </div>
          <ul>
            <li className="link dropdown-menu">
              <span>Categories</span>
              <i className="fas fa-chevron-right"></i>

              <div className="dropdown-menu-content">
                {loadingCategories ? (
                  ""
                ) : errorCategories ? (
                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                ) : (
                  categories.map((c) => (
                    <div key={c}>
                      <Link
                        to={`/search/category/${c}`}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        {c}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <div className={sidebarIsOpen ? "overlay" : "overlay d-none"}></div>

      {/* <aside className={sidebarIsOpen ? 'open' : ''}>
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
            </aside> */}

      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
    </>
  );
}
