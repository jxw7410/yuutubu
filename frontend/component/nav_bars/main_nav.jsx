import React from 'react';
import TopNavContainer from './top_nav_ctn';
import SubSideNav from './sub_side_nav';
import MainSideNavContainer from './main_side_nav_ctn';
import TypeTwoNavBar from './type_two_nav_bar';

const MainNav = props => {
  const [state, setState] = React.useState({
    inverseNavBar: false,
  });

  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      if (props.navBar.type === 2 && !props.navBar.toggled) {
        props.toggleSideBar();
      }
      if (props.navBar.type === 1 && !props.navBar.toggled) {
        props.toggleSideBar();
      }
    }
  }, [props.navBar.type]);

  React.useEffect( () => {
    if (window.innerWidth < 1090) setState({ ...state, inverseNavBar: true })
    isMounted.current = true;

    return () => isMounted.current = false;
  }, []);

  React.useEffect( () => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [resizeHandler])

  // Basically if the state switch from not login to login...
  React.useEffect(() => {
    if (props.login) props.fetchSubscriptions();
  }, [props.login])



  function resizeHandler(e) {
    e.preventDefault();
    // Some hardcoded pixel value.
    if (window.innerWidth < 1090) {
      if (!state.inverseNavBar){ setState({ ...state, inverseNavBar: true }); } 
      if (!props.navBar.toggled){ props.toggleSideBar(); }
    } else {
      if (state.inverseNavBar){ setState({ ...state, inverseNavBar: false }); } 
      if (!props.navBar.toggled) {  props.toggleSideBar(); }
    }
  }


  function renderNavBar() {
    switch (props.navBar.type) {
      case 1:
        return (
          <>
            {
              state.inverseNavBar ?
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
                <div className='msn-ctn'>
                  {
                    props.navBar.toggled ?
                      <MainSideNavContainer /> : null
                  }
                  <SubSideNav />
                </div>
            }
          </>
        )
      case 2:
        return <TypeTwoNavBar />
      default:
        return null;
    }
  }

  return (
    <>
      {
        props.navBar.active ?
          <>
            <div className='tn-ctn'>
              <TopNavContainer />
            </div>
            {renderNavBar()}
          </>
          : null
      }
    </>
  )


}



export default MainNav;




