import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProductsThunk } from "../store/slices/products.slice"
import { Row, Button, } from "react-bootstrap"
import { setIsLoading } from "../store/slices/isLoading.slice"
import axios from "axios"
import { filterCategoriesThunk } from "../store/slices/products.slice"
import ProductCard from "../components/ProductCard"

const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector( state => state.products )
    const [ categories, setCategories ] = useState( [] )

    useEffect( () => {
        dispatch( getProductsThunk() )
        dispatch( setIsLoading(true) )
        axios
        .get( "https://e-commerce-api.academlo.tech/api/v1/products/categories" )
        .then( resp => setCategories(resp.data.data.categories) )
        .catch( error => console.error(error) )
        .finally( () => dispatch( setIsLoading(false) ) )
    }, [] )

    return (
        <div>
            <div>
                {
                    categories.map( category => (
                        <Button 
                        key={category.id} 
                        variant="primary"
                        onClick={ () => dispatch( filterCategoriesThunk(category.id) ) }
                        >
                            {category.name}
                        </Button>
                    ) )
                }
                <Button onClick={ () => dispatch( getProductsThunk() ) }>All products</Button>
            </div>
            <Row xs={1} md={2} lg={3}>
                {
                    products?.map( product => (
                        <ProductCard 
                        product={ product }
                        />
                    ) )
                }
            </Row>
        </div>
    )
}

export default Home