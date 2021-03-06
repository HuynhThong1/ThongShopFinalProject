import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import PageHero from '../../components/PageHero';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';

export default function OrderListScreen(props) {

    const sellerMode = props.match.path.indexOf('/seller') >= 0;


    const orderList = useSelector(state => state.orderList);

    const { loading, error, orders } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);

    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET })
        dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
    }, [dispatch, sellerMode, successDelete, userInfo._id])

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    }

    return (
        <div>
            <PageHero link={`user`} name={`Account`} link2={`orderlist`} name2={`Order List`}></PageHero>
            <h1>Orders List</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox> : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button type="button" className="small edit-button" onClick={() => {
                                                props.history.push(`/order/${order._id}`)
                                            }}>
                                                Details
                                            </button>
                                            <button type="button" className="small delete-button" onClick={() => { deleteHandler(order) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )}


        </div>
    )
}
