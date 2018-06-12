import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
// import { Redirect } from 'react-router-dom';



// import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        console.log('LOOK');
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        // if (this.props.loggedIn) {
        //     logOutButton = (
        //         <button
        //           onClick={() => this.logOut()}>
        //           LOG OUT
        //         </button>
        //     );
        // }


        return (
            <div>
                {/* {logOutButton} */}
                <a
                  onClick={() => console.log('looooook')}>
                  LOG OUT
                </a>
                

            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
