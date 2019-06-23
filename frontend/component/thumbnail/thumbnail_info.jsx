import React from 'react';

export const VideoPageThumbnailInfo = (props) => {
    return (
        <div id='videopage-thumbnail-preview'>
            <section className='ch-title'>
                {props.video.title}
            </section>
            <section>
                {props.video.channelName}
            </section>
            <section>
                <span>{props.video.views} views</span>
            </section>
        </div>
    )
}

export const IndexPageThumbnailInfo = (props) => {
    return (
        <>
            <section className='ch-title'>
                {props.video.title}
            </section>
            <section className='ch-msc'>
                {props.channel.name ?
                    <span>{props.channel.name}</span> : null
                }

                <span>{props.video.views} views <span className="midot">&middot;</span> {props.video.created_at}</span>
            </section>
        </>
    )
}


