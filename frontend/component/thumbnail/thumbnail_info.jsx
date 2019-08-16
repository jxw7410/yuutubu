import React from 'react';

export const VideoPageThumbnailInfo = (props) => {
    return (
        <div id='videopage-thumbnail-preview'
            onClick={props.onClick}>
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
            <div onClick={props.onClick}>
                <section className='ch-title'>
                    {props.video.title}
                </section>
                <section className='flexv-7 ch-msc'>
                    {props.channel.name ?
                        <span>{props.channel.name}</span> : null
                    }
                    <section>
                        <span>{props.video.views} views </span>
                        <span className="midot">&middot;</span>
                        <span> {props.video.created_at}</span>
                    </section>
                </section>
            </div>
        </>
    )
}


export const SearchPageThumbnailInfo = props => {
    return (
        <div id='search-page-thumbnail-preview'
            onClick={props.onClick}>
            <section className='ch-title'>
                {props.video.title}
            </section>
            <section>
                <span>{props.video.channelName} </span>
                <span className="midot">&middot;</span>
                <span> {props.video.views} views </span>
                <span className="midot">&middot;</span>
                <span> {props.video.created_at}</span>
            </section>
            <section>
                <span>{props.video.description}</span>
            </section>
        </div>
    )
}