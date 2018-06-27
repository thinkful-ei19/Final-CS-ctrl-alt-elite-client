import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import githubIcon from '../styles/images/github/githubwhite.png';
import linkedInIcon from '../styles/images/linkedin/linkedin.svg';
import Logo from '../media/schedulrLogoSized.png';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function LandingPage(props) {
    //Wake the heroku server up.
    fetch(`${API_BASE_URL}`, {
        method: 'GET', 
        headers: {
            'Accept': 'application/json',
          }
    })
    .then(res => console.log('Sent artbitrary get request to heroku server to wake it up')).catch(err => {});

    return(
        <section className="landing-page">
            
            <nav className="nav">
                <img className="nav__header" />
               <img className="logo" src={Logo}/>
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
                <div className="about__left">           
                    <span className="about__header">     
                        <h2 className="about__header__first">The perfect</h2>
                        <h2 className="about__header__second">business</h2>
                        <h2 className="about__header__third">companion</h2>                    
                    </span>
                </div>
                <div className="about__right">
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
                            <h3 className="about__list__item__header">Detailed Reports</h3>
                            <p className="about__list__item__details">Good planning isn't just about appointments.
                            <b className="bold">Schedulr</b> can show you information about your clientele with its own reports!</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="whats-new">
                <h2 className="whats-new__header">Always on the go? Our mobile app has you covered!</h2>
                <div className="whats-new__left">
                    <img className="phone-image" src="https://www.boostmobile.com/content/dam/boostmobile/en/products/phones/apple-iphone-6s-plus/space-gray/iphone6sPlus_SpaceGray_front@3x.png.transform/pdpCarousel/image.jpg" />
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
                            <li className="about-us__person__list__item about-us__person__list__name">Julie Kim</li>
                            <li className="about-us__person__list__item about-us__person__list__portfolio">
                                <a className="about-us__person__list__portfolio__text" href="http://www.itsjuliek.com" target="blank">Visit her webpage</a>
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__github">
                                <a href="https://github.com/joulay" target="blank"><img src={githubIcon}/></a> 
                                                                               
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__linkedin">
                                <a href="https://www.linkedin.com/in/joulay/" target="blank"><img style={{width: '28px'}} src={linkedInIcon}/></a>                        
                            </li>
                        </ul>
                    </div>
                    <div className="about-us__person">
                        <ul className="about-us__person__list">
                            <li className="about-us__person__list__item about-us__person__list__name">Alexa Scott</li>
                            <li className="about-us__person__list__item about-us__person__list__portfolio">
                                <a className="about-us__person__list__portfolio__text" href="" target="blank">Visit her webpage</a>
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__github">
                                <a href="https://github.com/AlexaScott33" target="blank"><img src={githubIcon}/></a>                                                
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__linkedin">
                                <a href="https://www.linkedin.com/in/alexa-scott-0a1040163/" target="blank"><img style={{width: '28px'}} src={linkedInIcon}/></a>                        
                            </li>
                        </ul>
                    </div>
                    <div className="about-us__person">
                        <ul className="about-us__person__list">
                            <li className="about-us__person__list__item about-us__person__list__name">Joshua Hutchinson</li>
                            <li className="about-us__person__list__item about-us__person__list__portfolio">
                                <a className="about-us__person__list__portfolio__text" href="" target="blank">Visit his webpage</a>
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__github">
                                <a href="https://github.com/JTHUTCH94" target="blank"><img src={githubIcon}/></a>                                                
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__linkedin">
                                <a href="https://www.linkedin.com/in/hutchinson-joshua/" target="blank"><img style={{width: '28px'}} src={linkedInIcon}/></a>                        
                            </li>
                        </ul>
                    </div>
                    <div className="about-us__person">
                        <ul className="about-us__person__list">
                            <li className="about-us__person__list__item about-us__person__list__name">Christopher Whiteman</li>
                            <li className="about-us__person__list__item about-us__person__list__portfolio">
                                <a className="about-us__person__list__portfolio__text" href="http://www.chris-whiteman.com" target="blank">Visit his webpage</a>
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__github">
                                <a href="https://github.com/cjszk" target="blank"><img src={githubIcon}/></a>                                                
                            </li>
                            <li className="about-us__person__list__item about-us__person__list__linkedin">
                                <a href="https://www.linkedin.com/in/christopher-whiteman-474a89162/" target="blank"><img style={{width: '28px'}} src={linkedInIcon}/></a>                        
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

