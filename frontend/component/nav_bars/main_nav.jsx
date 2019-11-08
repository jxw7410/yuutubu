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
  /*
    These are to be used for our the resize event handler.
    The problem is of JS closure effect such that the initial state in which
    the event handler was first defined is persisted throughout the life time 
    of this component, which means, we can't rely on accessing the state
    for the latest information.
  */
  const inverseNavBar = React.useRef(null);
  const navBarToggle = React.useRef(null);

  React.useEffect( () => {
    inverseNavBar.current = state.inverseNavBar;
  } ,  [state.inverseNavBar])
  
  React.useEffect( () => {
    navBarToggle.current = props.navBar.toggled;
  }, [props.navBar.toggled])

  
  /* 
    This for when a user is switching between video and main page
    There are two type of navbars which works on inverse logic.
  */
  React.useEffect(() => {
    if (isMounted.current) {
      if (props.navBar.type === 'TYPETWO' && !props.navBar.toggled)
        props.toggleSideBar();
      if (props.navBar.type === 'TYPEONE' && !props.navBar.toggled)
        props.toggleSideBar();
    }
  }, [props.navBar.type]);

  React.useEffect(() => {
    if (window.innerWidth < 1090) setState({ ...state, inverseNavBar: true })
    isMounted.current = true;
    window.addEventListener('resize', resizeHandler);
    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  React.useEffect(() => {
    if (props.login) props.fetchSubscriptions();
  }, [props.login])


  const resizeHandler = React.useCallback( e => {
    e.preventDefault();
    const pixelLimit = 1090;
    if (window.innerWidth < pixelLimit) {
      if (!inverseNavBar.current) { setState({ ...state, inverseNavBar: true }); }
      if (!navBarToggle.current) { props.toggleSideBar(); }
    } else {
      if (inverseNavBar.current) { setState({ ...state, inverseNavBar: false }); }
      if (!navBarToggle.current) { props.toggleSideBar(); }
    }
  }, []);

  function renderNavBar() {
    switch (props.navBar.type) {
      case 'TYPEONE':
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




