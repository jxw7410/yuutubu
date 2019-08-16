import React from 'react';
import TopNavContainer from './top_nav_ctn';
import SubSideNav from './sub_side_nav';
import MainSideNavContainer from './main_side_nav_ctn';

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
                    <React.Fragment>
                    {  
                        this.state.inverseNavBar ? 
                        <React.Fragment>
                            { this.typeTwoNavBar() }
                            <div style={{marginTop: '56px', height: '100%', position: 'fixed'}}>
                                <SubSideNav />
                            </div>
                        </React.Fragment>
                        :
                        <div className='msn-ctn'>
                            {this.props.navBar.toggled ? < MainSideNavContainer /> : null}
                            <SubSideNav />
                        </div>
                    }
                    </React.Fragment>
                )
            case 2:
                return this.typeTwoNavBar()
            default:
                return null
        }
    }

    typeTwoNavBar(){
        return(
            <React.Fragment>
                <div className={`msn-ctn-2 ${this.props.navBar.toggled ? "" : 'mc2-toggled'}`}>
                    <MainSideNavContainer type="typeTwo" />
                </div>
                <div className={`msn-ctn-cvr ${this.props.navBar.toggled ? "" : "mcc-toggled"}`}
                    onClick={this.props.toggleSideBar} />
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.navBar.active ?
                        <React.Fragment>
                            <div className='tn-ctn'> <TopNavContainer /> </div>
                            {this.getNavbar()}
                        </React.Fragment>
                        : null
                }
            </React.Fragment>
        )
    }
}

export default MainNav;




