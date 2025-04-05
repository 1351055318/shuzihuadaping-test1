import React from 'react';
import styled from 'styled-components';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface DataCardProps {
  title: string;
  value: number;
  unit: string;
  trend?: number;
  icon?: React.ReactNode;
  color?: string;
}

const CardWrapper = styled.div<{ color?: string }>`
  background-color: ${props => props.color || '#1a1a1a'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 8px;
`;

const CardValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: baseline;
`;

const CardUnit = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  margin-left: 5px;
`;

const CardTrend = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: ${props => props.$isPositive ? '#52c41a' : '#ff4d4f'};
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const DataCard: React.FC<DataCardProps> = ({ title, value, unit, trend, icon, color }) => {
  const isPositive = trend !== undefined ? trend >= 0 : false;
  
  return (
    <CardWrapper color={color}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <div>
        <CardTitle>{title}</CardTitle>
        <CardValue>
          {value.toLocaleString()}
          <CardUnit>{unit}</CardUnit>
        </CardValue>
        {trend !== undefined && (
          <CardTrend $isPositive={isPositive}>
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            <span style={{ marginLeft: '5px' }}>{Math.abs(trend)}%</span>
          </CardTrend>
        )}
      </div>
    </CardWrapper>
  );
};

export default DataCard; 