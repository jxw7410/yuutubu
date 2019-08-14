import React from 'react'
import { withRouter } from 'react-router-dom';
import SideNavLinks from './side_nav_links';



//Change this to React Func Component
class SubSideNav extends React.Component {

    constructor(props) {
        super(props);
        this.toHomeEvent = this.toHomeEvent.bind(this);
    }

    toHomeEvent(e) {
        this.props.history.push('/')
    }


    render() {
        return (
            <div className='ssn-ctn'>
                <nav id='ssn'>
                    <div className='ssn-content flexh-2'>
                        <ul className='flexv-1'>
                            <li
                                onClick={this.toHomeEvent}
                                id='Home'
                                className={this.props.location.pathname === '/' ? 'ssi-select' : ""}>
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
}


export default withRouter(SubSideNav);