import React from 'react'
import { Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export const HomeRoute = (props) => {

    return (
        <Route exact path={props.path} render={(propsRoute) =>
            (<div className="grid-container">
                <Header {...propsRoute} />
                <main>
                    <props.component {...propsRoute} />
                </main>
                <Footer {...propsRoute} />
            </div>)

        }
        ></Route>
    )
}
