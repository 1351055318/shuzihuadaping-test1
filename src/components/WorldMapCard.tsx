import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

// 简化类型定义
interface TradeRoute {
  fromName: string;
  toName: string;
  coords: [number[], number[]];
  value: number;
}

interface WorldMapCardProps {
  title: string;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MapSubtitle = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: normal;
`;

// 贸易流动组件
const WorldMapCard: React.FC<WorldMapCardProps> = ({ title, color, height = 400 }) => {
  // 坐标数据 - 使用经纬度坐标
  const geoCoordMap: Record<string, number[]> = {
    '中国': [116.4551, 40.2539],
    '美国': [-100.0, 40.0],
    '加拿大': [-102.5503, 56.1304],
    '英国': [-0.118092, 51.509865],
    '法国': [2.352222, 48.856613],
    '德国': [13.404954, 52.520008],
    '日本': [139.6917, 35.6895],
    '韩国': [126.978, 37.5665],
    '澳大利亚': [151.2093, -33.8688],
    '印度': [77.2090, 28.6139],
    '巴西': [-47.9292, -15.7801],
    '南非': [18.4241, -33.9249],
    '俄罗斯': [37.6173, 55.7558],
    '新加坡': [103.8198, 1.3521],
    '阿联酋': [55.2708, 25.2048]
  };

  // 模拟业务数据
  const businessData = [
    { name: '中国', value: 1000 },
    { name: '美国', value: 820 },
    { name: '英国', value: 620 },
    { name: '德国', value: 580 },
    { name: '日本', value: 540 },
    { name: '韩国', value: 480 },
    { name: '澳大利亚', value: 450 },
    { name: '印度', value: 430 },
    { name: '巴西', value: 380 },
    { name: '南非', value: 340 },
    { name: '俄罗斯', value: 320 },
    { name: '新加坡', value: 300 },
    { name: '阿联酋', value: 280 },
    { name: '法国', value: 260 },
    { name: '加拿大', value: 240 }
  ];

  // 转换数据格式用于飞线图
  const convertData = (data: {name: string, value: number}[], coordMap: Record<string, number[]>, centerPoint: number[]) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const fromCoord = coordMap[data[i].name];
      // 确保只处理有坐标的点
      if (fromCoord && centerPoint) {
        res.push({
          fromName: data[i].name,
          toName: '中国',
          coords: [fromCoord, centerPoint],
          value: data[i].value
        });
      }
    }
    return res;
  };

  // 简化的世界地图数据
  const simpleWorldMapData = {
    "type": "FeatureCollection",
    "features": []
  };

  // 初始化地图
  useEffect(() => {
    // 注册简化的世界地图
    echarts.registerMap('world', simpleWorldMapData);
    console.log('World map registered successfully');
  }, []);

  // 获取图表选项
  const getOption = () => {
    // 从中国到其他国家的贸易线
    const centerPoint = geoCoordMap['中国'];
    const linesData = convertData(
      businessData.filter(item => item.name !== '中国'), 
      geoCoordMap,
      centerPoint
    );

    return {
      backgroundColor: '#0B1C38',
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.seriesType === 'effectScatter') {
            return `${params.name}: ${params.value[2]}`;
          }
          if (params.seriesType === 'lines') {
            return `${params.data.fromName} → ${params.data.toName}: ${params.data.value}`;
          }
          return params.name;
        }
      },
      // 使用直角坐标系代替地理坐标系
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        containLabel: false
      },
      xAxis: {
        type: 'value',
        min: -180,
        max: 180,
        show: false
      },
      yAxis: {
        type: 'value',
        min: -90,
        max: 90,
        show: false
      },
      series: [
        // 业务中心点
        {
          name: '业务中心',
          type: 'effectScatter',
          coordinateSystem: 'cartesian2d',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontSize: 10,
            color: '#fff'
          },
          symbolSize: (val: any) => Math.max(val[2] / 50, 8),
          itemStyle: {
            color: '#1890ff',
            shadowBlur: 10,
            shadowColor: '#333'
          },
          data: businessData.map(item => ({
            name: item.name,
            value: [...geoCoordMap[item.name], item.value]
          }))
        },
        // 飞线效果
        {
          name: '贸易线路',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            color: (params: any) => {
              const value = params.data.value;
              if (value > 800) return '#f5222d';
              if (value > 500) return '#fa8c16';
              if (value > 300) return '#faad14';
              return '#52c41a';
            },
            width: (params: any) => Math.max(params.data.value / 200, 1),
            curveness: 0.3
          },
          data: linesData.map(line => {
            return {
              fromName: line.fromName,
              toName: line.toName,
              coords: line.coords,
              value: line.value
            };
          })
        },
        // 中心点高亮
        {
          name: '中国中心',
          type: 'effectScatter',
          coordinateSystem: 'cartesian2d',
          zlevel: 2,
          rippleEffect: {
            period: 3,
            brushType: 'stroke',
            scale: 5
          },
          label: {
            show: true,
            position: 'right',
            color: '#FFD246',
            formatter: '{b}',
            fontSize: 12
          },
          symbolSize: 12,
          itemStyle: {
            color: '#FFD246',
            shadowBlur: 12,
            shadowColor: '#FFD246'
          },
          data: [{
            name: '中国',
            value: [...geoCoordMap['中国'], 1000]
          }]
        }
      ]
    };
  };

  // 状态管理
  const [option, setOption] = useState(getOption());

  // 更新效果
  useEffect(() => {
    const timer = setInterval(() => {
      // 随机更新业务数据值
      const updatedBusinessData = businessData.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 100 - 50)
      }));

      const centerPoint = geoCoordMap['中国'];
      const updatedLinesData = convertData(
        updatedBusinessData.filter(item => item.name !== '中国'),
        geoCoordMap,
        centerPoint
      );

      // 创建新选项
      const newOption = getOption();
      // 更新系列数据
      (newOption.series[0] as any).data = updatedBusinessData.map(item => ({
        name: item.name,
        value: [...geoCoordMap[item.name], item.value]
      }));
      (newOption.series[1] as any).data = updatedLinesData.map(line => {
        return {
          fromName: line.fromName,
          toName: line.toName,
          coords: line.coords,
          value: line.value
        };
      });

      setOption(newOption);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <MapWrapper color={color}>
      <MapTitle>
        {title}
        <MapSubtitle>实时跟踪全球业务流向</MapSubtitle>
      </MapTitle>
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </MapWrapper>
  );
};

export default WorldMapCard; 