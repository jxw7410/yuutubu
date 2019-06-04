import React from 'react';



const ChannelIndexItemThumbnail = props =>{
    return (
        <li onClick={props.handleClick}
            className='channel-index-item-thumbnails'>
            <img src={props.video.thumbnail} />
            <section className='ch-title'>
                {props.video.title}
            </section>
            <section className='ch-msc'>
                {   props.channel.name ?
                    <span>{props.channel.name}</span> : null 
                }
                
                <span>0 views</span>
            </section>
        </li>
    )
}

export default ChannelIndexItemThumbnail;   