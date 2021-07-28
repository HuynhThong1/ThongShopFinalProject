import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {


    const productList = useSelector(state => state.productList);

    const {loading, error, products} = productList;


    const productCreate = useSelector(state => state.productCreate);

    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;

   

    const productDelete = useSelector(state => state.productDelete);
    const {loading: loadingDelete, error:errorDelete, success: successDelete} = productDelete;

    console.log('loading delete', loadingDelete);

    const dispatch = useDispatch();

    useEffect(() => {

        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }

        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts());
    }, [createdProduct, dispatch, props.history, successCreate, successDelete])


    

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
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                                    Edit
                                </button> 
                                <button type="button" className="small" onClick={() => deleteHandler(product)}>
                                    Delete
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
