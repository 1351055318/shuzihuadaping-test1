// 模拟数据工具

// 生成随机区间数字
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 生成模拟的趋势数据
export const generateTrendData = (days: number = 7, baseValue: number = 1000, volatility: number = 100): number[] => {
  return Array.from({ length: days }, () => baseValue + randomNumber(-volatility, volatility));
};

// 生成模拟的分类数据
export const generateCategoryData = (categories: string[], baseValue: number = 100, volatility: number = 50): Array<{ name: string; value: number }> => {
  return categories.map(category => ({
    name: category,
    value: baseValue + randomNumber(-volatility, volatility)
  }));
};

// 生成模拟的时间序列数据
export const generateTimeSeriesData = (days: number = 30, baseValue: number = 1000, volatility: number = 200): Array<{ date: string; value: number }> => {
  const today = new Date();
  
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - days + index + 1);
    
    return {
      date: date.toISOString().split('T')[0],
      value: baseValue + randomNumber(-volatility, volatility)
    };
  });
};

// 模拟的产品销售数据
export interface ProductData {
  id: string;
  name: string;
  category: string;
  sales: number;
  stock: number;
  trend: number;
}

export const generateProductData = (count: number = 10): ProductData[] => {
  const categories = ['电子产品', '家居用品', '食品饮料', '服装鞋帽', '美妆护肤'];
  const productNames = [
    '智能手机', '笔记本电脑', '平板电脑', '智能手表', '蓝牙耳机',
    '沙发', '餐桌', '床垫', '衣柜', '茶几',
    '矿泉水', '碳酸饮料', '果汁', '茶饮料', '咖啡',
    'T恤', '牛仔裤', '运动鞋', '外套', '连衣裙',
    '面霜', '洗面奶', '精华液', '口红', '防晒霜'
  ];

  return Array.from({ length: count }, (_, index) => {
    const categoryIndex = randomNumber(0, categories.length - 1);
    const nameIndex = categoryIndex * 5 + randomNumber(0, 4);
    
    return {
      id: `P${index + 1}`,
      name: productNames[nameIndex],
      category: categories[categoryIndex],
      sales: randomNumber(500, 10000),
      stock: randomNumber(50, 500),
      trend: randomNumber(-20, 30)
    };
  });
};

// 模拟的中国省份数据
export const generateChinaProvinceData = (): Array<{ name: string; value: number }> => {
  const provinces = [
    '北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江',
    '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南',
    '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾',
    '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门'
  ];
  
  return provinces.map(province => ({
    name: province,
    value: randomNumber(100, 1000)
  }));
}; 