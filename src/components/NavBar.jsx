import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TriggerRendererProp from './TriggerRendererProp';

const NavBar = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token")
        if( token ) {
            setShow(true)
        } else {
            navigate( "/login" )
        }
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" style={ {position: 'fixed', top: 0, width: '100%', zIndex: 100} } >
                <Container style={ {display: 'flex', flexWrap: 'wrap', paddingLeft: 35} }>
                    <Navbar.Brand as={ Link } to="/" style={ {whiteSpace: 'initial'} } >Ecommerce App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={ Link } to="/login" className='option line' >
                            <TriggerRendererProp
                            classItem={'bx bx-user'}
                            text={'Login'}
                            />
                        </Nav.Link>
                        <Nav.Link as={ Link } to="/purchases" className='option' >
                            <TriggerRendererProp
                            classItem={'bx bx-shopping-bag'}
                            text={'My Purchases'}
                            />
                        </Nav.Link>
                        <Nav.Link onClick={ handleShow } className='option line' >
                            <TriggerRendererProp
                            classItem={'bx bx-cart'}
                            text={'Shopping Cart'}
                            />
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <SideBar 
            show={show}
            handleClose={handleClose}
            />
        </>
    )
}

export default NavBar