import React from 'react';
import TopNavContainer from './top_nav_container';
import SubSideNav from './sub_side_nav';
import MainSideNavContainer from './main_side_nav_container';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../actions/subscribe/subscribe_action';
import { toggleSideBar } from '../../actions/nav_bar_action';

class MainNav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            inverseNavBar: false,
        }

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        if (this.props.login)
            this.props.fetchSubscriptions();

        if (window.innerWidth < 1090)
            this.setState({inverseNavBar: true})

        window.addEventListener('resize', this.handleResize);
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.login && this.props.login) {
            this.props.fetchSubscriptions();
        }


        if (prevProps.navBar.type === 2 && this.props.navBar.type === 1) {
            if (!prevProps.navBar.toggled) this.props.toggleSideBar();
        }

        else if (prevProps.navBar.type === 1 && this.props.navBar.type === 2) {
            if (!prevProps.navBar.toggled) this.props.toggleSideBar();
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize(e){
        e.preventDefault()
      
        if( window.innerWidth < 1090){
            if (!this.state.inverseNavBar){
                this.setState({ inverseNavBar: true })
                
                if (!this.props.navBar.toggled)
                    this.props.toggleSideBar()
            }
        } else {
            if (this.state.inverseNavBar){
                this.setState({inverseNavBar: false})
                
                if(!this.props.navBar.toggled)
                    this.props.toggleSideBar()
            }
        }
    }

    getNavbar() {
        switch (this.props.navBar.type) {
            case 1:
                return (
                    <>
                    {  
                        this.state.inverseNavBar ? 
                        <>
                            {this.typeTwoNavBar()}
                            <div style={{marginTop: '56px', height: '100%', position: 'fixed'}}>
                                <SubSideNav />
                            </div>
                        </>
                        :
                        <div id='main-side-nav-ctn'>
                            {this.props.navBar.toggled ? < MainSideNavContainer /> : null}
                            <SubSideNav />
                        </div>
                    }
                    </>
                )
            case 2:
                return this.typeTwoNavBar()
            default:
                return null
        }
    }

    typeTwoNavBar(){
        return(
            <>
                <div id={'main-side-nav-ctn-type-2' + (this.props.navBar.toggled ? "" : "-toggled")}>
                    <MainSideNavContainer
                        type="typeTwo" />
                </div>
                <div id={'main-side-nav-ctn-screen' + (this.props.navBar.toggled ? "" : "-toggled")}
                    onClick={this.props.toggleSideBar} />
            </>
        )
    }

    render() {

        const sideNav = this.getNavbar()
        return (
            <>
                {
                    this.props.navBar.active ?
                        <>
                            <div id='top-nav-ctn'> <TopNavContainer /> </div>
                            {sideNav}
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
        toggleSideBar: () => { dispatch(toggleSideBar()) }
    }
}

export default connect(msp, mdp)(MainNav);


