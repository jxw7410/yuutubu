import React from 'react';
import {Link} from 'react-router-dom';

class SplashNav extends React.Component {
    constructor(props){
        super(props)

        this.handleLogout = this.handleLogout.bind(this);
    }


    handleLogout(e){
        e.preventDefault();
        this.props.logOut();
    }

    render() {
        return (
            <div id='splash-nav'>
                <div id="splash-nav-sec-1">
                    <i className="fas fa-bars"></i>
                    <span id='nav-bar-icon'><i className="fab fa-youtube"></i><h1>Yuutubu</h1></span>
                </div>

                <div id="splash-nav-sec-2">
                    <section id='search-bar'>
                        <input id='search-bar-input' type='text' />
                        <button id='search-bar-button'> <i className="fas fa-search"></i> </button>
                    </section>
                </div>

                <div id="splash-nav-sec-3">  
                    <ul id='nav-bar-right-ul'>
                        <li>{
                            this.props.isLoggedIn ? 
                            <button onClick={this.handleLogout} >Sign Out</button> : 
                            <Link to='/signup'>Sign In</Link>
                        }</li>

                        <li> </li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default SplashNav;