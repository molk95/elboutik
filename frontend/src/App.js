import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Product from './Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="danger" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>élBoutika</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<Product />} />
          </Routes>
        </Container>
      </main>
      <footer>
      <div className='text-center'> &copy; All right reserved to Molk Saouabi</div>
      </footer>
    </div>
  );
}

export default App;
