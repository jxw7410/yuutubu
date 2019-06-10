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
                        className={this.props.match.url === '/' ? 'main-side-icon-selected' : ""}>
                        <i className="fas fa-home"/>
                        <span>Home</span>
                    </li>

                    <li id='Git'>
                        <i className="fab fa-github"></i>
                        <span>Git</span>
                    </li>
                    <li id='Linkedin'>
                        <i className="fab fa-linkedin"></i>
                        <span>Linkedin</span>
                    </li>
                </ul>
            </div>
            

        )
    }
}

export default withRouter(MainSideNav);