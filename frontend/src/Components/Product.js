import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
const Product = ({ product }) => {
  // const params = useParams();
  // const { slug } = params;
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
          <Button variant="danger">Ajouter au panier</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
