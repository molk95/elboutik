import React, { useEffect,useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductList from '../Components/ProductList';
import Loading from './Loading';
import ErrorMessege from './ErrorMessege';
// import data from './data';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const Home = () => {
  const [{ loading, products, error }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Produits populaires</h1>
      <div className="products">
        {loading ? (
          <Loading/>
        ) : error ? (
          <ErrorMessege variant='danger'> {error} </ErrorMessege>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                <ProductList product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
