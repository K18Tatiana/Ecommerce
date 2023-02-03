import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

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
    .get( "https://e-commerce-api.academlo.tech/api/v1/cart", getConfig() )
    .then( resp => dispatch( setCart(resp.data.data.cart.products) ) )
    .catch( error => console.error(error) )
    .finally( () => dispatch( setIsLoading(false) ) )
}

export const addToCartThunk = ( product ) => dispatch => {
    dispatch( setIsLoading(true) )
    axios
    .post( "https://e-commerce-api.academlo.tech/api/v1/cart", product, getConfig() )
    .then( () => dispatch( getAddToCartThunk() ) )
    .catch( error => console.error(error) )
    .finally( () => dispatch( setIsLoading(false) ) )
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;