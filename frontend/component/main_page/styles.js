import Styled, { css } from 'styled-components';


const mainGridCSS = css`
  width: 100%;
  max-width: calc(320px * 4 + 16px * 4);

  & .thumbnails {
    width: calc(100% / 4 - 16px);
    margin-bottom: 24px;
  }

  @media (max-width: 1125px) {
    max-width: calc(320px * 3 + 16px * 3);
    & .thumbnails { width: calc(100% / 3 - 16px); }
  }

  @media (max-width: 870px){
    max-width: calc(320px * 2 + 16px * 2);
    & .thumbnails { width: calc(100% / 2 - 16px); }
  }
`

export const ChannelTabHeader = Styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 3px solid rgb(225, 225, 225);
  margin: 0 auto;
  ${mainGridCSS}
  & > * { margin: 0 8px; }
`

export const ListContainer = Styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  ${mainGridCSS}
`