import React from 'react';
import { Route } from 'react-router-dom';
import AllVideosContainer from './all_vid_ctn';
import ChannelBaseContainer from './channel_base_ctn';
import ChannelHeader from './channel_header';
import { withRouter } from 'react-router-dom';
import { MINI } from '../../util/constants'

class Channel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: 1,
        }

        this.basePath = this.props.match.url;
        this.redirectEvent = this.redirectEvent.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);

    }

    componentDidMount() {
        this.props.sideBarOne();
        if (this.props.videoPlayer.type !== MINI)
            this.props.removeVideoPlayer();
    }

    componentWillUnmount(){
        this.props.updatePrevPath(this.props.match.path)
    }


    componentDidUpdate() {
        this.basePath = this.props.match.url;
    }

    setActiveTab(num){
        this.setState( {active_tab: num})
    }

    redirectEvent(field, active_tab) {
        return e => {
            this.props.history.push(this.basePath + (field ? field : ""));
            this.setState({ active_tab });
        }
    }

    render() {
        const mainCtnClass = `max-w-h ch-mn-ctnt-grid ${this.props.navBar.toggled ? "cmcg-tgl" : ""}`;
        
        return (
            <div className={mainCtnClass}>
                <div className='ch-mn-ctnt'>
                    <div className="ch-mn-ctnt-wrap">
                        <ChannelHeader
                            userId={this.props.userId}
                            channel={this.props.channel}
                            active_tab={this.state.active_tab}
                            redirectEvent={this.redirectEvent}
                            toggledSideNav={this.props.navBar.toggled} />


                        <Route exact path={this.basePath}
                            render={props => <ChannelBaseContainer {...props}
                                toggledSideNav={this.props.navBar.toggled}
                                channelId={this.props.match.params.channel_id}
                                setActiveTab ={this.setActiveTab}
                            />}
                        />

                        <Route path={`${this.basePath}/videos`}
                            render={props => <AllVideosContainer {...props}
                                toggledSideNav={this.props.navBar.toggled}
                                channelId={this.props.match.params.channel_id}
                                setActiveTab={this.setActiveTab}
                            />}
                        />

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Channel);