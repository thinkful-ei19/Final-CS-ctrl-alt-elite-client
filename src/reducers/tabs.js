// import moment from 'moment';
import { SELECT_TAB, SELECT_THEME } from '../actions/tabs';

const initialState = {
    selectedTab: 'dashboard',
    theme: 'default'
};

export default function reducer(state = initialState, action) {
    if (action.type === SELECT_TAB) {
        return Object.assign({}, state, {
            selectedTab: action.tab
        });
    } else if (action.type === SELECT_THEME) {
        return Object.assign({}, state, {
            theme: action.theme
        });
    }

    return state;
}
