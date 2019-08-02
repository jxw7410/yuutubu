import React from 'react'
import { withRouter } from 'react-router-dom';
import SideNavLinks from './side_nav_links';


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
            <div id='sub-side-nav-ctn'>
                <nav id='sub-side-nav'>
                    <article id='sub-side-nav-content' className='flex-hzntal-ctr-1'>
                        <ul className='flex-vert-ctr-all'>
                            <li
                                onClick={this.toHomeEvent}
                                id='Home'
                                className={this.props.location.pathname === '/' ? 'sub-side-icon-selected' : ""}>
                                <i className="fas fa-home" />
                                <span>Home</span>
                            </li>

                            <SideNavLinks />
                        </ul>
                    </article>
                </nav>
            </div>
        )
    }
}


export default withRouter(SubSideNav);