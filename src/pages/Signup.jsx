import { Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert'

const Signup = () => {

    const [ firstName, setFirstName ] = useState( '' )
    const [ lastName, setLastName ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ confirmPassword, setConfirmPassword ] = useState( '' )
    const [ phone, setPhone ] = useState( '' )
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            firstName,
            lastName,
            email,
            password,
            phone,
            role: "admin"
        }
        axios
        .post( "https://e-commerce-api.academlo.tech/api/v1/users", data )
        .then( resp => {
            localStorage.setItem( "token", resp.data.data.token )
            localStorage.setItem( "firstName", resp.data.data.user.firstName )
            localStorage.setItem( "lastName", resp.data.data.user.lastName )
            setFirstName( '' )
            setLastName( '' )
            setEmail( '' )
            setPassword( '' )
            setPhone( '' )
            swal("Registration successful!", "Welcome to our e-commerce", "success");
            navigate( "/login" )
        } )
        .catch( error => {
            console.error(error)
            swal("The email entered is already taken!", "Log in or type a new email", "error");
        } )
    }

    return (
        <div className='main-container'>
            <Card style={ {maxWidth: 400, margin: 'auto', padding: '2rem'} }>
                <Form onSubmit={ (e) => handleSubmit(e) }>
                    <h1 style={ {paddingBottom: 15} }>Sign Up</h1>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter your first name" 
                        value={firstName}
                        onChange={ (e) => setFirstName(e.target.value) }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter your last name" 
                        value={lastName}
                        onChange={ (e) => setLastName(e.target.value) }
                        required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                        required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm your password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Enter your password again" 
                        value={confirmPassword}
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                        required
                        />
                    </Form.Group>
                    <p className='text-danger'>{ confirmPassword !== password ? "Passwords don't match" : '' }</p>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone (10 characters)</Form.Label>
                        <Form.Control 
                        type="phone" 
                        placeholder="Enter your phone" 
                        value={phone}
                        onChange={ (e) => setPhone(e.target.value) }
                        required
                        />
                    </Form.Group>
                    <p className='text-danger'>{ phone.length !== 10 && phone.length > 0 ? 'Phone must have 10 characters' : '' }</p>
                    <Button variant="primary" type="submit" style={ {width: '100%'} } 
                    disabled={ confirmPassword !== password || phone.length !== 10 && phone.length > 0 }
                    >
                        Submit
                    </Button>
                </Form>
                <p style={ {paddingTop: 25, fontSize: 14} }>Already have an account? <Link to="/login">Log in</Link></p>
            </Card>
        </div>
    )
}

export default Signup