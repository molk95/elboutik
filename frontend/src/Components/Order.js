import { Axios } from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils/utils';
import ErrorMessege from './layout/ErrorMessege';
import Loading from './layout/Loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Order = () => {
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({
          type: 'FETCH_REQUEST',
        });
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
          headers: { authorizations: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (!userInfo) {
      navigate('/login');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessege variant="danger">{error}</ErrorMessege>
  ) : (
    <div>
      <h1 className="my-3">commander</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Livraison</Card.Title>
              <Card.Text>
                <strong>Name :</strong> {order.shippingAddress.fullNames} <br />
                <strong>Adresse :</strong> {order.shippingAddress.addess},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </Card.Text>
              {order.isDelivred ? (
                <ErrorMessege variant="success">
                  Livré à {order.delivredAt}
                </ErrorMessege>
              ) : (
                <ErrorMessege variant="danger">N'est pas livré</ErrorMessege>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Paiement</Card.Title>
              <Card.Text>
                <strong>Méthode :</strong> {order.paymentMethod} <br />
              </Card.Text>
              {order.isDelivred ? (
                <ErrorMessege variant="success">
                  Payé à {order.paidAt}
                </ErrorMessege>
              ) : (
                <ErrorMessege variant="danger">N'est pas payé</ErrorMessege>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Articles</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="imh-fluid rounded img-thumbnail"
                        ></img>
                        <Link to={`/product/${item.slug}`}> {item.name} </Link>
                      </Col>
                      <Col md={3}>
                        <span> {item.quantity} </span>
                      </Col>
                      <Col md={3}> {item.price} DT </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card classNames="mb-3">
            <Card.Body>
              <Card.Title>Récapitulatif de la commande</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Articles</Col>
                    <Col> {order.itemsPrice.toFixed(2)} DT</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Livraison</Col>
                    <Col> {order.shippingPrice.toFixed(2)} DT</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col> {order.taxPrice.toFixed(2)} DT</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
