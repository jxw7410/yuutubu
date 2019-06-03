import React from 'react';
import TopNavContainer from '../nav-bars/top_nav_container';
import MainSideNavContainer from '../nav-bars/main_side_nav_container'
import { Route } from 'react-router-dom';


class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            toggledSideNav: true,
        }

        this.handleToggled = this.handleToggled.bind(this);
    }

    handleToggled(e) {
        e.preventDefault();
        const toggledSideNav = this.state.toggledSideNav ? false : true;
        this.setState({ toggledSideNav });
    }

    render() {
        return (
            <div id='main-nav-div'>
                <div id='splash-nav-bars'>
                    <TopNavContainer handleToggled={this.handleToggled} />
                    {
                        this.state.toggledSideNav ? < Route component={MainSideNavContainer} />
                            : null
                    }

                </div>
                <div id='splash-main-content'>

                </div>

            </div>
        )
    }
}


export default Search;