import React from 'react';
import { connect } from 'react-redux';


const ChannelHeaderNav = props => {
  const fixedPosition = 95;

  const [state, setState] = React.useState({
    isNavBarFixed: false
  });

  React.useEffect(() => {
    document.addEventListener('scroll', fixedNavBar);
    return () => document.removeEventListener('scroll', fixedNavBar);
  }, []);


  function fixedNavBar(e) {
    const scrollBarPos = document.querySelector('html').scrollTop;
    if (scrollBarPos > fixedPosition)
      setState({ ...state, isNavBarFixed: true });
    else
      setState({ ...state, isNavBarFixed: false });
  }


  return (
    <div
      className={[
        'channel-header--nav',
        state.isNavBarFixed ? 'channel-header--nav-fixed' : "",
        props.isNavToggled ? 'channel-header--nav-toggled' : ""
      ].join(" ")}>
      <div className='flex-horizontal--style-1'>
        <div className='channel-header--body-wrapper'>
          <ul className='flex-horizontal--style-3' style={{ width: 'inherit' }}>
            <li
              className={[
                'flex-horizontal--style-3',
                'channel-header--tab',
                'channel-header--tab--active'
              ].join(" ")}>
              VIDEOS
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};




const msp = state => ({
  isNavToggled: state.ui.navBars.toggled,
});

export default connect(msp, null)(ChannelHeaderNav);

