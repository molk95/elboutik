import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import Product from '../Components/Product/Product';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { Store } from '../Store';
import Cart from '../Components/Cart';
import Signin from '../Components/auth/Signin';
import Signup from '../Components/auth/Signup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddress from '../Components/ShippingAddress';
import PaymentMethod from '../Components/PaymentMethod';
import PlaceOrder from '../Components/PlaceOrder';
import Order from '../Components/Order';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
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
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>
                      Historique des commandes
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin">
                  Bonjour, Identifiez-vous
                </Link>
              )}
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
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shipping" element={<ShippingAddress />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />
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
