import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


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
                    <article id='sub-side-nav-content'>
                        <ul>
                            <li
                                onClick={this.toHomeEvent}
                                id='Home'
                                className={this.props.location.pathname === '/' ? 'sub-side-icon-selected' : ""}>
                                <i className="fas fa-home" />
                                <span>Home</span>
                            </li>

                            <li>
                                <a href='https://github.com/jxw7410/yuutubu'>
                                    <i className="fab fa-github"></i>
                                    <span>Git</span>
                                </a>
                            </li>

                            <li>
                                <a href='https://www.linkedin.com/in/jian-hong-wu-b1535284/'>
                                    <i className="fab fa-linkedin"></i>
                                    <span>Linkedin</span>
                                </a>
                            </li>

                            <li>
                                <a href='https://angel.co/jian-wu-12?public_profile=1'>
                                    <i className="fab fa-angellist"></i>
                                    <span>AngelList</span>
                                </a>
                            </li>
                        </ul>
                    </article>
                </nav>
            </div>
        )
    }
}


const msp = state => {
    return (
        {}
    )
}

const mdp = dispatch => {
    return (
        {}
    )
}

export default withRouter(connect(msp, mdp)(SubSideNav));