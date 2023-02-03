import { Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
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
        } else {
            // No hay inicio de sesión, redirigir al login
            navigate("/login")
        }
    }

    return (
        <Col>
            <Card className="product-card">
                <div className="img-wrapper">
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
                </div>
                <hr />
                <Card.Body 
                style={ {display: 'flex', flexDirection: 'column', justifyContent: 'space-around'} }
                >
                    <Card.Title 
                    className="text-primary" 
                    onClick={ () => navigate(`/product/${product.id}`) }
                    style={ {cursor: 'pointer'} }
                    >
                        {product?.title}
                    </Card.Title>
                    <Row>
                        <Col onClick={ () => navigate(`/product/${product.id}`) } style={ {cursor: 'pointer'} }>
                            <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                            <Card.Text>$ {product?.price}</Card.Text>
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