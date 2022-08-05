import Container from "react-bootstrap/Container";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar sticky="top" variant="dark" bg="dark" expand="sm">
      <Container>
        <Navbar.Brand href="https://giphy.com/" target="_blank">
          My Giphy
        </Navbar.Brand>
        <NavbarToggle />
        <NavbarCollapse>
          <Nav className="w-100" defaultActiveKey="trending" fill>
            <Nav.Link as={Link} to="/trending" eventKey="trending">
              Trending
            </Nav.Link>
            <Nav.Link as={Link} to="/search" eventKey="search">
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/random" eventKey="random">
              Random
            </Nav.Link>
            <Nav.Link as={Link} to="/upload" eventKey="upload">
              Upload
            </Nav.Link>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>    
  );
}

export default NavBar;
