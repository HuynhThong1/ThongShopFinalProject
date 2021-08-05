import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {

    const sellerMode = props.match.path.indexOf('/seller') >= 0;


    const productList = useSelector(state => state.productList);

    const {loading, error, products} = productList;


    const productCreate = useSelector(state => state.productCreate);

    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;

   

    const productDelete = useSelector(state => state.productDelete);
    const {loading: loadingDelete, error:errorDelete, success: successDelete} = productDelete;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();

    useEffect(() => {

        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }

        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts({seller: sellerMode ? userInfo._id: ''}));
    }, [createdProduct, dispatch, props.history, sellerMode, successCreate, successDelete, userInfo._id])


    

    const deleteHandler = (product) => {
        //dispatch delete action
        if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteProduct(product._id));
    }
    }

    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div>
            <div className="row">
                <h1>Product</h1>
                <button className="primary" type="button" onClick={createHandler}>Create Product</button>
            </div>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            
            {loading ? <LoadingBox></LoadingBox> 
            : 
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product._id}</td>
                            <td style={{wordBreak: 'break-word', maxWidth: 700}}>{product.name}</td>
                            <td>{product.price}</td>
                            <td style={{wordBreak: 'break-word'}}>{product.category}</td>
                            <td style={{wordBreak: 'break-word'}}>{product.brand}</td>
                            <td>
                                <button type="button" className="small edit-button" onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                                <i className="fas fa-edit"></i>
                                </button> 
                                <button type="button" className="small delete-button" onClick={() => deleteHandler(product)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}
