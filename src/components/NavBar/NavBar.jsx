import { Nav, Navbar, Container } from "react-bootstrap";
import CartComponent from "../Cart/CartWidget";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="App-header">
      <Navbar className="nav" bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="btnNav">
              Kuki Store
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="btnNav">
              Inicio
            </NavLink>

            <NavLink to="/category/1" className="btnNav">
              Classic
            </NavLink>

            <NavLink to="/category/2" className="btnNav">
              Smart
            </NavLink>

            <NavLink to="/category/3" className="btnNav">
             For Home
            </NavLink>
          </Nav>
        </Container>
        <CartComponent />
      </Navbar>
    </header>
  );
}
