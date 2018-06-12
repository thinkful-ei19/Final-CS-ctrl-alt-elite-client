import {
    ADD_APPOINTMENT_REQUEST,
    ADD_APPOINTMENT_SUCCESS,
    ADD_APPOINTMENT_ERROR
} from '../actions/appointment';

const initialState = {
    appointments: [],
    error: null,
    loading: null
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
    return state;
} 