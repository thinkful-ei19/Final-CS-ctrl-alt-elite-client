import React from 'react';
import HeaderBar from './header-bar';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <HeaderBar />
                This is the Dashboard
            </div>
        )
    }
}