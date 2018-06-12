import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const ADD_APPOINTMENT_REQUEST = 'ADD_APPOINTMENT_REQUEST';
export const addAppointmentRequest = () => ({
    type: ADD_APPOINTMENT_REQUEST
});

export const ADD_APPOINTMENT_SUCCESS = 'ADD_APPOINTMENT_SUCCESS';
export const addAppointmentSuccess = appointments => ({
    type: ADD_APPOINTMENT_SUCCESS,
    appointments
});

export const ADD_APPOINTMENT_ERROR = 'ADD_APPOINTMENT_ERROR';
export const addAppointmentError = error => ({
    type: ADD_APPOINTMENT_ERROR,
    error
});

export const addAppointment = (values, id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(addAppointmentRequest())
    console.log('STRINGIFIED VALUES:',JSON.stringify(values));
    // const newItem = { name: values };
    fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'POST', 
        body: JSON.stringify(values),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(appointment => {
        console.log(appointment);
        dispatch(addAppointmentSuccess(appointment));
    }).catch(err => {
        dispatch(addAppointmentError());
    });
};