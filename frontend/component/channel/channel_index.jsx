import React from 'react';
import ChannelIndexItem from './channel_index_item_ctn';
import RecommendedVideos from './recommended_video';
import {MINI} from '../../util/constants';


class ChannelIndex extends React.Component {
    constructor(props) {
        super(props)
        this.offset = 0;
        this.scrollPercentage = null;
        this.defaultPercentage = 0.40;
        this.scrollHeightOffset = 888;
        this.handleScroll = this.handleScroll.bind(this);
        this.fetching = false;
        this.mainContent = React.createRef();
    }

    componentDidMount() {
        this.props.clearChannels();
        this.props.sideBarOne();

        if (this.props.videoPlayer.type !== MINI)
            this.props.removeVideoPlayer();

        this.props.fetchChannels(this.offset, 4, this.props.user_id)
            .then(() => {
                this.offset += 4;
            })
            .then(() => {
                document.addEventListener('scroll', this.handleScroll);
                this.scrollPercentage = this.defaultPercentage;
            });
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
        this.props.clearChannels();
        this.props.updatePrevPath(this.props.match.path);
    }

    handleScroll(e) {
        e.preventDefault();
        if (!this.fetching) {
            let scrollHeight = this.mainContent.current.scrollHeight;
            if (document.querySelector('html').scrollTop > (scrollHeight * this.scrollPercentage)) {
                this.fetching = true;
                this.props.fetchChannels(this.offset, 3, this.props.user_id)
                    .then(() => {
                        this.offset += 3;
                        let refactorPercentage = (this.defaultPercentage * this.scrollHeightOffset) / scrollHeight;
                        this.scrollPercentage += (this.defaultPercentage * refactorPercentage);
                        this.fetching = false;
                    })
                    .fail(() => {
                        document.removeEventListener('scroll', this.handleScroll);
                    })
            }
        }

    }


    render() {
        const channelIndexItems = this.props.channels.map((channel, index) => {
            if (this.props.user_id !== channel.user_id)
                return (<ChannelIndexItem key={index} channel={channel} />)
        });

        const mainCtnClass = `max-w-h main-ctnt-ctn ${this.props.navBar.toggled ? "mn-cc-tgl" : ""}`

        return (
            <div className={mainCtnClass}>
                <div className='main-ctnt' ref={this.mainContent}>
                    <div className='flexv-1'>
                        <RecommendedVideos />
                        <ul className='ch-list'>
                            {channelIndexItems}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelIndex