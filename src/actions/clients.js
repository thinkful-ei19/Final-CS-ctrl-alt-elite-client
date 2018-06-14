import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { getUserInfoById } from './auth';

export const DELETE_CLIENT_REQUEST = 'DELETE_ClIENT_REQUEST';
export const deleteClientRequest = () => ({
    type: DELETE_CLIENT_REQUEST
});

export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const deleteClientSuccess = clients => ({
    type: DELETE_CLIENT_SUCCESS,
    clients
});

export const DELETE_CLIENT_ERROR = 'DELETE_CLIENT_ERROR';
export const deleteClientError = error => ({
    type: DELETE_CLIENT_ERROR,
    error
});

export const deleteClient = (authToken, id, userId) => (dispatch) => {
    dispatch(deleteClientRequest());
    console.log(`deleting client with clientId: ${id} for user: ${userId}`);
    fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'DELETE', 
        body: JSON.stringify({userId}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
    })
    .then(res => normalizeResponseErrors(res))
    .then(client => {
        console.log(client);
        dispatch(deleteClientSuccess(client))
    })
    .then(() => {
        dispatch(getUserInfoById(authToken, userId))
    })
    .catch(err => {
        dispatch(deleteClientError(err));
    });
}


export const editClient = (authToken, values, id, userId) => (dispatch) => {
console.log('updating client info');

    const updateObject = {
            email: values.email,
            name: values.name,
            phone: values.phone 
    }
console.log('heres the updateObject', updateObject);

    fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(updateObject),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
    })
    .then((res) => {
        res.json()
    })
    .then(() => {
        dispatch(getUserInfoById(authToken, userId))
    })
    .catch((result) => {
        console.error(result)
    })

}