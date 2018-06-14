// import moment from 'moment';
import { SELECT_TAB } from '../actions/tabs';

const initialState = {
    selectedTab: 'dashboard'
};

export default function reducer(state = initialState, action) {
    if (action.type === SELECT_TAB) {
        return Object.assign({}, state, {
            selectedTab: action.tab
        });
    }
    return state;
}
