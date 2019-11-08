import React, { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { ChartDataType } from '../types/Chart'
import Flex from './Flex'
import { H7 } from './Typography'

const ChartLegendItem = styled(Flex).attrs({ expand: true, direction: 'row' })`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const Label = styled(H7)`
  color: white;
  font-weight: ${({ theme }) => theme.text.fontWeight.medium};
`

const Line = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 10px;
`

const Percentage = styled(H7)`
  color: white;
  font-weight: ${({ theme }) => theme.text.fontWeight.thin};
`

interface DotProps {
  color: string
}

const Dot = styled.div<DotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 20px;
  flex-shrink: 0;
`

interface ChartLegendProps {
  data: ChartDataType[]
  colors: string[]
}

export default function ChartLegend(props: ChartLegendProps) {
  const total = useMemo(() => {
    return props.data.reduce((sum, item) => sum + item.value, 0)
  }, [props.data])

  const getPercentage = value => {
    return Number((value / total) * 100).toFixed(1)
  }

  return (
    <Flex expand>
      {props.data.map((item, index) => (
        <ChartLegendItem>
          <Flex direction="row" shrink={0}>
            <Dot color={props.colors[index % props.colors.length]} />
            <Label>{item.name}</Label>
          </Flex>
          <Line />
          <Flex shrink={0}>
            <Percentage>
              <FormattedMessage defaultMessage="{percentage} %" values={{ percentage: getPercentage(item.value) }} />
            </Percentage>
          </Flex>
        </ChartLegendItem>
      ))}
    </Flex>
  )
}
