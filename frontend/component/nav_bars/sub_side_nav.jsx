import React from 'react'
import { withRouter } from 'react-router-dom';
import SideNavLinks from './side_nav_links';


const SubSideNav = props => {

    const toHomeEvent = e => {
        e.preventDefault();
        props.history.push('/')
    }

    const listClass = props.location.pathname === '/' ? 'ssi-select' : "";

    return (
        <div className='ssn-ctn'>
            <nav id='ssn'>
                <div className='ssn-content flexh-2'>
                    <ul className='flexv-1'>
                        <li
                            onClick={toHomeEvent}
                            id='Home'
                            className={listClass}>
                            <i className="fas fa-home" />
                            <span>Home</span>
                        </li>

                        <SideNavLinks />
                    </ul>
                </div>
            </nav>
        </div>
    )
}


export default withRouter(SubSideNav);