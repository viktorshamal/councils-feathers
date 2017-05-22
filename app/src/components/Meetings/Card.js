import React from 'react';
import styled from 'styled-components';
import Grid from 'grid-styled';

export default ({ text, date = new Date() }) => (
  <StyledGrid xs={1} sm={1/2} md={1/3} lg={1/4}>
    <Card >
      <Text>{text}</Text>
      <Text>{date.toString()}</Text>
    </Card>
  </StyledGrid>
)

const StyledGrid = styled(Grid)`
  margin-bottom: 1rem
`

const Card = styled.div`
  padding: 1rem;
  height: auto;
  background-color: ${props => props.theme.primary};
  color: white;
  text-align: center;

Card.defaultProps = {
  theme: {
    primary: '#43b5ad';
  }
}
`

const Text = styled.p`
  font-size: 20px;
  margin: 1rem 0 1rem;
`