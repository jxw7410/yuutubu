import React from 'react';
import {connect} from 'react-redux';
import Styled from 'styled-components';
import { centerFlex } from '../common/flex_styles';
import { closeModal } from '../../actions/modal/modal_action';

const UploadModal = props => {

  const handleClick = e => {
    e.preventDefault();
    props.closeModal();
    props.callback();
  }

  return (
    <UploadModalContainer>
      <MessageBox>
        { props.message }
      </MessageBox>
      <ButtonContainer>
        <Button
          onClick={handleClick}>
            Ok
        </Button>
      </ButtonContainer>
    </UploadModalContainer>
  )
}


const UploadModalContainer = Styled.div`
  display: grid;
  grid-template-rows: 100px 50px;
  height: 150px;
  width: 300px;
  font-size: 18px;
  background: white;
`

const MessageBox = Styled.span`
  ${centerFlex};
  border-bottom: 1px solid gray;
`

const ButtonContainer = Styled.section`
  ${centerFlex}
`

const Button = Styled.button`
  ${centerFlex}
  font-size: 18px;
  height: 40px;
  width: 90px;
  border: 2px solid rgb(72, 122, 177);
  border-radius: 5px;
  font-weight: 500px;
  color: white 
  background: rgb(72, 122, 177);
  transition: all 0.2s linear;

  &:hover{
    color: rgb(72, 122, 177);
    background: white
  }
`

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(null, mdp)(UploadModal)