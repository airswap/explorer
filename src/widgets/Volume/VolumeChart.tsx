import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import styled from 'styled-components'

import Flex from '../../components/Flex'
import { H7 } from '../../components/Typography'

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
`

interface VolumeChartProps {
  data: any
}

export default function VolumeChart(props: VolumeChartProps) {
  if (!props.data) return null

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={props.data}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2B71FF" />
              <stop offset="100%" stopColor="#2B71FF80" />
            </linearGradient>
          </defs>
          <Tooltip
            animationDuration={500}
            content={
              <Flex>
                <H7 color="white">
                  <FormattedMessage defaultMessage="Monday" />
                </H7>
              </Flex>
            }
            cursor={{ stroke: 'rgba(255, 255, 255, 0.25)', strokeWidth: 1, strokeDasharray: '2.5px' }}
          />
          <Line
            animationBegin={3000}
            type="monotone"
            dataKey="volume"
            stroke="url(#gradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ fill: '#2B71FF', strokeWidth: 0, r: 5 }}
            // activeDot={<ChartActiveDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
