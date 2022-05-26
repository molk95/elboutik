import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
const ProductList = ({ product }) => {
  
  // const {product} = props
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
          <Button variant="outline-dark">Ajouter au panier</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductList;
