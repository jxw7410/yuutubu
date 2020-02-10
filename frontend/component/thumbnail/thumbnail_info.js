import React from 'react';
import DOMPurify from 'dompurify';

export const VideoPageThumbnailInfo = React.memo(props => 
    <div className='flex-vertical--style-4 video-page-thumbnail-info'
      onClick={props.redirect}>
      <section className='index-page-video-title'>
        {props.video.title}
      </section>
      <section>
        {props.video.channelName}
      </section>
      <section>
        <span>
          {props.video.views} views
        </span>
      </section>
    </div>
);

export const IndexPageThumbnailInfo = React.memo(props => 
    <>
      <div onClick={props.reditect}>
        <section className='index-page-video-title'>
          {props.video.title}
        </section>
        <section className='flex-vertical--style-7 ch-msc'>
          {
            props.channel.name ?
              <span>{props.channel.name}</span> : null
          }
          <section>
            <span>
              {props.video.views} views 
            </span>
            <span className="midot">
             &middot; 
            </span>
            <span> 
              {props.video.created_at}
            </span>
          </section>
        </section>
      </div>
    </>
);


export const SearchPageThumbnailInfo = React.memo(props => 
    <div id='search-page-thumbnail-preview'
      onClick={props.redirect}>
      <section className='index-page-video-title'>
        {props.video.title}
      </section>
      <section>
        <span>
          {props.video.channelName} 
        </span>
        <span className="midot">
             &middot; 
        </span>
        <span> 
          {props.video.views} views 
        </span>
        <span className="midot">
            &middot; 
        </span>
        <span> 
          {props.video.created_at}
        </span>
      </section>
      <section>
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.video.description)
          }}
        >
        </span>
      </section>
    </div>
);


