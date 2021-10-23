import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import PageHero from '../../components/PageHero';


export default function OrderHistoryScreen(props) {


    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;

    const dispatch = useDispatch();

    useEffect(() => {

        window.scrollTo(0, 0);


        dispatch(listOrderMine());
    }, [dispatch])

    return (
        <div>
            <PageHero link={`user`} name={`Account`} link2={`orderhistory`} name2={`Order History`} ></PageHero>
            <h1>Order History</h1>
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox> : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            <button type="button" className="small" onClick={() => {
                                                props.history.push(`/order/${order._id}`)
                                            }}>
                                                Details
                                            </button>
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
