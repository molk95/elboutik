import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Product from './Product';

function App() {
  return (
    <div className="App">
      <header>
        <Link to="/">élBoutika</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
