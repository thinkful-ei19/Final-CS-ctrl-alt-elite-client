import moment from 'moment';
import { CHANGE_MONTH, CHANGE_YEAR, SELECT_DATE } from '../actions/calendar';

const initialState = {
    selectedMonth: moment().format('MM'),
    selectedYear: moment().format('YYYY'),
    selectedDate: moment().format('YYYY-MM-DD')
};

export default function reducer(state = initialState, action) {
    if (action.type === CHANGE_MONTH) {
        return Object.assign({}, state, {
            selectedMonth: action.month
        });
    } else if (action.type === CHANGE_YEAR) {
        console.log(action.year)
        return Object.assign({}, state, {
            selectedYear: action.year
        });
    } else if (action.type === SELECT_DATE) {
        return Object.assign({}, state, {
            selectedDate: action.date
        });
    } 

    return state;
}
