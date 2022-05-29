import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils/utils';


const Signin = () => {
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {userInfo}=state;
  const navigate = useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({type: 'USER_SIGNIN', payload:data})
      localStorage.setItem('userInfo',JSON.stringify(data))
      navigate(redirect || '/')
      console.log(data);
    } catch (err) {
      toast.error(getError(err))
   
    }
  };
 //se we won't see the sign in page even tho we are aleardy signed in
  useEffect(()=> {
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,redirect,userInfo])
  return (
    <Container className="small-container">
      <h1 className="my-3">S'identifier </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Adresse e-mail</Form.Label>
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
        <div className="mb-3">
          <Button variant="outline-dark" type="submit">
          Continuer
          </Button>
        </div>
        <div className="mb-3">
          <span>Nouveau chez élboutik ?</span>{' '}
          <Link to={`/signup?redirect=${redirect}`}>Créez votre compte</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signin;
