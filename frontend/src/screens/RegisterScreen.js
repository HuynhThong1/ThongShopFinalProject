import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        //TODO: sigin action

        if (password !== confirmPassword) {
            alert('Password and confirm password are not match!!!');
            return;
        }

        dispatch(register(name, email, password));
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])



    return (

        <div>
            {/* <form className="form" onSubmit={submitHandler} >
                <div>
                    <h1>Create an Account</h1>
                </div>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" required onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Password</label>
                    <input type="password" id="confirmPassword" placeholder="Enter confirm password" required onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div className="divider">
                    <span>
                        Or
                    </span>
                </div>
                <div>
                    <label />
                    <Link to={`/signin?redirect=${redirect}`} className="button black link">Sign In</Link>
                </div>
            </form> */}

            <div className="login-box">
                <h2>Create An Account</h2>
                <div style={{ marginBottom: 20 }}>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <form onSubmit={submitHandler}>
                    <div className="user-box">
                        <input type="text" id="name" required onChange={e => setName(e.target.value)} />
                        <label>Name</label>
                    </div>
                    <div className="user-box">
                        <input type="email" id="email" required onChange={e => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" id="password" required onChange={e => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <div className="user-box">
                        <input type="password" id="confirmPassword" required onChange={e => setConfirmPassword(e.target.value)} />
                        <label>Confirm Password</label>
                    </div>
                    <button type="submit">
                        <span />
                        <span />
                        <span />
                        <span />
                        Register
                    </button>
                    <br></br>
                    <button type="button">
                        <Link to={`/signin?redirect=${redirect}`}>
                            <span />
                            <span />
                            <span />
                            <span />
                            Sign In
                        </Link>
                    </button>
                </form>
            </div>
        </div>

    )
}
