import moment from 'moment';
import {
    ADD_APPOINTMENT_REQUEST,
    ADD_APPOINTMENT_SUCCESS,
    ADD_APPOINTMENT_ERROR,
    SET_DATE
} from '../actions/appointment';

const initialState = {
    appointments: [],
    error: null,
    loading: null,
    date: moment().format('MM DD YYYY')
}

export default function appointmentsReducer(state=initialState, action) {
    if (action.type === ADD_APPOINTMENT_REQUEST) {
        return Object.assign({}, state, {
            loading: true
        });
    }
    else if (action.type === ADD_APPOINTMENT_SUCCESS) {
        return Object.assign({}, state, {
            appointments: action.appointments,
            loading: false,
            error: null
        });
    }
    else if (action.type === ADD_APPOINTMENT_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    }
    else if (action.type === SET_DATE) {
        return Object.assign({}, state, {
            date: action.date
        });
    }
    return state;
} 