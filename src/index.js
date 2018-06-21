import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import App2 from './App';
import store from './store';

const theme = store.getState().tabsReducer.theme

let app = <App />

if (theme === 'alternative') {
    app = <App2 />
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            {app}
        </Router>
    </Provider>,
    document.getElementById('root')
);
