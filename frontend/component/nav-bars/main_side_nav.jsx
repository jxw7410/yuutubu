import React from 'react';
import { withRouter } from 'react-router-dom'  


class MainSideNav extends React.Component {
    constructor(props) {
        super(props);

        this.toHomeEvent = this.toHomeEvent.bind(this);
    }

    toHomeEvent(e){
        this.props.history.push('/')
    }

    render() {
        return (

            <div id='main-side-nav'>
                <ul>
                    <li 
                        onClick={this.toHomeEvent} 
                        id='Home' 
                        className={this.props.location.pathname === '/' ? 'main-side-icon-selected' : ""}>
                        <i className="fas fa-home"/>
                        <span>Home</span>
                    </li>
                    <li id='Git'>
                        <a href='https://github.com/jxw7410/yuutubu'>
                            <i className="fab fa-github"></i>
                            <span>Git</span>
                        </a>
                    </li>
                    <li id='Linkedin'>
                        <a href='https://www.linkedin.com/in/jian-hong-wu-b1535284/'>
                            <i className="fab fa-linkedin"></i>
                            <span>Linkedin</span>
                        </a>
                    </li>
                </ul>

                <ul>
                    <li id='angellist'>
                        <a href='https://angel.co/jian-wu-12?public_profile=1'>
                            <i className="fab fa-angellist"></i>
                            <span>AngelList</span>
                        </a>
                    </li>
                </ul>
            </div>
            

        )
    }
}

export default withRouter(MainSideNav);