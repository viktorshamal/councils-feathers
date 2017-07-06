import React from 'react'
import styled from 'styled-components'

export default ({ name, color, id, onClick, active }) =>
  <Badge onClick={() => onClick(id)}>
    <Letter color={color} active={active}>
      {name.charAt(0)}
    </Letter>
    {name}
  </Badge>

const Letter = styled.span`
  background-color: ${props =>
    props.active ? props.color : 'hsla(0,0%,78%,1)'};
  border-radius: ${props => props.theme.rounding};
  color: white;
  display: inline-flex;
  height: 1rem;
  justify-content: center;
  margin-right: .5rem;
  padding: .5rem;
  text-transform: capitalize;
  width: 1rem;
`

const Badge = styled.div`
  align-items: center;
  background-color: hsla(0, 0%, 88%, 1);
  border-radius: ${props => props.theme.rounding};
  color: black;
  display: flex;
  margin: 0 .5rem .5rem 0;
  min-width: 6rem;
  padding-right: .5rem;
  position: relative;
  text-transform: capitalize;

  &:hover {
    background-color: hsla(0, 0%, 78%, 1);
    cursor: pointer;
  }
`

Badge.defaultProps = {
  color: 'green'
}
