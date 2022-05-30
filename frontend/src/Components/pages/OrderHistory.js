import React, { useContext, useEffect, useReducer } from 'react';
import Loading from '../layout/Loading';
import ErrorMessege from '../layout/ErrorMessege';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils/utils';
import Button from 'react-bootstrap/esm/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, oerders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const OrderHistory = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/orders/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token} ` },
        });
        dispatch({ type: 'FETCH_SUCCESS', pyaload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', pyaload: getError(err) });
      }
    };
    fetchData()
  }, [userInfo]);

  return (
    <div>
      <h1> Historique des commandes</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessege variant="dander"> {error} </ErrorMessege>
      ) : (
        <table className="table">
          <thread>
            <tr>
              <th>Date</th>
              <th>Total</th>
              <th>Payé</th>
              <th>Livré</th>
              <th>Actions</th>
            </tr>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td> {order.createdAt.substring(0, 10)} </td>
                  <td> {order.totalPrice.toFixed(2)} </td>
                  <td>
                    {' '}
                    {order.isPaied
                      ? order.paiedAt.substring(0, 10)
                      : ' Non'}{' '}
                  </td>
                  <td>
                    {' '}
                    {order.isDelivred
                      ? order.delivredAt.substring(0, 10)
                      : ' Non'}{' '}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order.id}`);
                      }}
                    >
                      Détails
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </thread>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
