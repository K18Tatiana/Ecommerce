import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import swal from 'sweetalert'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const getAddToCartThunk = () => dispatch => {
    dispatch( setIsLoading(true) )
    axios
    .get( "https://ecommerce-app-10yz.onrender.com/api/v1/cart", getConfig() )
    .then( resp => dispatch( setCart(resp.data) ) )
    .catch( error => console.error(error) )
    .finally( () => dispatch( setIsLoading(false) ) )
}

export const addToCartThunk = ( product ) => dispatch => {
    dispatch( setIsLoading(true) )
    axios
    .post( "https://ecommerce-app-10yz.onrender.com/api/v1/cart", product, getConfig() )
    .then( () => {
        dispatch( getAddToCartThunk() )
        swal("Product added successfully!", "You can continue shopping in your shopping cart", "success");
    } )
    .catch( error => {
        console.error(error) 
        swal("The product is already in the cart!", "Please try to change the quantity or add a new product", "error");
    } )
    .finally( () => dispatch( setIsLoading(false) ) )
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;