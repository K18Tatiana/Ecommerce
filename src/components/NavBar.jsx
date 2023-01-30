import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={ Link } to="/" >Ecommerce App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/login" >Login</Nav.Link>
                    <Nav.Link as={ Link } to="/purchases" >Purchases</Nav.Link>
                    <Nav.Link href="#">Purchases (sidebar)</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar