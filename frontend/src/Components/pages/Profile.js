import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../../Store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import { getError } from '../../utils/utils';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'FETCH_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'FETCH_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};
const Profile = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
          type: 'FETCH_SUCCESS'
      })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data))
      toast.success('Mise à jour du profil réussie')
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });

      toast.error(getError(err));
    }
  };
  return (
    <div>
      <h1>Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nom & prénom</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirmer Mot de passe</Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Modifier</Button>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
