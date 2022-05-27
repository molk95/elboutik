import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Product from './Components/Product';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import {Store} from './Store'
import Cart from './Components/Cart';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar className="primary-color" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>élBoutika</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
              <i class="fa-solid fa-cart-shopping"></i>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c)=>a + c.quantity,0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">
          {' '}
          &copy; All right reserved to Molk Saouabi
        </div>
      </footer>
    </div>
  );
}

export default App;
