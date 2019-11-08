import React, { useState } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import styled from 'styled-components'

import { ChartDataType } from '../types/Chart'
import Flex from './Flex'

interface ContainerProps {
  size: number
}

const Container = styled(Flex)<ContainerProps>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

interface ChildContentProps {
  visible: boolean
}

const ChildContent = styled(Flex).attrs({ expand: true, justify: 'center' })<ChildContentProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: ${({ theme }) => theme.animation.defaultTransition}s ease;
`

interface Props {
  size: number
  data: ChartDataType[]
  colors: string[]
  dataKey?: string
  strokeWidth?: number
  children?: React.ReactNode
}

export default function PieChartComponent(props: Props) {
  const [childVisible, setChildVisible] = useState<boolean>(false)

  const showChild = () => setChildVisible(true)

  return (
    <Container size={props.size}>
      <PieChart width={props.size} height={props.size}>
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          dataKey={props.dataKey || 'value'}
          cornerRadius={props.strokeWidth || 2}
          innerRadius={props.size / 2 - (props.strokeWidth || 2)}
          outerRadius={props.size / 2}
          paddingAngle={5}
          onAnimationEnd={showChild}
        >
          {props.data.map((entry, index) => (
            <Cell
              key={entry[props.dataKey || 'value']}
              strokeWidth={0}
              fill={props.colors[index % props.colors.length]}
            />
          ))}
        </Pie>
      </PieChart>
      <ChildContent visible={childVisible}>{props.children}</ChildContent>
    </Container>
  )
}
