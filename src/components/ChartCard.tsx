import React from 'react';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ChartCardProps {
  title: string;
  option: EChartsOption;
  height?: number;
  color?: string;
}

const ChartWrapper = styled.div<{ color?: string }>`
  background-color: ${props => props.color || '#1a1a1a'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
  font-weight: bold;
`;

const ChartCard: React.FC<ChartCardProps> = ({ title, option, height = 300, color }) => {
  return (
    <ChartWrapper color={color}>
      <ChartTitle>{title}</ChartTitle>
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </ChartWrapper>
  );
};

export default ChartCard; 