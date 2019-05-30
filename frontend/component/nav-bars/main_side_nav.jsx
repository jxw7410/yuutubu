import React from 'react';



class MainSideNav extends React.Component {
    constructor(props) {
        super(props);


    }


    render() {
        return (

            <div id='main-side-nav'>
                <ul>
                    <li><i className="fas fa-home"></i><span>Home</span></li>
                    <li><i className="fab fa-github"></i><span>Git</span></li>
                    <li><i className="fab fa-linkedin"></i><span>Linkedin</span></li>
                </ul>
            </div>
            

        )
    }
}

export default MainSideNav;