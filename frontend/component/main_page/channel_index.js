import React from 'react';
import { ListContainer, ChannelTabHeader } from './styles';
import { Link } from 'react-router-dom';
import VideoThumbnail from '../thumbnail/video_thumbnail_container';
import SubscribeButton from '../subscribe/subscribe_button';


const ChannelIndex = props => {
	React.useEffect(() => {
		props.fetchChannelVideos(props.channel.id, 4, 0);
	}, []);


	function getThumbnails() {
		let thumbnails = [];
		for (let count = 0; count < props.videos.length && count < 4; count++) {
			const video = props.videos[count];
			thumbnails.push(
				<VideoThumbnail
					key={video.id}
					video={video}
					channel={props.channel} />
			)
		}

		return thumbnails;
	}

	return (
		<li className="channel-index">
			<ChannelTabHeader>
				<span className='channel-index--hdr-name flex-horizontal--style-3'>
					<Link to={`/channel/${props.channel.id}`}
						className="channel-index--link" >
						<i className="fas fa-user-circle" />
						<span>{props.channel.name}</span>
					</Link> Recommended channel for you</span>
				<SubscribeButton channel={props.channel} />
			</ChannelTabHeader>
			<section className='flex-horizontal--style-1'>
				<ListContainer>
					{getThumbnails()}
				</ListContainer>
			</section>
		</li>
	)
}




export default ChannelIndex;

