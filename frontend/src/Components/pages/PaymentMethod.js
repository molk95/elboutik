import React, { useContext, useEffect, useState } from 'react';
import CheckoutSteps from '../CheckoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';


const PaymentMethod = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );
  const submitHandler = (event) => {
    event.preventDefault();
    ctxDispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: paymentMethodName,
    });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <h1 className="my-3">Mode de paiement</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              id="Enespèces"
              label="En espèces"
              value="Enespèces"
              checked={paymentMethodName === 'Enespèces'}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
          </Form.Group>
          <div className="my-3">
            <Button variant="outline-dark" type="submit">
              Continuer
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethod;
