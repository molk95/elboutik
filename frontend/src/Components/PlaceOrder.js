import React, { useContext } from 'react';
import CheckoutSteps from './CheckoutSteps';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="container small-container">
        <h1 className="my-3">Passer la commande</h1>
        <Row>
          <Col mad={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                  <Card.Text>
                    <strong>Nom:</strong> {cart.shippingAddress.fullName}
                    <br />
                    <strong>Addresse:</strong> {cart.shippingAddress.address}
                    <br />
                    {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode}
                    <br />
                  </Card.Text>
                </Card.Title>
                <Link to="/shipping">Modifier</Link>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Livraison</Card.Title>
                <Card.Text>
                  <strong>Méthode</strong> {cart.paymentMethod}
                </Card.Text>

                <Link to="/payment">Modifier</Link>
              </Card.Body>
            </Card>
            <Card className="mb-3">
            <Card.Body>
              <Card.Title>Article</Card.Title>
              <ListGroup vriant="flush" >
               {cart.cartItems.map((item)=>(
                <ListGroup.Item key={item._id}>
                <Row>
                 <Col md={6}>
                 <img scr={item.image} alt={item.name}
                 className="img-fluid rouneded img-thumbnail" />
                 </Col>
                 <Col md={3} >
                  <span >
                   {item.quantity}
                  </span>
                 </Col>
                 <Col md={3} >
                   {item.price}
                 </Col>
                </Row>
                </ListGroup.Item>
               ))}
              </ListGroup>

              <Link to="/payment">Modifier</Link>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PlaceOrder;
