import React from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import SubscribeButton from '../subscribe/subscribe_button';


const ChannelIndex = props => {
	React.useEffect(()=>{
		props.fetchChannelVideos(props.channel.id, 6, 0);
	}, []);


	function getThumbnails() {
			let thumbnails = [];
			for (let count = 0; count < props.videos.length && count < 6; count++){
				const video = props.videos[count];
				thumbnails.push( 
					<VideoThumbnail 
						key={video.id}
						video={video}
						channel={props.channel}	/> 
				)
			}

			return thumbnails;
	}

	return (
		<li className="channel-index">
			<section className="channel-index--hdr flex-horizontal-style-6">
				<span className='channel-index--hdr-name flex-horizontal--style-3'>
					<Link to={`/channel/${props.channel.id}`}
						className="channel-index--link" >
						<i className="fas fa-user-circle" />
						<span>{props.channel.name}</span>
					</Link> Recommended channel for you</span>

				<SubscribeButton channel={props.channel} />
			</section>
			<section>
				<ul style={{ display: 'flex' }}> { getThumbnails() } </ul>
			</section>
		</li>
	)
}


export default ChannelIndex;

