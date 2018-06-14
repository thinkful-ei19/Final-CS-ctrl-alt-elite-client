import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import appointmentReducer from './reducers/appointment';
import calendarReducer from './reducers/calendar';
import tabsReducer from './reducers/tabs';
import clientsReducer from './reducers/clients';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        appointmentReducer,
        clientsReducer,
        calendarReducer,
        tabsReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
