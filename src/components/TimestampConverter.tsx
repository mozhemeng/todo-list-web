import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Select, 
  Row, 
  Col,
  Divider,
  message
} from 'antd';
import { SwapOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// 时区选项
const timezoneOptions = [
  { value: 'UTC+8', label: 'UTC+8 (北京时间)' },
  { value: 'UTC+0', label: 'UTC+0 (格林威治时间)' },
  { value: 'UTC-8', label: 'UTC-8 (太平洋标准时间)' },
  { value: 'UTC+1', label: 'UTC+1 (中欧时间)' },
  { value: 'UTC+9', label: 'UTC+9 (日本时间)' },
];

// 时区偏移量（小时）
const timezoneOffsets: Record<string, number> = {
  'UTC+8': 8,
  'UTC+0': 0,
  'UTC-8': -8,
  'UTC+1': 1,
  'UTC+9': 9,
};

const TimestampConverter: React.FC = () => {
  // 状态管理
  const [timestamp, setTimestamp] = useState<string>('');
  const [dateTimeString, setDateTimeString] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('UTC+8');
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 判断时间戳精度（秒/毫秒）
  const determineTimestampPrecision = (ts: string): 'seconds' | 'milliseconds' => {
    return ts.length <= 10 ? 'seconds' : 'milliseconds';
  };

  // 时间戳转日期时间字符串
  const convertTimestampToDateTime = () => {
    if (!timestamp.trim()) {
      message.error('请输入时间戳');
      return;
    }

    try {
      let ts = parseInt(timestamp.trim());
      
      // 根据长度判断是否需要转换为毫秒
      if (determineTimestampPrecision(timestamp.trim()) === 'seconds') {
        ts *= 1000; // 秒转毫秒
      }

      // 创建日期对象
      const date = new Date(ts);
      
      // 应用时区偏移
      const offset = timezoneOffsets[timezone] || 8;
      const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
      const tzTime = new Date(utcTime + (3600000 * offset));
      
      // 格式化日期时间
      const formattedDateTime = tzTime.toISOString().replace('T', ' ').replace('Z', '');
      setDateTimeString(formattedDateTime);
    } catch (error) {
      message.error('无效的时间戳格式');
    }
  };

  // 日期时间字符串转时间戳
  const convertDateTimeToTimestamp = () => {
    if (!dateTimeString.trim()) {
      message.error('请输入日期时间');
      return;
    }

    try {
      // 解析日期时间字符串
      const date = new Date(dateTimeString.trim().replace(' ', 'T') + 'Z');
      
      // 应用时区偏移
      const offset = timezoneOffsets[timezone] || 8;
      const utcTime = date.getTime() - (3600000 * offset);
      
      // 根据是否有毫秒决定返回格式
      const hasMilliseconds = dateTimeString.includes('.');
      const ts = hasMilliseconds ? utcTime : Math.floor(utcTime / 1000);
      
      setTimestamp(ts.toString());
    } catch (error) {
      message.error('无效的日期时间格式');
    }
  };

  // 使用当前时间
  const useCurrentTime = () => {
    const now = new Date();
    const offset = timezoneOffsets[timezone] || 8;
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const tzTime = new Date(utcTime + (3600000 * offset));
    
    // 格式化当前时间
    const formattedDateTime = tzTime.toISOString().replace('T', ' ').replace('Z', '');
    setDateTimeString(formattedDateTime);
    setTimestamp(now.getTime().toString()); // 使用毫秒级时间戳
  };

  return (
    <div className="content-container">
      <div style={{ background: 'white', padding: '20px', borderRadius: '4px', maxWidth: '800px', margin: '0 auto' }}>
        <Title level={2} style={{ margin: '16px 0', textAlign: 'center' }}>时间戳转换</Title>
        
        <Card style={{ marginBottom: 20 }}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row gutter={16} align="middle">
              <Col span={6}>
                <Text strong>选择时区：</Text>
              </Col>
              <Col span={18}>
                <Select 
                  value={timezone} 
                  onChange={setTimezone} 
                  style={{ width: '100%' }}
                >
                  {timezoneOptions.map(option => (
                    <Option key={option.value} value={option.value}>{option.label}</Option>
                  ))}
                </Select>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16} align="middle">
              <Col span={6}>
                <Text strong>时间戳：</Text>
              </Col>
              <Col span={18}>
                <Space.Compact style={{ width: '100%' }}>
                  <Input 
                    placeholder="输入时间戳..." 
                    value={timestamp} 
                    onChange={(e) => setTimestamp(e.target.value)}
                    size="large"
                  />
                  <Button 
                    type="primary" 
                    onClick={convertTimestampToDateTime}
                    size="large"
                  >
                    转换为日期时间
                  </Button>
                </Space.Compact>
              </Col>
            </Row>

            <Row justify="center">
              <Button 
                type="text" 
                icon={<SwapOutlined />} 
                onClick={() => {
                  convertTimestampToDateTime();
                  convertDateTimeToTimestamp();
                }}
              >
                互相转换
              </Button>
            </Row>

            <Row gutter={16} align="middle">
              <Col span={6}>
                <Text strong>日期时间：</Text>
              </Col>
              <Col span={18}>
                <Space.Compact style={{ width: '100%' }}>
                  <Input 
                    placeholder="YYYY-MM-DD HH:mm:ss.SSS" 
                    value={dateTimeString} 
                    onChange={(e) => setDateTimeString(e.target.value)}
                    size="large"
                  />
                  <Button 
                    type="primary" 
                    onClick={convertDateTimeToTimestamp}
                    size="large"
                  >
                    转换为时间戳
                  </Button>
                </Space.Compact>
              </Col>
            </Row>

            <Row justify="center">
              <Button 
                type="default" 
                icon={<ClockCircleOutlined />} 
                onClick={useCurrentTime}
              >
                使用当前时间
              </Button>
            </Row>
          </Space>
        </Card>

        <Divider />
        
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={4}>使用说明</Title>
            <Text>1. 时间戳长度 &le; 10 位：精确到秒</Text>
            <Text>2. 时间戳长度 &gt; 10 位：精确到毫秒</Text>
            <Text>3. 默认使用东八区（北京时间）</Text>
            <Text>4. 日期时间格式：YYYY-MM-DD HH:mm:ss.SSSSSS</Text>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default TimestampConverter;