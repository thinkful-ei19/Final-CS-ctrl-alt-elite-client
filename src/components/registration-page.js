import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import background from '../media/wB.jpg';
import RegistrationForm from './registration-form';

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
        <section style={ sectionStyle }>
            <div>
                <div className="register">
                    <p className="register__p">Back to <Link to="/login">Login</Link></p>
                    <RegistrationForm />
                    <br/>
                    
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
