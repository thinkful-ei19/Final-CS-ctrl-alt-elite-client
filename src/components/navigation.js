import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { changeTab } from '../actions/tabs';

class Navigation extends React.Component {
    logOut() {
        console.log('clearing authToken and logging out user');
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

                    <li className="navigation__item">
                        <Link to="/dashboard">
                                <a href=""
                                    onClick={() => {this.props.dispatch(changeTab('dashboard'))}}
                                    className="navigation__link">Home
                                </a>
                        </Link>
                    </li>


                    <li className="navigation__item">
                        <Link to="/clients">
                            <a href="" 
                            onClick={() => {this.props.dispatch(changeTab('clients'))}}
                            className="navigation__link">Clients
                            </a>
                        </Link>
                    </li>

                    <li className="navigation__item">
                        <a 
                          href="" 
                            onClick={(e) => {
                            e.preventDefault();
                            this.logOut();
                            }}
                          className="navigation__link">Logout
                        </a>
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
