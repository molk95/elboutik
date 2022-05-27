import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';
const Signin = () => {
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/';
  return (
    <Container className="small-container">
      <h1 className="mt-3">Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div className="mb-3">
          <Button variant='outline-dark' type="submit">Sign in</Button>
        </div>
        <div className="mb-3">
         <span>Nouveau chez élboutik ?</span> {' '}
          <Link to={`/signup?redirect=${redirect}`}>Créez votre compte</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signin;
