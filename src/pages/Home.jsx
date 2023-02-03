import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProductsThunk, filterCategoriesThunk } from "../store/slices/products.slice"
import { Row, Button, Accordion, Form } from "react-bootstrap"
import { setIsLoading } from "../store/slices/isLoading.slice"
import axios from "axios"
import ProductCard from "../components/ProductCard"

const Home = () => {

    const dispatch = useDispatch()
    const allProducts = useSelector( state => state.products )
    const [ categories, setCategories ] = useState( [] )
    const [ products, setProducts ] = useState( allProducts )

    useEffect( () => {
        dispatch( getProductsThunk() )
        dispatch( setIsLoading(true) )
        axios
        .get( "https://e-commerce-api.academlo.tech/api/v1/products/categories" )
        .then( resp => setCategories(resp.data.data.categories) )
        .catch( error => console.error(error) )
        .finally( () => dispatch( setIsLoading(false) ) )
    }, [] )

    useEffect( () => {
        setProducts(allProducts)
    }, [allProducts] )

    const handleSubmit = e => {
        e.preventDefault()
        const value = e.target[0].value.toLowerCase()
        setProducts(allProducts.filter( product => product.title.toLowerCase().includes(value) ))
    }
    const handleSubmitPrice = e => {
        e.preventDefault()
        let lowerPrice = e.target[0].value
        let higherPrice = e.target[1].value
        if( lowerPrice === "" ) {
            lowerPrice = 0
        } else{
            lowerPrice = Number(lowerPrice)
        }
        if( higherPrice === "" ) {
            higherPrice = Infinity
        } else{
            higherPrice = Number(higherPrice)
        }
        setProducts( allProducts.filter( product => Number(product.price) >= lowerPrice && Number(product.price) <= higherPrice ) )
    }

    return (
        <div className="main-container">
            <Form onSubmit={ (e) => handleSubmit(e) } className="search-product">
                <Form.Control
                placeholder="What are you looking for?"
                aria-label="product"
                aria-describedby="basic-addon2"
                />
                <Button variant="outline-primary" id="button-addon2" type='submit'>
                    Search
                </Button>
            </Form>
            <Row style={ {justifyContent: 'space-between'} }>
                <Accordion defaultActiveKey={['0']} alwaysOpen style={ {width: 250, marginTop: 20} }>
                    <Accordion.Item eventKey="0" style={ {border: 0} }>
                        <Accordion.Header 
                        style={ {borderBottom: '1px solid #919aa1'} }
                        >
                            Category
                        </Accordion.Header>
                        <Accordion.Body style={ {padding: '10px 0', display: 'flex', flexDirection: 'column'} }>
                            {
                                categories.map( category => (
                                    <Button 
                                    key={category.id} 
                                    variant="light"
                                    onClick={ () => { dispatch( filterCategoriesThunk(category.id) )} }
                                    >
                                        {category.name}
                                    </Button>
                                ) )
                            }
                            <Button 
                            variant="light" 
                            onClick={ () => dispatch( getProductsThunk() ) } 
                            >
                                All products
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey={['0']} alwaysOpen style={ {width: 250, marginTop: 20} }>
                    <Accordion.Item eventKey="0" style={ {border: 0} }>
                        <Accordion.Header 
                        style={ {borderBottom: '1px solid #919aa1'} }
                        >
                            Price
                        </Accordion.Header>
                        <Accordion.Body style={ {padding: '10px 0'} }>
                            <Form 
                            style={ {display: 'flex', flexDirection: 'column'} } 
                            onSubmit={ e => handleSubmitPrice(e) }
                            >
                                <Form.Group className="mb-3 filter-price" controlId="price-from">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="number" placeholder="Lower price" style={ {width: 180} } />
                                </Form.Group>
                                <Form.Group className="mb-3 filter-price" controlId="price-from">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="number" placeholder="Higher price" style={ {width: 180} } />
                                </Form.Group>
                                <Button variant="dark" type="submit">Filter price</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
            {
                products.length === 0
                ?
                <h2 style={ {textAlign: 'center', paddingTop: 30} }>There aren't products</h2>
                :
                <Row xs={1} sm={2} md={2} lg={3}>
                    {
                        products?.map( product => (
                            <ProductCard
                            key={product.id}
                            product={ product }
                            />
                        ) )
                    }
                </Row>
            }
        </div>
    )
}

export default Home