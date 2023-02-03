import { Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCartThunk } from "../store/slices/cart.slice"

const ProductCard = ( {product} ) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addToCart = (productId) => {
        const token = localStorage.getItem("token")
        if( token ) {
            // Sesión iniciada
            const product = {
                id: productId,
                quantity: 1
            }
            dispatch( addToCartThunk(product) )
            swal("Product added successfully!", "You can continue shopping in your shopping cart", "success");
        } else {
            // No hay inicio de sesión, redirigir al login
            navigate("/login")
        }
    }

    return (
        <Col>
            <Card className="product-card">
                <div className="img-wrapper">
                    <a href="#page-top">
                        <Card.Img 
                        className="product-img"
                        variant="top"
                        src= {product?.productImgs?.[1]}
                        onClick={ () => navigate(`/product/${product.id}`) }
                        />
                        <Card.Img 
                        className="product-img cover-img"
                        variant="top"
                        src= {product?.productImgs?.[0]}
                        onClick={ () => navigate(`/product/${product.id}`) }
                        />
                    </a>
                </div>
                
                <hr />
                <Card.Body 
                style={ {display: 'flex', flexDirection: 'column', justifyContent: 'space-around'} }
                >
                    <a href="#page-top" style={ {textDecoration: 'none'} }>
                        <Card.Title 
                        className="text-primary" 
                        onClick={ () => navigate(`/product/${product.id}`) }
                        style={ {cursor: 'pointer'} }
                        >
                            {product?.title}
                        </Card.Title>
                    </a>
                    <Row>
                        <Col onClick={ () => navigate(`/product/${product.id}`) } style={ {cursor: 'pointer'} }>
                            <a href="#page-top" style={ {textDecoration: 'none'} }>
                                <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                                <Card.Text>$ {product?.price}</Card.Text>
                            </a>
                        </Col>
                        <Col>
                            <Button style={ {fontSize: 20} } onClick={ () => addToCart(product.id) }>
                                <i className='bx bx-cart'></i>
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard