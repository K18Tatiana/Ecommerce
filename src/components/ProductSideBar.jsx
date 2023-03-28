import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import { getAddToCartThunk } from '../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom';

const ProductSideBar = ( {item} ) => {

    const [ quantity, setQuantity ] = useState( item.quantity )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateCart = ( newQuantity ) => {
        setQuantity( newQuantity )
        const updateProduct = {
            quantity: newQuantity
        }
        dispatch( setIsLoading(true) )
        axios
        .put( `https://ecommerce-app-ypub.onrender.com/api/v1/cart/${item.id}`, updateProduct, getConfig() )
        .then( () => dispatch( getAddToCartThunk() ) )
        .catch( error => console.error(error) )
    }

    const deleteProduct = () => {
        dispatch( setIsLoading(true) )
        axios
        .delete( `https://ecommerce-app-ypub.onrender.com/api/v1/cart/${item.id}`, getConfig() )
        .then( () => dispatch( getAddToCartThunk() ) )
        .catch( error => console.error(error) )
    }

    return (
        <div style={ {paddingBottom: 20} }>
            <div onClick={ () => navigate(`/product/${item.id}`) } style={ {cursor: 'pointer'} }>
                <h5>{item.product.title}</h5>
            </div>
            <div style={ {display: 'flex', justifyContent: 'space-between'} }>
                <div>
                    <Button 
                    variant="outline-secondary"
                    onClick={ quantity > 1 ? () => updateCart( quantity - 1 ) : () => updateCart( 1 ) }
                    style={ {padding: '0 10px'} }
                    >
                        -
                    </Button>
                        <span 
                        style={ {padding: '0 14px 2px 14px', borderTop: '2px solid #919aa1', borderBottom: '2px solid #919aa1'} }
                        >
                            {item.quantity}
                        </span>
                    <Button 
                    variant="outline-secondary" 
                    onClick={ () => updateCart( quantity + 1 ) }
                    style={ {padding: '0 10px'} }
                    >
                        +
                    </Button>
                </div>
                <button className='delete-product' onClick={ deleteProduct }>
                    <i className='bx bx-trash'></i>
                </button>
            </div>
            <div style={ {display: 'flex', justifyContent: 'end'} }>
                <p>Total:</p>
                <span className='text-primary' style={ {paddingRight: 10, paddingLeft: 20} }>$ {(item.product.price * quantity).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default ProductSideBar