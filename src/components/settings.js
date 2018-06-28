import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navigation from './navigation';
import requiresLogin from './requires-login';
import { changeTheme } from '../actions/auth';
import ChangePasswordForm from './change-password';
import SvgIcon from '@material-ui/core/SvgIcon';
import lightBackground from '../media/laptop.jpg';
import darkBackground from '../media/deskWhite.jpg';

export class Settings extends React.Component {

    componentDidMount() {
        if (this.props.selectedTab === 'dashboard') {
            return <Redirect to='/dashboard' />
        }
    }

    changeTheme(value) {
        if (value !== 'null') {
            this.props.dispatch(changeTheme(this.props.authToken, value, this.props.currentUser.id))
            window.location.reload();
        }
    }

    render() {
        let sectionStyle = {
            backgroundSize: "100% 100%",
            height: "100VH",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${lightBackground})`
        };
        const theme = this.props.currentUser.options.theme;
        if (theme === 'dark') {
            sectionStyle = {
                backgroundSize: "100% 100%",
                height: "100VH",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${darkBackground})`
            }
        }
        return (
            <section className="settings" style={ sectionStyle }>
                <span className="overlay settings__flex">
                    <Navigation/>
                    <div className="settings__options">
                        <div className="settings__user">
                                {/* <SvgIcon>
                                <path xmlns="http://www.w3.org/2000/svg" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,5c1.66,0,3,1.34,3,3s-1.34,3-3,3S9,9.66,9,8   S10.34,5,12,5z M12,19.2c-2.5,0-4.71-1.28-6-3.22c0.03-1.99,4-3.08,6-3.08c1.99,0,5.97,1.09,6,3.08C16.71,17.92,14.5,19.2,12,19.2z   "/>
                                </SvgIcon> */}
                            <h2 className="settings__user__username">Logged in as {this.props.currentUser.username}</h2>
                        </div>
                        <div className="settings__change-theme">
                            <h2 className="settings__change-theme__header">Select Theme</h2>
                            <select onChange={(event) => this.changeTheme(event.target.value)} className="settings__change-theme__drop-down">
                                <option className="settings__change-theme__option" value="null"></option>
                                <option className="settings__change-theme__option" value="light">Light</option>
                                <option className="settings__change-theme__option" value="dark">Dark</option>
                            </select>
                        </div>
                        <div className="settings__change-password">
                            <h2 className="settings__change-password__header" >Change Password</h2>
                            <ChangePasswordForm authToken={this.props.authToken} userId={this.props.currentUser.id} />
                        </div>
                    </div>
                </span>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        selectedDate: state.calendarReducer.selectedDate,
        selectedTab: state.tabsReducer.selectedTab
    }
};

export default requiresLogin()(connect(mapStateToProps)(Settings));
