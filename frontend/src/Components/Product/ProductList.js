import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../layout/Rating';
import { Store } from '../../Store.js';
import axios from 'axios';
import { toast } from 'react-toastify';
const ProductList = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast.error('Le produit est en rupture de stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <div>
      <Card className="product">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>
            <strong>{product.price} DT</strong>{' '}
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Hors stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              variant="outline-dark"
            >
              Ajouter au panier
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductList;
