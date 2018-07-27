import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { API_BASE_URL } from '../config';
import { login } from '../actions/auth';

import githubIcon from '../styles/images/github/githubWhite.png';
import linkedInIcon from '../styles/images/linkedin/linkedInWhite.png';
import Logo from '../media/schedulrLogoSized.png';

import ssOne from '../styles/images/screenshot-1.png';
import ssTwo from '../styles/images/screenshot-2.png';
import ssThree from '../styles/images/screenshot-3.png';
import ssFour from '../styles/images/screenshot-4.png';
import ssFive from '../styles/images/screenshot-5.png';
import ssSix from '../styles/images/screenshot-6.png';
import ssSeven from '../styles/images/screenshot-7.png';
import ssEight from '../styles/images/screenshot-8.png';
import ssNine from '../styles/images/screenshot-9.png';
import ssTen from '../styles/images/screenshot-10.png';


class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            demo: false
        }
    }

    componentDidMount() {
    //Wake the heroku server up.
    fetch(`${API_BASE_URL}`, {
        method: 'GET', 
        headers: {
            'Accept': 'application/json',
          }
    })
    .then(res => console.log('Sent artbitrary get request to heroku server to wake it up...', res)).catch(err => {});}

    demoLogin() {
        this.props.dispatch(login('demo', 'password'));
        this.setState({demo: true})
    }

    render() {
        if (this.state.demo === true) {
            return <Redirect to='/login'/>;
        }

        return(
            <section className="landing-page">
                <nav className="nav">
                   <img alt="logo" className="logo" src={Logo}/>
                    <a onClick={() => this.demoLogin()}>
                        <span className="nav__button">Demo</span>                        
                    </a>
                    <Link to="/login">
                        <span className="nav__button">Login</span>
                    </Link>
                    <Link to="/register">
                        <span className="nav__button">Signup</span>
                    </Link>
                </nav>
                <div className="head">
                    <div className="welcome">
                        <div className="welcome__screen">
                            <span className="welcome__message">
                                <h1 className="welcome__message__top">Making appointments</h1>
                                <h1 className="welcome__message__bottom"> has never been easier</h1>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="about">
                    {/* <h2 className="about__header">The perfect business companion</h2> */}
                    <ul className="about__list">
                        <li className="about__list__item">
                            <span className="about__list__item__left">
                                <h3 className="about__list__item__header">Fast, expressive and convenient</h3>
                                <p className="about__list__item__details"><b className="bold">Schedulr</b> shows your appointments with an interactive calendar 
                                    and allows you full flexibility and control.</p>
                            </span>
                            <span className="about__list__item__right">
                                <img className="about__list__item__image" src={ssOne} />
                                <img className="about__list__item__image" src={ssThree} />
                            </span>
                        </li>
                        <li className="about__list__item-two"> 
                            <h3 className="about__list__item__header">Automated reminders</h3>
                            <p className="about__list__item__details">Let <b className="bold">Schedulr</b> do the tedious work for you. Reminders for clients?
                            No problem! <b className="bold">Schedulr</b> will do it for you.</p>
                        </li>
                        <li className="about__list__item-three">
                            <div className="about__list__item-three__left">
                                <img className="about__list__item-three__image about__list__item-three__image__first" src={ssNine} />
                                <img className="about__list__item-three__image about__list__item-three__image__second" src={ssTwo} />
                            </div>
                            <div className="about__list__item-three__right">
                                <h3 className="about__list__item-three__header">Customization at your fingertips</h3>
                                <p className="about__list__item-three__details">A truly great user experience is one that can be made personal. 
                                <b className="bold"> Schedulr</b> offers different themes for a more personalized user experience.</p>
                            </div>
                        </li>
                        <li className="about__list__item-four">
                            <span className="about__list__item-four__top">
                                <img className="about__list__item-four__image" src={ssFive} />
                                <img className="about__list__item-four__image" src={ssSix} />
                            </span>
                            <span className="about__list__item-four__bottom">
                                <h3 className="about__list__item-four__header">Detailed Reports</h3>
                                <p className="about__list__item-four__details">Good planning isn't just about appointments.
                                <b className="bold"> Schedulr</b> can show you information about your clientele with its own reports!</p>
                            </span>
                        </li>
                    </ul>
    
                            
                        {/* <li className="about__list__item">
                            <span className="about__list__item__left">
                                
                                <img className="about__list__item__image" src={ssOne} />
                            </span>
                            <span className="about__list__item__right">
                            <h3 className="about__list__item__header">Customization at your fingertips</h3>
                                <p className="about__list__item__details">A truly great user experience is one that can be made personal. 
                                <b className="bold"> Schedulr</b> offers different themes for a more personalized user experience.</p>
                            </span>
                        </li>
                        <li className="about__list__item">
                            <span className="about__list__item__left">
                                <img className="about__list__item__image" src={ssOne} />
                            </span>
                            <span className="about__list__item__right">
                            <h3 className="about__list__item__header">Detailed Reports</h3>
                                <p className="about__list__item__details">Good planning isn't just about appointments.
                                <b className="bold">Schedulr</b> can show you information about your clientele with its own reports!</p>
                            </span>
                        </li> */}
                   
                </div>
                {/* <div className="about">            
                    <div className="about__left">
                        <h2 className="about__header">The perfect business companion</h2>              
                    </div>
                    <div className="about__right">
                        <div className="about__content">
                            <ul className="about__list">
                                <li className="about__list__item">
                                    <h3 className="about__list__item__header">Fast, expressive and convenient</h3>
                                    <p className="about__list__item__details"><b className="bold">Schedulr</b> shows your appointments with an interactive calendar 
                                        and allows you full flexibility and control.</p>
                                </li>
                                <li className="about__list__item">
                                    <h3 className="about__list__item__header">Automated reminders</h3>
                                    <p className="about__list__item__details">Let <b className="bold">Schedulr</b> do the tedious work for you. Reminders for clients?
                                        No problem! <b className="bold">Schedulr</b> will do it for you.</p>
                                </li>
                                <li className="about__list__item">
                                    <h3 className="about__list__item__header">Customization at your fingertips</h3>
                                    <p className="about__list__item__details">A truly great user experience is one that can be made personal. 
                                    <b className="bold"> Schedulr</b> offers different themes for a more personalized user experience.</p>
                                </li>
                                <li className="about__list__item">
                                    <h3 className="about__list__item__header">Detailed Reports</h3>
                                    <p className="about__list__item__details">Good planning isn't just about appointments.
                                    <b className="bold">Schedulr</b> can show you information about your clientele with its own reports!</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
                <div className="whats-new">
                    <h2 className="whats-new__header">Always on the go? Our mobile app has you covered!</h2>
                    <div className="whats-new__left">
                        <img alt="iPhone pic of mobile app" className="phone-image" src={ssTen} />
                    </div>
                    <div className="whats-new__right">
                    <h3 className="whats-new__list__item__header"><b className="bold">Schedulr</b> can go wherever your phone goes</h3>
                        <p className="whats-new__list__item__details">Enjoy all of the features <b className="bold">Schedulr</b> has to offer on mobile! Whether you are the one visiting your clients or not, <b className="bold">Schedulr</b> will always be with you.</p>
                    </div>
                </div>
                <div className="about-us">
                    <h4 className="about-us__header">This web application crafted and designed by:</h4>
    
                    <div className="about-us__people">
                        <div className="about-us__person">
                            <ul className="about-us__person__list">
                                {/* <li className="about-us__person__list__item about-us__person__list__name">Julie Kim</li> */}
                                <li className="about-us__person__list__item about-us__person__list__portfolio">
                                    <a className="about-us__person__list__portfolio__text" href="http://www.itsjuliek.com" target="blank">JULIE KIM</a>
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__github">
                                    <a href="https://github.com/joulay" target="blank"><img alt="github icon" src={githubIcon}/></a> 
                                                                                   
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__linkedin">
                                    <a href="https://www.linkedin.com/in/joulay/" target="blank"><img alt="linkedIn icon" style={{width: '28px'}} src={linkedInIcon}/></a>                        
                                </li>
                            </ul>
                        </div>
                        <div className="about-us__person">
                            <ul className="about-us__person__list">
                                {/* <li className="about-us__person__list__item about-us__person__list__name">Alexa Scott</li> */}
                                <li className="about-us__person__list__item about-us__person__list__portfolio">
                                    <a className="about-us__person__list__portfolio__text" href="" target="blank">ALEXA SCOTT</a>
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__github">
                                    <a href="https://github.com/AlexaScott33" target="blank"><img alt="github icon" src={githubIcon}/></a>                                                
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__linkedin">
                                    <a href="https://www.linkedin.com/in/alexa-scott-0a1040163/" target="blank"><img alt="linkedIn icon" style={{width: '28px'}} src={linkedInIcon}/></a>                        
                                </li>
                            </ul>
                        </div>
                        <div className="about-us__person">
                            <ul className="about-us__person__list">
                                {/* <li className="about-us__person__list__item about-us__person__list__name">Joshua Hutchinson</li> */}
                                <li className="about-us__person__list__item about-us__person__list__portfolio">
                                    <a className="about-us__person__list__portfolio__text" href="" target="blank">JOSH HUTCHINSON</a>
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__github">
                                    <a href="https://github.com/JTHUTCH94" target="blank"><img alt="linkedIn icon" src={githubIcon}/></a>                                                
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__linkedin">
                                    <a href="https://www.linkedin.com/in/hutchinson-joshua/" target="blank"><img alt="linkedIn icon" style={{width: '28px'}} src={linkedInIcon}/></a>                        
                                </li>
                            </ul>
                        </div>
                        <div className="about-us__person">
                            <ul className="about-us__person__list">
                                {/* <li className="about-us__person__list__item about-us__person__list__name">Christopher Whiteman</li> */}
                                <li className="about-us__person__list__item about-us__person__list__portfolio">
                                    <a className="about-us__person__list__portfolio__text" href="http://www.chris-whiteman.com" target="blank">CHRIS WHITEMAN</a>
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__github">
                                    <a href="https://github.com/cjszk" target="blank"><img alt="github icon" src={githubIcon}/></a>                                                
                                </li>
                                <li className="about-us__person__list__item about-us__person__list__linkedin">
                                    <a href="https://www.linkedin.com/in/christopher-whiteman-474a89162/" target="blank"><img alt="linkedIn icon" style={{width: '28px'}} src={linkedInIcon}/></a>                        
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
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

export default (connect(mapStateToProps)(LandingPage));