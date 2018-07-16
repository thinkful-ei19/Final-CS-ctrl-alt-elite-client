import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './login-form';
import background from '../media/wB.jpg';


const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
  };

export function LogIn(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section className="login" style={ sectionStyle }>
            <div className="login-form">
                <h1>Welcome!</h1>
                <br/>
                    <LoginForm />
                    <div className="register-line">
                        <br/>Don't have an account? <Link style={{ textDecoration: 'none', color: '#2E86C1' }} to="/register">Register</Link>
                    </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LogIn);
