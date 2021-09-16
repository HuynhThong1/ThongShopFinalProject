import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';


export default function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        //TODO: sigin action

        dispatch(signin(email, password));
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])



    return (
        <div>
            <div className="login-box">
                <h2>Welcome to ThongShop</h2>
                <div style={{ marginBottom: 20 }}>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <form onSubmit={submitHandler}>

                    <div className="user-box">
                        <input type="email" id="email" required onChange={e => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" id="password" required onChange={e => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <button type="submit">
                        <span />
                        <span />
                        <span />
                        <span />
                        Sign In
                    </button>
                    <br></br>
                    <button type="button">
                        <Link to={`/register?redirect=${redirect}`}>
                            <span />
                            <span />
                            <span />
                            <span />
                            Register
                        </Link>
                    </button>
                </form>
            </div>
        </div>
    )
}
