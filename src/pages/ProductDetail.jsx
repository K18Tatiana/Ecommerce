import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { setIsLoading } from "../store/slices/isLoading.slice"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row } from "react-bootstrap"
import { getProductsThunk } from "../store/slices/products.slice"
import ProductCard from "../components/ProductCard"
import Carousel from 'react-bootstrap/Carousel'

const ProductDetail = () => {

    const { id } = useParams()
    const [ detail, setDetail ] = useState( {} )
    const dispatch = useDispatch()
    const products = useSelector( state => state.products )
    const [ productsRelated, setProductsRelated ] = useState( [] )

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
                        <h5>$ {detail?.price}</h5>
                        </Col>
                        <Col>
                        <h5 className="text-muted">Quantity</h5>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <h3 style={ {marginTop: 30} }>Discover similar items</h3> 
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