import { Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const ProductCard = ( {product} ) => {

    const [ isImg, setIsImg ] = useState( false )
    const navigate = useNavigate()

    return (
        <Col 
        key={ product.id } 
        onClick={ () => navigate(`/product/${product.id}`) }
        >
            <Card className="product-card">
                <Card.Img 
                className="product-img"
                variant="top"
                onMouseEnter={ () => setIsImg(true) }
                src= {product?.productImgs?.[0]}
                style={ isImg ? {display: 'none'} : {display: 'block'} }
                />
                <Card.Img 
                className="product-img"
                variant="top"
                onMouseLeave={ () => setIsImg(false) }
                src= {product?.productImgs?.[1]}
                style={ isImg ? {display: 'block'} : {display: 'none'} }
                />
                <hr />
                <Card.Body 
                style={ {display: 'flex', flexDirection: 'column', justifyContent: 'space-around'} }
                >
                    <Card.Title className="text-primary">{product?.title}</Card.Title>
                    <Row>
                        <Col>
                            <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                            <Card.Text>$ {product?.price}</Card.Text>
                        </Col>
                        <Col>
                            <Button style={ {fontSize: 20} }>
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