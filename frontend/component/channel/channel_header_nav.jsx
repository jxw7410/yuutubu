import React from 'react';
import { connect } from 'react-redux';


const ChannelHeaderNav = props => {
  const fixedPosition = 95;

  const [state, setState] = React.useState({
    isNavBarFixed: false
  });

  React.useEffect(() => {
    document.addEventListener('scroll', fixNavBar);
    return () => document.removeEventListener('scroll', fixedNavBar);
  }, []);


  function fixNavBar(e) {
    const scrollBarPos = document.querySelector('html').scrollTop;
    if (scrollBarPos > fixedPosition)
      setState({ ...state, isNavBarFixed: true });
    else
      setState({ ...state, isNavBarFixed: false });
  }


  return (
    <div className={`ch-hdr-nav
      ${state.isNavBarFixed ? 'chhn-fixed' : ""}
      ${props.isNavToggled ? 'chhn-tgl' : ""}`}>
      <div className='flexh-1'>
        <div className='chhw-wrap'>
          <ul className='flexh-3' style={{ width: 'inherit' }}>
            <li className='flexh-3 ch_tb ch_tb_active'>
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

