import Styled, { css } from 'styled-components';
import { centerFlex } from '../common/flex_styles';


export const MediaBox = css`
  width: 200px;
  height: 100px;
`
export const InfoWrapper = Styled.div`
  & > h1 {
    font-weight: 500;
  }

  & > span {
    font-size: 12px;
    color: gray;
  }
`

export const SpinnerContainer = Styled.div`
  ${centerFlex};
  ${MediaBox};
  background: lightgray;

  & .spinner{
    border: 4px solid #f3f3f3; 
    border-top: 4px solid lightgray; 
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
`