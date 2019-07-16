import React from 'react'
import styled from 'styled-components'

export const ContentBox = styled.div`
    display:flex;
    flex-flow:row wrap;
    max-width:60%;
    margin: 0 auto;
`;
export const ContentItem = styled.div`
    flex:1 0 auto;
    padding:0.5rem 1rem;
    margin:1rem;
    border:solid 1px lightslategray;
    text-align:center;
`;

export const StyleRoot = styled.div`
display:flex;
flex-direction: row;
width:100%;
.right {
  // flex:4;
}
.left {
  // flex:1;
}

`;
export const StyledButton = styled.button`
  border-radius:3px;
  border:solid 2px lightslategray;
  color:lightslategray;
  padding: 0.5em 1em;
  margin: 0.5em 1em;
  outline: 0;
    &:hover{
      box-shadow: 0.1rem 0.1rem 0.2rem grey;
    }
    
  ${(props) => props.primary && `background-color:lightslategray;
                                 color:white;`}
  `;
export const TomatoButton = styled(StyledButton)`
color:tomato;
border-color:tomato;
${(props) => props.primary && `background-color:tomato;
                                color:white;`}
`;
export const StyledSubmit = styled(StyledButton).attrs({
    as:'input'
})
``;
