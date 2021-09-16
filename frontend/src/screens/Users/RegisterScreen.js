import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';




export default function RegisterScreen(props) {

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;


    const dispatch = useDispatch();

    // const submitHandler = (e) => {
    //     e.preventDefault();

    //     //TODO: sigin action

    //     if (password !== confirmPassword) {
    //         alert('Password and confirm password are not match!!!');
    //         return;
    //     }

    //     dispatch(register(name, email, password));
    // }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',

        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name cannot be left blank.').min(6, 'Name must have 6 to 32 characters.').max(32, 'Name must have 6 to 32 characters.'),
            email: Yup.string().required('Email cannot be left blank.').email('Invalid Email.'),
            password: Yup.string().required('Password cannot be left blank.').min(6, 'Password must have 6 to 32 characters.').max(32, 'Password must have 6 to 32 characters.'),
            confirmPassword: Yup.string().when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Password need to be the same.'
                )
            })
        }),
        onSubmit: values => {

            const action = register(values.name, values.email, values.password);

            dispatch(action);


            console.log('values', values);
        },
    });

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])



    return (

        <div>
            {/* <div className="login-box">
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
            </div> */}

            <div className="login-box">
                <h2>Create An Account</h2>
                <div style={{ marginBottom: 20 }}>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="user-box">
                        <input type="text" name="name" required onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label>Name</label>
                        {formik.errors.name && formik.touched.name ? <ValidationMessage>{formik.errors.name}</ValidationMessage> : null}
                    </div>
                    <div className="user-box">
                        <input type="email" name="email" required onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label>Email</label>
                        {formik.errors.email && formik.touched.email ? <ValidationMessage>{formik.errors.email}</ValidationMessage> : null}
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" required onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label>Password</label>
                        {formik.errors.password && formik.touched.password ? <ValidationMessage>{formik.errors.password}</ValidationMessage> : null}
                    </div>
                    <div className="user-box">
                        <input type="password" name="confirmPassword" required onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label>Confirm Password</label>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? <ValidationMessage>{formik.errors.confirmPassword}</ValidationMessage> : null}
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


const ValidationMessage = styled.div`
    color: red;
    font-weight: bold;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 1.3rem;
`
