import React from 'react';
import { Link } from 'react-router-dom';
import background from '../media/pencil.jpg';


const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
};

export default function LandingPage(props) {

    return(
        <section style={ sectionStyle }>
            <div className="landing-page">
                <h1 id="app-name">SCHEDULR</h1>
            
                <p id="app-description">A simple appointment scheduling app with automated notifications</p>
                <Link style={{ textDecoration: 'none' }} to="/login">
                    <button className="btn login-button">GET STARTED</button>
                </Link>
            </div>
        </section>
    );
}

