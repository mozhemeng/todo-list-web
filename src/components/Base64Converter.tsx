import React, { useState } from 'react';
import { Typography, Input, Button, Row, Col, Card, Radio, Space, Alert } from 'antd';
import { SwapOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Base64Converter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Base64编码
  const encodeToBase64 = () => {
    try {
      if (!inputText.trim()) {
        setError('请输入要编码的文本');
        setOutputText('');
        return;
      }
      
      const encoded = btoa(encodeURIComponent(inputText));
      setOutputText(encoded);
      setError(null);
    } catch (err) {
      setError(`编码错误: ${(err as Error).message}`);
      setOutputText('');
    }
  };

  // Base64解码
  const decodeFromBase64 = () => {
    try {
      if (!inputText.trim()) {
        setError('请输入要解码的Base64文本');
        setOutputText('');
        return;
      }
      
      const decoded = decodeURIComponent(atob(inputText));
      setOutputText(decoded);
      setError(null);
    } catch (err) {
      setError(`解码错误: ${(err as Error).message}`);
      setOutputText('');
    }
  };

  // 处理转换
  const handleConvert = () => {
    if (mode === 'encode') {
      encodeToBase64();
    } else {
      decodeFromBase64();
    }
  };

  // 复制到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: '8px' }}>Base64编解码工具</Title>
        <Text>在文本和Base64编码之间进行转换</Text>
      </Card>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Radio.Group 
            value={mode} 
            onChange={(e) => {
              setMode(e.target.value);
              setInputText('');
              setOutputText('');
              setError(null);
            }}
            buttonStyle="solid"
            style={{ marginBottom: '16px' }}
          >
            <Radio.Button value="encode">编码</Radio.Button>
            <Radio.Button value="decode">解码</Radio.Button>
          </Radio.Group>
        </Col>
        
        <Col span={24}>
          <Card title={mode === 'encode' ? '输入文本' : '输入Base64'} variant="borderless" style={{ marginBottom: '16px' }}>
            <TextArea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? '在此输入要编码的文本...' : '在此输入要解码的Base64文本...'}
            />
          </Card>
        </Col>
        
        <Col span={24} style={{ textAlign: 'center', marginBottom: '16px' }}>
          <Button 
            type="primary" 
            icon={<SwapOutlined />} 
            onClick={handleConvert}
          >
            {mode === 'encode' ? '编码' : '解码'}
          </Button>
        </Col>
        
        {error && (
          <Col span={24}>
            <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />
          </Col>
        )}
        
        <Col span={24}>
          <Card 
            title={mode === 'encode' ? 'Base64结果' : '解码结果'} 
            variant="borderless"
            extra={
              outputText && (
                <Button 
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />} 
                  onClick={copyToClipboard}
                >
                  {copied ? '已复制' : '复制'}
                </Button>
              )
            }
          >
            <TextArea
              rows={8}
              value={outputText}
              readOnly
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Base64Converter;