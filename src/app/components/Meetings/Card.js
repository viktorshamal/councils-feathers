import React from 'react'
import styled from 'styled-components'
import Grid from '../Grid'

import { Link } from 'react-router-dom'

import media from '../../mediaQueries'

import {
  getYear,
  getMonth,
  getDay,
  getDate,
  getHours,
  getMinutes
} from 'date-fns'

import { days, months } from '../../utils/dates'

const d = '14. Januar, 2017, 10:45'

export default ({ id, date = d, group: { name, color } }) =>
  <Link to={`/meetings/${id}`}>
    <StyledGrid xs={1} sm={1 / 2} md={1 / 3} lg={1 / 3}>
      <Card color={color}>
        <Time>
          <p>
            {getYear(date)}
          </p>
          <h2>
            {days[getDay(date)] +
              ', ' +
              months[getMonth(date)] +
              ' ' +
              getDate(date)}
          </h2>
          <h2>
            {getHours(date) + ':' + getMinutes(date)}
          </h2>
        </Time>
        <Bottom>
          <Text>
            {name}
          </Text>
          <div>
            <Dot />
            <Dot />
            <Dot />
          </div>
        </Bottom>
      </Card>
    </StyledGrid>
  </Link>

const StyledGrid = styled(Grid)`
  margin-bottom: 1rem;
  padding: 0;

  ${media.tablet`
    padding: 0 10px 0 10px;
  `}
`

const Time = styled.div`
  margin-bottom: .5rem;

  h2 {
    font-size: 1.4rem;
    margin: 0;
  }

  p {
    margin: 0;
  }
`

const Dot = styled.span`
  height: .75rem;
  width: .75rem;
  margin: 0 .125rem;
  border-radius: 50%;
  background-color: hsl(0, 0%, 95%);
  color: black;
  font-size: .5rem;

  display: inline-block;
`

const Bottom = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
  justify-content: space-between;

  p {
    margin-bottom: 0;
  }
`

const Card = styled.div`
  background-color: ${props => props.color};
  border-radius: ${props => props.theme.rounding};
  color: white;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 10rem;
  padding: 1rem;
`

const Text = styled.p`
  font-size: 20px;
  margin: 0 0 .5rem 0;
`

Card.defaultProps = {
  theme: {
    primary: '#43b5ad'
  }
}