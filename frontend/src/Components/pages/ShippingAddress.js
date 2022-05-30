import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps';
import { toast } from 'react-toastify';
import { getError } from '../../utils/utils';

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );

  const submitHandler = (event) => {
    event.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
      })
    );
    navigate('/payment');
    try {
    } catch (err) {
      toast.error(getError(err))
    }
  };
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo,navigate]);
  return (
    <div>
    <CheckoutSteps step1 step2 />
      <div className="container small-container">
        {' '}
        <h1 className="my-3"> Adresse de livraison</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Nom & prénom</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ville</Form.Label>
            <Form.Control
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Code Postal</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="outline-dark" type="submit">
            Continuer
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddress;
