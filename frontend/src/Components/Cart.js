import React, { useContext } from 'react';
import Store from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ErrorMessege from './ErrorMessege';
import ListGroup from 'react-bootstrap/esm/ListGroupItem';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

const Cart = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <div>
      <h1>Panier</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <ErrorMessege>
              Panier est vide <Link to="/">Retour au crouses</Link>
            </ErrorMessege>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/product/${item.slug}`}>{item.name} </Link>{' '}
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span> {' '}
                      <Button variant="light" disabled={item.quantity === item.countInStock}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                      
                    </Col>
                    <Col md={3}> {item.price} DT </Col>
                    <Col md={2}>
                    <Button variant="light" >
                    <i className="fas fa-plus-trash"></i>
                  </Button></Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default Cart;
