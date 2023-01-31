import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { setIsLoading } from "../store/slices/isLoading.slice"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row, Button } from "react-bootstrap"
import { getProductsThunk } from "../store/slices/products.slice"
import ProductCard from "../components/ProductCard"
import Carousel from 'react-bootstrap/Carousel'
import { addToCartThunk } from "../store/slices/cart.slice"

const ProductDetail = () => {

    const { id } = useParams()
    const [ detail, setDetail ] = useState( {} )
    const dispatch = useDispatch()
    const products = useSelector( state => state.products )
    const [ productsRelated, setProductsRelated ] = useState( [] )
    const [ quantity, setQuantity ] = useState( 1 )
    const navigate = useNavigate()

    useEffect( () => {
        dispatch( getProductsThunk() )
        dispatch( setIsLoading(true) )
        axios
        .get( `https://e-commerce-api.academlo.tech/api/v1/products/${id}/` )
        .then( resp => {
            setDetail(resp.data.data.product)
            setProductsRelated( products.filter( product => product.category.name === resp.data.data.product.category ) )
        } )
        .catch( error => console.error(error) )
        .finally( () => {
            setTimeout( () => {
                dispatch( setIsLoading(false) )
            }, 250 )
        } )
    }, [id] )

    const addToCart = () => {
        const token = localStorage.getItem("token")

        if( token ) {
            // Sesión iniciada
            const product = {
                id: detail.id,
                quantity
            }
            dispatch( addToCartThunk(product) )
        } else {
            // No hay inicio de sesión, redirigir al login
            navigate("/login")
        }
    }

    return (
        <div className="container">
            <Row>
                <Col style={ {display: 'flex', alignItems: 'center', justifyContent: 'center'} } lg={6} md={5}>
                    <Carousel variant="dark" className="carousel" fade>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 img-carousel"
                            src={detail?.productImgs?.[0]}
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 img-carousel"
                            src={detail?.productImgs?.[1]}
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100 img-carousel"
                            src={detail?.productImgs?.[2]}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col style={ {display: 'flex', justifyContent: 'center', flexDirection: 'column'} }>
                    <h2>{detail?.title}</h2>
                    <p style={ {fontSize: 13} }>{detail?.description}</p>
                    <Row>
                        <Col>
                        <h6 className="text-muted">Price</h6>
                        <h5 className="mt-3">$ {detail?.price}</h5>
                        </Col>
                        <Col>
                        <h6 className="text-muted">Quantity</h6>
                        <Button 
                        variant="outline-dark"
                        onClick={ quantity > 1 ? () => setQuantity( quantity - 1 ) : () => setQuantity( 1 ) }
                        style={ {padding: '5px 15px'} }
                        >
                            -
                        </Button>
                        <span style={ {padding: '5px 20px 7px 20px', borderTop: '2px solid #343a40', borderBottom: '2px solid #343a40'} }>{quantity}</span>
                        <Button 
                        variant="outline-dark" 
                        onClick={ () => setQuantity( quantity + 1 ) }
                        style={ {padding: '5px 15px'} }
                        >
                            +
                        </Button>
                        </Col>
                    </Row>
                    <Button className="mt-3" onClick={ addToCart }>
                        Add to cart <i className='bx bx-cart'></i>
                    </Button>
                </Col>
            </Row>
            <h3 className="mt-5">Discover similar items</h3> 
            <Row xs={1} sm={2} lg={3}>
                {
                    productsRelated?.map( product => (
                        <ProductCard 
                        product={ product }
                        />
                    ) )
                }
            </Row>
        </div>
    )
}

export default ProductDetail