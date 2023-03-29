import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import { useState, useEffect } from 'react';
import getConfig from '../utils/getConfig';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { setCart } from '../store/slices/cart.slice';
import { getAddToCartThunk } from '../store/slices/cart.slice';
import ProductSideBar from './ProductSideBar';
import swal from 'sweetalert'

const SideBar = ( {show, handleClose} ) => {

    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart )
    const [totalPrice, setTotalPrice] = useState( 0 )

    useEffect( () => {
        dispatch( getAddToCartThunk() )
    }, [ show ] )

    const checkoutCart = () => {
        dispatch( setIsLoading(true) )
        axios
        .post( "https://ecommerce-app-10yz.onrender.com/api/v1/purchases", {
            "street": "Green St. 1456",
            "colony": "Southwest",
            "zipCode": 12345,
            "city": "USA",
            "references": "Some references"
        }, getConfig() )
        .then( () => {
            dispatch( setCart( [] ) )
            swal("Successful purchase!", 'You can see your purchases in "My Purchases" ', "success");
        } )
        .catch( error => console.error(error) )
        .finally( () => dispatch( setIsLoading(false) ) )
    }

    useEffect( () => {
        const price = cart?.reduce( (total, item) => {
            return total + (item?.product?.price * item?.quantity)
        }, 0 )
        setTotalPrice(price.toFixed(2))
    }, [ cart ] )

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title style={ {borderBottom: '1px solid gray'} }>Shopping Cart <i className='bx bx-cart'></i></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="side-bar">
                    {
                        cart.length !== 0
                        ?
                        cart?.map( item => (
                            <ProductSideBar 
                            key={item.id}
                            item={item}
                            />
                        ) )
                        :
                        <h2>No products selected</h2>
                    }
                </div>
                <div className="total-cart">
                    <hr />
                    <div className='checkout'>
                        <p className='text-muted'>Total</p>
                        <h5>$ {totalPrice}</h5>
                    </div>
                    <Button
                    style={ {width: '100%'} }
                    disabled={ cart.length === 0 }
                    onClick={ checkoutCart }
                    >
                        Checkout
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default SideBar