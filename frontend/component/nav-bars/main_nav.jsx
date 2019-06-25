import React from 'react';
import TopNavContainer from './top_nav_container';
import SubSideNav from './sub_side_nav';
import MainSideNavContainer from './main_side_nav_container';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../actions/subscribe/subscribe_action';

class MainNav extends React.Component { 

    componentDidMount(){
        this.props.fetchSubscriptions()
    }

    componentDidUpdate(prevProps){
        if(!prevProps.login && this.props.login){
            this.props.fetchSubscriptions();
        }
    }

    render() {
        return (
            <>
                {
                    this.props.navBar.active ?
                        <>
                            <div id='top-nav-ctn'> <TopNavContainer /> </div>
                            {
                                this.props.navBar.type === 1 ?
                                    <div id='main-side-nav-ctn'>
                                        {this.props.navBar.toggled ? < MainSideNavContainer /> : null}
                                        <SubSideNav />
                                    </div> : null
                            }
                        </>
                        : null
                }
            </>
        )
    }
}

const msp = state => {
    return {
        login: Boolean(state.session.id),
        navBar: state.ui.navBars
    }
}

const mdp = dispatch => {
    return {
        fetchSubscriptions: () => dispatch(fetchSubscriptions()),

    }
}

export default connect(msp, mdp)(MainNav);


