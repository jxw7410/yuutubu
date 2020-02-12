import React from 'react';
import TopNavContainer from './top_nav_ctn';
import SubSideNav from './sub_side_nav';
import MainSideNavContainer from './main_side_nav_ctn';
import TypeTwoNavBar from './type_two_nav_bar';

const MainNav = props => {
  const [isTypeTwoNavBar, setTypeTwoNavBar] = React.useState(false);
  const pixelLimit = 1305;

  React.useEffect(() => {
    if (props.navBar.type === 'TYPETWO' && !props.navBar.toggled)
      props.toggleSideBar();
    else if (props.navBar.type === 'TYPEONE' && !props.navBar.toggled)
      props.toggleSideBar();
  }, [props.navBar.type]);

  React.useEffect(() => {
    if (window.innerWidth < pixelLimit) setTypeTwoNavBar(true);
    window.addEventListener('resize', resizeHandler());
    return () => {
      window.removeEventListener('resize', resizeHandler());
    }
  }, []);

  React.useEffect(() => {
    if (props.login) props.fetchSubscriptions();
  }, [props.login])


  function resizeHandler() {
    /*
      We are use these local variables because the initial state
      in which the event listener is initialize, the state 
      is persisted through the life time of the component, so
      if we call state, it's always the initial state.
    */
    let _isTypeTwoNavBar = window.innerWidth < pixelLimit;
    let isNavBarToggled = props.navBar.toggled;

    return () => {
      if (window.innerWidth < pixelLimit && !_isTypeTwoNavBar) {
        setTypeTwoNavBar(true)
        _isTypeTwoNavBar = true;
        
        /* 
          Logical fallacy here, if we toggled the side nav
          before we resized to a smaller window, this isNavBarToggled has no concept whether or not the 
          bar has been toggled causing some logic error. Need to fix.
        */
        if (!isNavBarToggled) {
          props.toggleSideBar();
          isNavBarToggled = true;
        }
      } else if (window.innerWidth >= pixelLimit && _isTypeTwoNavBar) {
        setTypeTwoNavBar(false);
        _isTypeTwoNavBar = false;

        if (!isNavBarToggled) {
          props.toggleSideBar();
          isNavBarToggled = true;
        }
      }
    }
  }

  function renderNavBar() {
    switch (props.navBar.type) {
      case 'TYPEONE':
        return (
          <>
            {
              isTypeTwoNavBar ?
                <>
                  <TypeTwoNavBar />
                  <div style={{
                    marginTop: '56px',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 104
                  }}>
                    <SubSideNav />
                  </div>
                </>
                :
                <div className='main-side-nav--container'>
                  {props.navBar.toggled ? <MainSideNavContainer /> : null}
                  <SubSideNav />
                </div>
            }
          </>
        )
      case 'TYPETWO':
        return <TypeTwoNavBar />
      default:
        return null;
    }
  }

  return (
    <div style={props.navBar.active ? null : { display: 'none' }} >
      <div
        className='top-nav--container'>
        <TopNavContainer />
      </div>
      {renderNavBar()}
    </div>

  )
}

export default MainNav;




