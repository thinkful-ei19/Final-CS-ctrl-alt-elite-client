import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import moment from 'moment';

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

export const SET_DATE = 'SET_DATE';
export const setDate = date => ({
    type: SET_DATE,
    date
})

export const addClient = (authToken, client, id) => (dispatch) => {
    fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'POST', 
        body: JSON.stringify(client),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(response => {
        dispatch(addAppointmentSuccess(response));
    }).catch(err => {
        dispatch(addAppointmentError());
    });
}


export const addAppointment = (authToken, appointment, id) => (dispatch) => {
    console.log('DISPATCHING');
    dispatch(addAppointmentRequest());
    const newAppointment = { 
        time: moment(String(appointment.date + ' ' + appointment.time)).format(),
        client: {
            name: appointment.name,
            phone: appointment.phone,
            email: appointment.email
        }, 
        notes: null 
    };
    if (appointment.checked === true) {
        dispatch(addClient(authToken, newAppointment.client, id))
    }
    // console.log('STRINGIFIED VALUES:', JSON.stringify(newAppointment));
    fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'POST', 
        body: JSON.stringify(newAppointment),
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
