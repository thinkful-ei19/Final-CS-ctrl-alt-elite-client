import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import moment from 'moment';
import { getUserInfoById } from './auth';

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
    console.log(`adding client: ${client}`);
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
        console.log('this is response when adding a client:', response);
        dispatch(addAppointmentSuccess(response));
        dispatch(getUserInfoById(authToken, id))
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
        notes: appointment.notes
    };
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
    .then(res => {
        if (appointment.checked === true) {
            dispatch(addClient(authToken, newAppointment.client, id))
        }
        res.json()
    })
    .then(appointment => {
        dispatch(addAppointmentSuccess(appointment))
        dispatch(getUserInfoById(authToken, id));
    }).catch(err => {
        dispatch(addAppointmentError());
    });
};

export const DELETE_APPOINTMENT_REQUEST = 'DELETE_APPOINTMENT_REQUEST';
export const deleteAppointmentRequest = () => ({
    type: DELETE_APPOINTMENT_REQUEST
});

export const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
export const deleteAppointmentSuccess = appointments => ({
    type: DELETE_APPOINTMENT_SUCCESS,
    appointments
});

export const DELETE_APPOINTMENT_ERROR = 'DELETE_APPOINTMENT_ERROR';
export const deleteAppointmentError = error => ({
    type: DELETE_APPOINTMENT_ERROR,
    error
});

export const deleteAppointment = (authToken, id, userId) => (dispatch) => {
    dispatch(deleteAppointmentRequest());
    console.log(`deleting appointment with aptId: ${id} for user: ${userId}`);
    fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'DELETE', 
        body: JSON.stringify({userId}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
    })
    .then(res => normalizeResponseErrors(res))
    .then(appointment => {
        console.log(appointment);
        dispatch(deleteAppointmentSuccess(appointment))
    })
    .then(() => {
        dispatch(getUserInfoById(authToken, userId))
    })
    .catch(err => {
        dispatch(deleteAppointmentError(err));
    });
}


export const editAppointment = (authToken, values, id, userId) => (dispatch) => {
    const updateObject = {
        time: moment(String(values.date + ' ' + values.time)).format(),
        notes: values.notes,
        client: {
            email: values.email,
            name: values.name,
            phone: values.phone,
        }
    }

    console.log('updateOBJ!!', updateObject.client);

    fetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(updateObject),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
    })
    .then((res) => {
        if (values.checked === true) {
            dispatch(addClient(authToken, updateObject.client, userId))
        }
        res.json()
    })
    .then(() => {
        dispatch(getUserInfoById(authToken, userId))
    })
    .catch((result) => {
        console.error(result)
    })

}