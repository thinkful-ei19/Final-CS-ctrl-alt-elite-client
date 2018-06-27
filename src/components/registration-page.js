import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import background from '../media/wB.jpg';
import RegistrationForm from './registration-form';
import SvgIcon from '@material-ui/core/SvgIcon';

const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
  };

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <section className="register__parent" style={ sectionStyle }>
            <div className="register">
                {/* <h1>Register New User</h1> */}
                    <Link className="register__back-button" to="/login">
                        <SvgIcon>
                            <path xmlns="http://www.w3.org/2000/svg" d="M20,11H6.83l2.88-2.88c0.39-0.39,0.39-1.02,0-1.41l0,0c-0.39-0.39-1.02-0.39-1.41,0l-4.59,4.59 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L6.83,13H20c0.55,0,1-0.45,1-1 v0C21,11.45,20.55,11,20,11z"/>
                        </SvgIcon>
                    </Link>
                    <br/>
                <RegistrationForm usernameTaken={props.usernameTaken} />
                <br/>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    usernameTaken: state.auth.usernameTaken
});

export default connect(mapStateToProps)(RegistrationPage);
