import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import background from '../media/pencil.jpg';


const sectionStyle = {
    backgroundSize: "100% 100%",
    height: "100VH",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`
};

export function LandingPage1(props) {

    return(
        <section style={ sectionStyle }>
            <div className="landing-page">
                <h1>APP-NAME</h1>
            
                <p>a simple appointment scheduling app with 
                    automated notifications</p>
            </div>
        </section>
    );
}