import React, { useState } from 'react';
import { Card, Input, Button, Select, Row, Col, Typography, message } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import crypto from 'crypto-js';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const HashCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashType, setHashType] = useState('md5');
  const [hashResult, setHashResult] = useState('');
  const [copied, setCopied] = useState(false);

  const calculateHash = () => {
    if (!input) {
      message.warning('请输入要计算哈希的内容');
      return;
    }

    let result = '';
    try {
      switch (hashType) {
        case 'md5':
          result = crypto.MD5(input).toString();
          break;
        case 'sha1':
          result = crypto.SHA1(input).toString();
          break;
        case 'sha256':
          result = crypto.SHA256(input).toString();
          break;
        case 'sha512':
          result = crypto.SHA512(input).toString();
          break;
        case 'sha3':
          result = crypto.SHA3(input).toString();
          break;
        default:
          result = crypto.MD5(input).toString();
      }
      setHashResult(result);
    } catch (error) {
      message.error('哈希计算出错');
      console.error('Hash calculation error:', error);
    }
  };

  const copyToClipboard = () => {
    if (hashResult) {
      navigator.clipboard.writeText(hashResult)
        .then(() => {
          setCopied(true);
          message.success('已复制到剪贴板');
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          message.error('复制失败');
        });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: '8px' }}>哈希计算工具 (MD5/SHA)</Title>
        <Text>计算文本的各种哈希值，支持MD5、SHA1、SHA256、SHA512和SHA3</Text>
      </Card>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="输入文本" variant="borderless" style={{ marginBottom: '16px' }}>
            <TextArea
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此输入需要计算哈希的文本..."
            />
          </Card>
        </Col>
        
        <Col span={24}>
          <Row gutter={16} align="middle" style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Select
                value={hashType}
                onChange={(value) => setHashType(value)}
                style={{ width: '100%' }}
              >
                <Option value="md5">MD5</Option>
                <Option value="sha1">SHA1</Option>
                <Option value="sha256">SHA256</Option>
                <Option value="sha512">SHA512</Option>
                <Option value="sha3">SHA3</Option>
              </Select>
            </Col>
            <Col span={16}>
              <Button type="primary" onClick={calculateHash}>
                计算哈希
              </Button>
            </Col>
          </Row>
        </Col>
        
        <Col span={24}>
          <Card 
            title="哈希结果" 
            variant="borderless"
            extra={
              hashResult && (
                <Button 
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />} 
                  onClick={copyToClipboard}
                >
                  {copied ? '已复制' : '复制'}
                </Button>
              )
            }
          >
            <Input.TextArea
              rows={2}
              value={hashResult}
              placeholder="哈希结果将显示在这里..."
              readOnly
              style={{ fontFamily: 'monospace' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HashCalculator;