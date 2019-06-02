import React from 'react';
import {Link } from 'react-router-dom';

const ChannelIndexItem = (props) =>{
    return (
        <li className="channel_index_items"> 
            <section className="channel_index_items_header">
                <span className='channel_index_items_header_ch_name'> 
                    <Link to={`/channel/${props.channel.id}`}
                        className="channel_index_items_channel_links" >
                        {props.channel.name}</Link> Recommended channel for you</span> 
            </section>
        </li>
    )
}

export default ChannelIndexItem

