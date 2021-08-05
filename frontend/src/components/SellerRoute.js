import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Header from './Header';

export const SellerRoute = (props) => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <Route exact path={props.path} render={(propsRoute) =>
            userInfo && userInfo.isSeller ? 
            (<div className="grid-container">
                <Header {...propsRoute} />
                <main>
                    <props.component {...propsRoute} />
                </main>
                <Footer {...propsRoute} />
            </div>)
            : 
            (
                <Redirect to="/signin" />
            )

        }
        ></Route>
    )
}
