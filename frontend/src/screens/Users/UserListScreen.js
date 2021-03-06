import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../../actions/userActions';
import MessageBox from '../../components/MessageBox';
import LoadingBox from '../../components/LoadingBox';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import PageHero from '../../components/PageHero';

export default function UserListScreen(props) {


    const userList = useSelector(state => state.userList);

    const { loading, error, users } = userList;

    const userDelete = useSelector(state => state.userDelete);

    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;


    const dispatch = useDispatch();

    //if some variable in [] changes when we useEffect, so this useEffect will run again.

    useEffect(() => {
        dispatch(listUsers());
        dispatch({ type: USER_DETAILS_RESET })
    }, [dispatch, successDelete])


    const deleteHandler = (user) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(user._id));
        }
    }


    return (
        <div>
            <PageHero link={`user`} name={`Account`} link2={`userlist`} name2={`User List`}></PageHero>
            <h1>Users</h1>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
            {
                loading ? (<LoadingBox></LoadingBox>)
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>)
                        :
                        (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>IS SELLER</th>
                                        <th>IS ADMIN</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isSeller ? 'YES' : 'NO'}</td>
                                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                                <td>
                                                    <button className="small edit-button" type="button" onClick={() => props.history.push(`/users/${user._id}/edit`)}>Edit</button>
                                                    <button className="small delete-button" type="button" onClick={() => deleteHandler(user)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
            }
        </div>
    )
}

