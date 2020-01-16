import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';

import Flex from '../../components/Flex';
import { VerticalSpacer } from '../../components/Spacer';
import { H7, H8 } from '../../components/Typography';
import { getFormattedNumber } from '../../utils/transformations';

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
`;

const VolumeChartTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <Flex align="flex-start">
        <H7 color="white">
          <FormattedMessage
            defaultMessage="{amount} ETH"
            values={{
              amount: getFormattedNumber({
                num: payload[0].payload.volume,
                digits: 10,
                minDecimals: 2,
                maxDecimals: 2,
                noEllipsis: true,
              }),
            }}
          />
        </H7>
        <VerticalSpacer units={1} />
        <H8 color="white">{payload[0].payload.date}</H8>
      </Flex>
    );
  }
  return null;
};

interface VolumeChartProps {
  data: any;
}

export default function VolumeChart(props: VolumeChartProps) {
  if (!props.data) return null;

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
            offset={30}
            animationDuration={200}
            content={tooltipProps => <VolumeChartTooltip {...tooltipProps} />}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.25)', strokeWidth: 1, strokeDasharray: '2.5px' }}
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="url(#gradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ fill: '#2B71FF', strokeWidth: 0, r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
