import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export const PrivateRoute = (props) => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    return (
        <Route exact path={props.path} render={(propsRoute) => userInfo ?
            (<div className="grid-container">
                <Header {...propsRoute} />
                <main>
                    <props.component {...propsRoute} />
                </main>
                <Footer {...propsRoute} />
            </div>) :
            (
                <Redirect to="/signin" />
            )

        }
        ></Route>
    )
}
