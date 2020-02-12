import React, { memo, useState, useRef, useEffect } from 'react';
import SubscribeButton from '../subscribe/subscribe_button';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import DOMPurify from 'dompurify';


const VideoBody = props => {
  const descriptionRef = useRef(null);
  const [canReadMore, setCanReadMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(()=>{
    if (props.video.description) {
      const height = descriptionRef.current.offsetHeight;
      if (height > 90 ) setCanReadMore(true);
    }
  }, [props.video.description])

  const handleExpand = e => {
    e.preventDefault();
    setIsExpanded(!isExpanded)
  }

  return (
    <Wrapper>
      <section>
        <div>
          <i style={{ fontSize: '45px' }} className="fas fa-user-circle" />
        </div>
        <Header>
          <HeaderMeta>
            <Link to={`/channel/${props.channel.id}`}> {props.channel.name} </Link>
            <span>{props.channel.subscriptionCount} subscribers</span>
          </HeaderMeta>
          <SubscribeButton channel={props.channel} />
        </Header>
      </section>
      <section>
        <div />
        <Description isExpanded={isExpanded}>
          <div
            ref={descriptionRef} 
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.video.description),
            }}
          />
        </Description>
      </section>
      <section>
        <div />
        <ReadMore canReadMore={canReadMore}>
          <span onClick={handleExpand}>
            { isExpanded ? 'SHOW LESS' : 'SHOW MORE'}
          </span>
        </ReadMore>
      </section>
    </Wrapper>
  )
}

const Wrapper = Styled.div`
  min-height: 185px;
  border-bottom: 1px solid rgb(229, 229, 229);

  & > section {
    display: grid;
    grid-template-columns: 60px auto;
  }

  & > section:first-child{
    padding: 15px 0;
    height: 50px;
  }

  & > section:last-child{
    height: 30px;
  }
`

const Header = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const HeaderMeta = Styled.div`
  display: flex;
  flex-direction: column;

  & a {
    text-decoration: none;
    font-size: 16px;
    color: black;
    font-weight: 600;
  }

  & span {
    font-size: 14px;
    color: rgb(96, 96, 96);
  }
`

const Description = Styled.div`
  font-size: 14px;
  word-break: break-word;
  max-height: ${props => props.isExpanded ? 'max-content' : '90px'}
  overflow: hidden;
  line-height: 18px;
  width: 95%;

  & a{
    color: royalblue;
    font-weight: 500;
    text-decoration: none;
  }
`

const ReadMore = Styled.div`
  display: flex;
  align-items: center;

  & > span {
    display: ${props => props.canReadMore ? 'block' : 'none'}
    color: gray;
    font-size: 12px;
  }

  & > span {
    cursor: pointer;
  }
`


export default memo(VideoBody);