import React from 'react'
import { Route } from 'react-router-dom';
import Header from './Header';

export const NoneHomeRoute = (props) => {

    return (
        <Route exact path={props.path} render={(propsRoute) => {
            return <div className="grid-container">
                <Header {...propsRoute} />
                <main>
                    <props.component {...propsRoute} />
                </main>
            </div>
        }}
        ></Route>
    )
}
