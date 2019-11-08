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

  /* componentDidMount */
  React.useEffect(() => {
    if (window.innerWidth < 1090) setState({ ...state, inverseNavBar: true })
    isMounted.current = true;

    return () => isMounted.current = false;
  }, []);

  /* 
    Event listeners which modifies the state needs the handler to be watched
    otherwise data in handlers are cached.
  */
  React.useEffect(() => {
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
    const pixelLimit = 1090;
    if (window.innerWidth < pixelLimit) {
      if (!state.inverseNavBar) { setState({ ...state, inverseNavBar: true }); }
      if (!props.navBar.toggled) { props.toggleSideBar(); }
    } else {
      if (state.inverseNavBar) { setState({ ...state, inverseNavBar: false }); }
      if (!props.navBar.toggled) { props.toggleSideBar(); }
    }
  }


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




