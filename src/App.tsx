import React from 'react';
import { DashboardLayout, GridItem } from './components/DashboardLayout';
import DataCard from './components/DataCard';
import ChartCard from './components/ChartCard';
import TableCard from './components/TableCard';
import MapCard from './components/MapCard';
import WorldMapCard from './components/WorldMapCard';
import { EChartsOption } from 'echarts';
import {
  generateTrendData,
  generateCategoryData,
  generateTimeSeriesData,
  generateProductData,
  generateChinaProvinceData,
  ProductData
} from './utils/mockData';
import { 
  DollarOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  RiseOutlined,
  TeamOutlined,
  LikeOutlined,
  AreaChartOutlined,
  FundOutlined
} from '@ant-design/icons';

const App: React.FC = () => {
  // 模拟数据
  const salesData = generateTrendData(7, 5000, 1000);
  const userCountData = generateTrendData(7, 3000, 500);
  const orderCountData = generateTrendData(7, 2000, 300);
  const conversionRateData = generateTrendData(7, 30, 5);
  
  const categoryData = generateCategoryData(['电子产品', '家居用品', '食品饮料', '服装鞋帽', '美妆护肤'], 500, 200);
  const timeSeriesData = generateTimeSeriesData(30, 5000, 1000);
  const productTableData = generateProductData(10);
  
  // 限制地图数据显示前10个省份，避免视觉混乱
  const allMapData = generateChinaProvinceData();
  const mapData = allMapData.slice(0, 10).sort((a, b) => b.value - a.value);

  // 图表配置
  const salesChartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#ccc' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#ccc' }
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: salesData,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#38f' },
              { offset: 1, color: '#16d' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        }
      }
    ],
    backgroundColor: 'transparent'
  };

  const categoryChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: categoryData.map(item => item.name),
      textStyle: { color: '#ccc' }
    },
    series: [
      {
        name: '分类销售',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: categoryData.map(item => ({ name: item.name, value: item.value }))
      }
    ],
    backgroundColor: 'transparent'
  };

  const trendChartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeSeriesData.slice(0, 15).map(item => item.date),
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#ccc', rotate: 30 }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#ccc' }
    },
    series: [
      {
        name: '销售趋势',
        type: 'line',
        data: timeSeriesData.slice(0, 15).map(item => item.value),
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#1890ff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
              { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
            ]
          }
        }
      }
    ],
    backgroundColor: 'transparent'
  };

  // 用户活跃度图表
  const userActivityOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#ccc' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#666' } },
      axisLabel: { color: '#ccc' }
    },
    series: [
      {
        name: '用户活跃度',
        type: 'line',
        smooth: true,
        data: [120, 80, 150, 280, 350, 220],
        itemStyle: {
          color: '#722ed1'
        },
        lineStyle: {
          width: 3,
          color: '#722ed1'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              {offset: 0, color: 'rgba(114, 46, 209, 0.3)'},
              {offset: 1, color: 'rgba(114, 46, 209, 0.1)'}
            ]
          }
        }
      }
    ],
    backgroundColor: 'transparent'
  };

  // 转化漏斗图
  const funnelOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    legend: {
      data: ['访问', '浏览', '加购', '下单', '支付'],
      textStyle: { color: '#ccc' }
    },
    series: [
      {
        name: '转化率',
        type: 'funnel',
        left: '10%',
        top: 40,
        bottom: 20,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#121212',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 14
          }
        },
        data: [
          { value: 100, name: '访问' },
          { value: 80, name: '浏览' },
          { value: 60, name: '加购' },
          { value: 40, name: '下单' },
          { value: 30, name: '支付' }
        ]
      }
    ],
    backgroundColor: 'transparent'
  };

  // 表格列定义
  const productColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: '销售额',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => `¥${sales.toLocaleString()}`
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock'
    },
    {
      title: '趋势',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: number) => (
        <span style={{ color: trend >= 0 ? '#52c41a' : '#ff4d4f' }}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      )
    }
  ];

  return (
    <DashboardLayout title="企业经营数据分析大屏" subtitle="实时监控企业核心经营指标">
      {/* 顶部卡片 */}
      <GridItem colSpan={3}>
        <DataCard 
          title="总销售额" 
          value={125037891} 
          unit="元" 
          trend={12.5} 
          icon={<DollarOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
          color="#141414"
        />
      </GridItem>
      <GridItem colSpan={3}>
        <DataCard 
          title="总用户数" 
          value={98625} 
          unit="人" 
          trend={8.2} 
          icon={<UserOutlined style={{ fontSize: 24, color: '#722ed1' }} />}
          color="#141414"
        />
      </GridItem>
      <GridItem colSpan={3}>
        <DataCard 
          title="订单量" 
          value={21546} 
          unit="单" 
          trend={-3.8} 
          icon={<ShoppingOutlined style={{ fontSize: 24, color: '#13c2c2' }} />}
          color="#141414"
        />
      </GridItem>
      <GridItem colSpan={3}>
        <DataCard 
          title="转化率" 
          value={38.5} 
          unit="%" 
          trend={6.8} 
          icon={<RiseOutlined style={{ fontSize: 24, color: '#52c41a' }} />}
          color="#141414"
        />
      </GridItem>
      
      {/* 第二行卡片 */}
      <GridItem colSpan={3}>
        <DataCard 
          title="日活用户" 
          value={42870} 
          unit="人" 
          trend={3.5} 
          icon={<TeamOutlined style={{ fontSize: 24, color: '#fa8c16' }} />}
          color="#141414"
        />
      </GridItem>
      <GridItem colSpan={3}>
        <DataCard 
          title="客户满意度" 
          value={95.8} 
          unit="%" 
          trend={1.2} 
          icon={<LikeOutlined style={{ fontSize: 24, color: '#eb2f96' }} />}
          color="#141414"
        />
      </GridItem>
      <GridItem colSpan={3}>
        <DataCard 
          title="平均客单价" 
          value={5802} 
          unit="元" 
          trend={2.6} 
          icon={<AreaChartOutlined style={{ fontSize: 24, color: '#a0d911' }} />}
          color="#141414"
        />
      </GridItem>
      <GridItem colSpan={3}>
        <DataCard 
          title="月增长率" 
          value={15.2} 
          unit="%" 
          trend={4.9} 
          icon={<FundOutlined style={{ fontSize: 24, color: '#f5222d' }} />}
          color="#141414"
        />
      </GridItem>
      
      {/* 图表区域 */}
      <GridItem colSpan={6} rowSpan={2}>
        <ChartCard title="销售趋势分析" option={trendChartOption} color="#141414" height={300} />
      </GridItem>
      
      <GridItem colSpan={6} rowSpan={2}>
        <MapCard title="地区销售分布" data={mapData} color="#141414" height={300} />
      </GridItem>
      
      <GridItem colSpan={3}>
        <ChartCard title="销售额周比" option={salesChartOption} color="#141414" height={250} />
      </GridItem>
      
      <GridItem colSpan={3}>
        <ChartCard title="产品类别分析" option={categoryChartOption} color="#141414" height={250} />
      </GridItem>
      
      <GridItem colSpan={3}>
        <ChartCard title="用户活跃度分析" option={userActivityOption} color="#141414" height={250} />
      </GridItem>
      
      <GridItem colSpan={3}>
        <ChartCard title="转化漏斗分析" option={funnelOption} color="#141414" height={250} />
      </GridItem>
      
      {/* 世界地图组件 */}
      <GridItem colSpan={12}>
        <WorldMapCard title="全球贸易物流分布" color="#141414" height={400} />
      </GridItem>
      
      {/* 底部表格 */}
      <GridItem colSpan={12}>
        <TableCard<ProductData>
          title="产品销售排行"
          data={productTableData}
          columns={productColumns}
          color="#141414"
        />
      </GridItem>
    </DashboardLayout>
  );
};

export default App;
