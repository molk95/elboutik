import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils/utils';

const Signup = () => {
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Le mot de passe ne correspond pas');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/Signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_Signup', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
      console.log(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  //se we won't see the sign in page even tho we are aleardy signed in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="small-container">
      <h1 className="my-3">Créer un compte</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Votre nom </Form.Label>
          <Form.Control
            required
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Adresse e-mail </Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Entrez le mot de passe à nouveau</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button variant="outline-dark" type="submit">
            Continuer
          </Button>
        </div>
        <div className="mb-3">
          <span>Vous possédez déjà un compte ?</span>{' '}
          <Link to={`/signin?redirect=${redirect}`}>Identifiez-vous</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signup;
