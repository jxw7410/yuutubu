import React from 'react'
import SubscribeButton from '../subscribe/subscribe_button';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navBarFixed: false,
    }

    this.fixedPostion = 95;
    this.fixedNavBar = this.fixedNavBar.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.fixedNavBar);
  }

  fixedNavBar(e) {
    e.preventDefault();
    let scrollBarPos = document.querySelector('html').scrollTop;
    if (scrollBarPos > this.fixedPostion) {
      this.setState({ navBarFixed: true });
    } else {
      this.setState({ navBarFixed: false });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.fixedNavBar)
  }

  render() {
    const chHdrNavClass = `ch-hdr-nav${this.state.navBarFixed ? ' chhn-fixed' : ""}${this.props.toggledSideNav ? ' chhn-tgl' : ""}`;
    const activeOne = `flexh-3 ch_tb${this.props.active_tab === 1 ? ' ch_tb_active' : ""}`;

    return (
      <React.Fragment>
        <div className='ch-hdr flexv-1'>
          <div className='ch-hdr-wrap flexh-6'>
            <div className='flexh-7'>
              <i className="fas fa-user-circle chr-prf-i" />
              <span id='chprf-i' className='flexv-4'>
                <span>{this.props.channel.name}</span>
                <span>{this.props.channel.subscriptionCount} subscribers</span>
              </span>
            </div>
            <div className='flexh-1'>
              {
                this.props.channel.user_id !== parseInt(this.props.userId) ?
                  <SubscribeButton channel={this.props.channel} />
                  : null
              }
            </div>
          </div>
        </div>


        <div className={chHdrNavClass}>
          <div className='flexh-1'>
            <div className='chhw-wrap'>
              <ul className='flexh-3' style={{ width: 'inherit' }}>
 
                <li
                  onClick={this.props.redirectEvent(null, 1)}
                  className={activeOne}>
                  VIDEOS
                                </li>
              </ul>
            </div>
          </div>
        </div>


      </React.Fragment>
    )
  }
}



export default ChannelHeader;