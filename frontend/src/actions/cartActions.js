import Axios from 'axios';
import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import Swal from 'sweetalert2'

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);

    const { cart: { cartItems } } = getState();
    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
        dispatch({ type: CART_ADD_ITEM_FAIL, payload: `Cannot Add to cart. Buy only from ${cartItems[0].seller.seller.name} in this order.` })
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Add to cart successfully.'
        }).then(() => {
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    product: data._id,
                    seller: data.seller,
                    qty,
                }
            });
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }
        )
    }
}


export const removeFromCart = (productId) => (dispatch, getState) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        iconColor: 'red',
        title: 'Remove from cart successfully.'
    }).then(() => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: productId
        });
        //update localStorage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
    )

}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
}