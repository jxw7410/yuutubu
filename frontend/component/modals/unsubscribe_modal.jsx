import React from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import { CenterFlex } from '../common/flex_styles';
import { unsubscribe } from '../../actions/subscribe/subscribe_action'
import { closeModal } from '../../actions/modal/modal_action';

const UnsubscribeModal = props => {
  
  const unsubscribe = e => {
    e.preventDefault();
    props.unsubscribe(props.subId)
      .then( () => props.closeModal())
      .fail( () => props.closeModal())
  }

  return (
    <UnsubscribeContainer>
      <MessageBox>
        Are you sure you want to Unsubscribe?
      </MessageBox>
      <section>
        <ButtonContainer>
          <Button
            onClick = { e => props.closeModal()}>
            Cancel
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button 
            onClick={unsubscribe}
            color='rgb(72, 122, 177)'>
              Unsubscribe
          </Button>
        </ButtonContainer>
      </section>
    </UnsubscribeContainer>
  )
}



const UnsubscribeContainer = Styled.div`
  display: grid;
  grid-template-rows: 150px 50px;
  background: white;
  width: 350px;
  height: 200px;
  font-size: 18px;
`

const MessageBox = Styled.span`
  ${CenterFlex};
  border-bottom: 1px solid gray;
`

const ButtonContainer = Styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 50px;
`
const Button = Styled.div`
  ${CenterFlex};
  border-radius: 5px
  font-weight: 500;
  height: 40px;
  width: fit-content;
  padding: 0px 5px;
  color: ${ props => props.color || 'black'};
  transition: background 0.2s linear;

  &:hover{
    cursor: pointer;
  }

  &:active{
    background: lightgray;
  }
`



const mdp = dispatch => {
  return {
    unsubscribe: subId => dispatch(unsubscribe(subId)),
    closeModal: () => dispatch(closeModal())
  }
}


export default connect(null, mdp)(UnsubscribeModal);


