import React from 'react';
import ChannelIndexItem from './channel_index_item';


class ChannelIndex extends React.Component {
    constructor(props) {
        super(props)
        this.offset = 0;
        this.scrollPercentage = null;
        this.defaultPercentage = 0.40;
        this.scrollHeightOffset = 888;
        this.handleScroll = this.handleScroll.bind(this);
        //debugger
    }

    componentDidMount() {
        this.props.clearChannels();
        this.props.fetchChannels(this.offset, 6, this.props.user_id)
            .then(() => {
                this.offset += 6;
            })
            .then(() => {
                document.addEventListener('scroll', this.handleScroll);
                this.scrollPercentage = this.defaultPercentage;
            });
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        e.preventDefault();
        let splashScrollHeight = document.getElementById("splash-main-content").scrollHeight;
        if ($(document).scrollTop() > (splashScrollHeight * this.scrollPercentage)) {
            this.props.fetchChannels(this.offset, 3, this.props.user_id)
                .then(() => {
                    this.offset += 3;
                    let refactorPercentage = (this.defaultPercentage * this.scrollHeightOffset) / splashScrollHeight;
                    this.scrollPercentage += (this.defaultPercentage * refactorPercentage);
                    //console.log(this.scrollPercentage);
                })
                .fail(() => {
                    document.removeEventListener('scroll', this.handleScroll);
                })
        }

    }


    render() {
        const channelIndexItems = this.props.channels.map((channel, index) => {
            if (this.props.user_id !== channel.user_id)
                return (<ChannelIndexItem key={index} channel={channel} />)
        });

        return (
            <div id='main-content-section-1'>
                <ul id={'channels-list' + (this.props.toggledSideNav ? "" : '-toggled')}>
                    {channelIndexItems}
                </ul>
            </div>
        )
    }
}

export default ChannelIndex