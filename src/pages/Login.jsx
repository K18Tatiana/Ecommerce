import { Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'

const Login = () => {

    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        axios
        .post( "https://ecommerce-app-ypub.onrender.com/api/v1/users/login", data )
        .then( resp => {
            localStorage.setItem( "token", resp.data.token )
            localStorage.setItem( "firstName", resp.data.user.firstName )
            localStorage.setItem( "lastName", resp.data.user.lastName )
            setEmail( '' )
            setPassword( '' )
            swal("Login successful!", "Welcome to our e-commerce", "success");
            setIsLogged( localStorage.getItem("token") )
        } )
        .catch( error => {
            console.error(error)
            swal("The data entered is incorrect!", "Please try again", "error");
        } )
    }

    const [ isLogged, setIsLogged ] = useState( localStorage.getItem("token") )
    const firstName = localStorage.getItem("firstName")
    const lastName = localStorage.getItem("lastName")
    const logout = () => {
        // Limpiar una propiedad -> localStorage.removeItem("propiedad")
        // Limpiar en totalidad el storage -> localStorage.clear()
        localStorage.clear()
        setIsLogged( false )
    }

    return (
        <div className="main-container">
            {
                isLogged
                ?
                <Card style={ {maxWidth: 400, margin: 'auto', padding: '2rem', textAlign: 'center'} }>
                    <i className='bx bxs-user-circle' style={ {fontSize: 150} }></i>
                    <h2>{firstName} {lastName}</h2>
                    <Button variant="outline-dark" onClick={ logout }>Cerrar sesión</Button>
                </Card>
                :
                <Card style={ {maxWidth: 400, margin: 'auto', padding: '2rem'} }>
                    <Form onSubmit={ (e) => handleSubmit(e) }>
                        <h1 style={ {paddingBottom: 15} }>Login</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={ (e) => setEmail(e.target.value) }
                            required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={ (e) => setPassword(e.target.value) }
                            required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={ {width: '100%'} }>
                            Submit
                        </Button>
                    </Form>
                    <p style={ {paddingTop: 25, fontSize: 14} }>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </Card>
            }
            
        </div>
    )
}

export default Login