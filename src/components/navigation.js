import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { changeTab } from '../actions/tabs';

class Navigation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: false
        }
    }

    logOut() {
        console.log('clearing authToken and logging out user');
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    toggleMenu() {
        if (this.state.checked === false) {
            this.setState({checked: true})
        } else {
            this.setState({checked: false})
        }
    }

    render() {
        return (
        <div className="navigation">
            <input 
            onClick={() => {
                this.toggleMenu()
            }}
            ref='checkbox' type="checkbox" checked={this.state.checked} className="navigation__checkbox" id="navi-toggle"/>

            <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>

            <div className="navigation__background">&nbsp;</div>

            <nav className="navigation__nav">
                <ul className="navigation__list">

                    <li className="navigation__item">
                        <Link to="/dashboard"
                            onClick={() => {
                                this.props.dispatch(changeTab('dashboard'))
                                this.toggleMenu()
                            }}
                            className="navigation__link">Home
                        </Link>
                    </li>

                    <li className="navigation__item">
                        <Link to="/clients"
                            onClick={() => {
                                this.props.dispatch(changeTab('clients'))
                                this.toggleMenu()
                            }}
                            className="navigation__link">Clients
                        </Link>
                    </li>

                    <li className="navigation__item">
                        <Link to="/reports"
                            onClick={() => {
                                this.props.dispatch(changeTab('reports'))
                                this.toggleMenu()
                            }}
                            className="navigation__link">Reports
                        </Link>
                    </li>

                    <li className="navigation__item">
                        <Link to="/settings"
                            onClick={() => {
                                this.props.dispatch(changeTab('settings'))
                                this.toggleMenu()
                            }}
                            className="navigation__link">Settings
                        </Link>
                    </li>

                    <li className="navigation__item">
                        <a 
                          href="" 
                            onClick={(e) => {
                            e.preventDefault();
                            this.logOut();
                            window.location.reload();
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
    loggedIn: state.auth.currentUser !== null,
    selectedTab: state.tabsReducer.selectedTab,
});

export default connect(mapStateToProps)(Navigation);
