import React from 'react';
import SplashNavContainer from './splash_nav/splash_nav_container'
import {Route} from 'react-router-dom';

export default props => {
    return (
        <div id='splash-div'>
            < Route component={SplashNavContainer}/>        
        </div>
    )
}