import React from 'react'
import { connect } from 'react-redux';



class SubSideNav extends React.Component{
    

    render(){
        return(
            <div id='sub-side-nav-ctn'>
                <nav id='sub-side-nav'>
                    <article id='sub-side-nav-content'>
                        <ul>
                            <li><i className="fas fa-home"></i>Home</li>
                            <li><i className="fab fa-github"></i>Git</li>
                            <li><i className="fab fa-linkedin"></i>Linkedin</li>
                        </ul>
                    </article>
                </nav>
            </div>
        )
    }
}


const msp = state => {
    return(
        {}
    )
}

const mdp = dispatch => {
    return (   
        {}
    )
}

export default connect(msp, mdp)(SubSideNav)