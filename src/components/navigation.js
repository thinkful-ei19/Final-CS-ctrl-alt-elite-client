import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

class Navigation extends React.Component {
    logOut() {
        console.log('LOOK');
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    render() {
        return (
        <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

            <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>

            <div className="navigation__background">&nbsp;</div>

            <nav className="navigation__nav">
                <ul className="navigation__list">
                    <li className="navigation__item"><a href="" className="navigation__link"><span>01</span>Home</a></li>
                    <li className="navigation__item"><a href="" className="navigation__link"><span>02</span>Clients</a></li>
                    <li className="navigation__item"><a href="" className="navigation__link"><span>03</span>Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Navigation);
