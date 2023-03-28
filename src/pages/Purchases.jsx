import axios from "axios"
import { useState, useEffect } from "react"
import getConfig from "../utils/getConfig"
import { useDispatch } from "react-redux"
import { setIsLoading } from "../store/slices/isLoading.slice"
import { Link, useNavigate } from "react-router-dom"

const Purchases = () => {

    const [ purchases, setPurchases ] = useState( [] )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect( () => {
        dispatch( setIsLoading(true) )
        axios
        .get( "https://ecommerce-app-ypub.onrender.com/api/v1/purchases", getConfig() )
        .then( resp => setPurchases(resp.data) )
        .catch( error => console.error(error) )
        .finally( () => dispatch( setIsLoading(false) ) )
    }, [] )

    return (
        <div className="main-container">
            <h1 style={ {paddingBottom: 10} }>My Purchases</h1>
            {
                purchases.length > 0
                ?
                purchases?.map( purchase => (
                    <div 
                    key={purchase.id} 
                    className="purchase-product"
                    onClick={ () => navigate(`/product/${purchase.product.id}`) }
                    >
                        <h5>{purchase.product.title}</h5>
                        <div>
                            <div>
                                <span>Date</span>
                                <h6>{purchase.createdAt.substr(0, 10)}</h6>
                            </div>
                            <div>
                                <span>Quantity</span>
                                <h6 style={ {border: '1px solid gray', padding: 5, textAlign: 'center', width: 55} }>{purchase.quantity}</h6>
                            </div>
                            <div>
                                <span>Total</span>
                                <h6>$ {(purchase.product.price * purchase.quantity).toFixed(2)}</h6>
                            </div>
                        </div>
                        <hr />
                    </div>
                ) )
                :
                <p>You haven't bought anything yet. <Link to="/" >See Products</Link></p>
            }
        </div>
    )
}

export default Purchases