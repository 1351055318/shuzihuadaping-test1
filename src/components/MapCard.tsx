import React from 'react';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
// 注意：为了正确加载中国地图，需要在项目开始前执行 npm install echarts-gl

interface MapCardProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
  height?: number;
}

const MapWrapper = styled.div<{ color?: string }>`
  background-color: ${props => props.color || '#1a1a1a'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MapTitle = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
  font-weight: bold;
`;

const MapCard: React.FC<MapCardProps> = ({ title, data, color, height = 500 }) => {
  // 由于中国地图数据加载问题，我们改用柱状图来展示区域数据
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c}'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 45,
        color: 'rgba(255, 255, 255, 0.65)'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '销售量',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.65)'
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.65)'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: title,
        type: 'bar',
        data: data.map(item => item.value),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#1890ff'
              },
              {
                offset: 1,
                color: '#39C0C8'
              }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#40a9ff'
                },
                {
                  offset: 1,
                  color: '#36CFC9'
                }
              ]
            }
          }
        }
      }
    ]
  };

  return (
    <MapWrapper color={color}>
      <MapTitle>{title}</MapTitle>
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </MapWrapper>
  );
};

export default MapCard; 