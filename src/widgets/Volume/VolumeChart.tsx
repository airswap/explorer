import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import styled from 'styled-components'

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
`

interface VolumeChartProps {
  data: any
}

export default function VolumeChart(props: VolumeChartProps) {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={props.data}>
          <Tooltip />
          <Line type="monotone" dataKey="volume" stroke="#2B71FF" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
