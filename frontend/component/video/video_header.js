import React, {memo} from 'react';
import Styled from 'styled-components';
import LikeDislike from './like_dislike_ctn';

const VideoHeader = props => {
  return (
    <Wrapper>
      <section> {props.video.title}</section>
      <section>
        <span>{props.video.views} views &middot; {props.video.created_at}</span>
        <LikeDislike />
      </section>
    </Wrapper>
  )
}

const Wrapper = Styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  border-bottom: 1px solid rgb(229, 229, 229);


  & > section:first-child{
    display: flex;
    align-items: flex-end;
    font-size: 20px;
  }

  & > section:last-child{
    display:flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(96, 96, 96);
    font-size: 14px;
  }
`

export default memo(VideoHeader);