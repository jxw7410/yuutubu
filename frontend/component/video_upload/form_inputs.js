import React, { useState } from 'react';
import Styled, { css } from 'styled-components';
import { InfoWrapper } from './styles';
import Editor from '../common/editor';

function FormInputs(props) {
  const [inputFocus, setInputFocus] = useState({
    title: false,
    description: false,
  })

  const handleFocus = (field, bool) => e => {
    e.preventDefault();
    if (!props.isUploading) {
      setInputFocus({
        ...inputFocus,
        [field]: bool
      })
    }
  };


  return (
    <Wrapper>
      <InfoWrapper>
        <h1>Details</h1>
        <span>Please fill out the required fields.</span>
      </InfoWrapper>
      <TitleInputWrapper bg={inputFocus.title ? 'royalblue' : null}>
        <label>Title (required)</label>
        <input
          onChange={props.onTitleChange}
          onFocus={handleFocus('title', true)}
          onBlur={handleFocus('title', false)}
          value={props.title}
          disabled={props.isUploading}
          type='text'
        />
        <span>{props.title.length}/100</span>
      </TitleInputWrapper>
      <DescriptionWrapper bg={inputFocus.description ? 'royalblue' : null}>
        <label>Description (required)</label>
        <Editor
          onInput={props.onDescriptionChange}
          onFocus={handleFocus('description', true)}
          onBlur={handleFocus('description', false)}
          isDisabled={props.isUploading}
        />
      </DescriptionWrapper>
    </Wrapper>
  )
}

const CommonAttr = css`
  padding: 10px;
  color: ${ props => props.bg || 'gray '}
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid ${props => props.bg || 'lightgray'}
`

const Wrapper = Styled.div`
  padding: 10px;
  width: calc(100% - 20px);
  max-width: calc( 100% - 20px);
  height: 100%;
`

const TitleInputWrapper = Styled.div`
  display: grid;
  grid-template-rows: min-content auto min-content;
  ${CommonAttr}

  & > input {
    padding: 5px 0;
    color: black;
    font-size: 16px;
    border: none;
  }

  & > input:focus{
    outline: none;
  }

  & > span {
    display: flex;
    justify-content: flex-end;
  }
`


const DescriptionWrapper = Styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  min-height: 200px;
  margin-top: 70px;
  ${CommonAttr}

  & > div {
    user-select: text;
    cursor: text;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    height: 100%;
    width: 100%;
    padding: 5px 0;
    font-size: 16px;
    color: black;
    max-width: 528px;
  }

  & > div:focus{
    outline: none;
  }
`




export default FormInputs;