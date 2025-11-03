import React, { useState } from 'react';
import { Typography, Input, Button, Row, Col, Card, Alert, Space, Radio } from 'antd';
import { CodeOutlined, CompressOutlined, ExpandOutlined, CopyOutlined, CheckOutlined, UndoOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

const JsonFormatter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  // 格式化JSON
  const formatJson = () => {
    try {
      if (!jsonInput.trim()) {
        setError('请输入JSON数据');
        setJsonOutput('');
        return;
      }
      
      const parsedJson = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsedJson, null, indentSize));
      setError(null);
    } catch (err) {
      setError(`JSON解析错误: ${(err as Error).message}`);
      setJsonOutput('');
    }
  };

  // 压缩JSON
  const compressJson = () => {
    try {
      if (!jsonInput.trim()) {
        setError('请输入JSON数据');
        setJsonOutput('');
        return;
      }
      
      const parsedJson = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsedJson));
      setError(null);
    } catch (err) {
      setError(`JSON解析错误: ${(err as Error).message}`);
      setJsonOutput('');
    }
  };

  // 验证JSON
  const validateJson = () => {
    try {
      if (!jsonInput.trim()) {
        setError('请输入JSON数据');
        return;
      }
      
      JSON.parse(jsonInput);
      setError(null);
      setJsonOutput('JSON格式有效');
    } catch (err) {
      setError(`JSON格式无效: ${(err as Error).message}`);
      setJsonOutput('');
    }
  };

  // 移除转义和前后引号
  const removeEscapes = () => {
    try {
      if (!jsonInput.trim()) {
        setError('请输入需要处理的文本');
        setJsonOutput('');
        return;
      }
      
      let processedText = jsonInput;
      
      // 移除前后的引号
      if (processedText.startsWith('"') && processedText.endsWith('"')) {
        processedText = processedText.substring(1, processedText.length - 1);
      }
      
      // 移除转义字符
      processedText = processedText.replace(/\\"/g, '"')
                                  .replace(/\\\\/g, '\\')
                                  .replace(/\\n/g, '\n')
                                  .replace(/\\r/g, '\r')
                                  .replace(/\\t/g, '\t')
                                  .replace(/\\b/g, '\b')
                                  .replace(/\\f/g, '\f');
      
      setJsonOutput(processedText);
      setError(null);
    } catch (err) {
      setError(`处理文本出错: ${(err as Error).message}`);
      setJsonOutput('');
    }
  };

  // 复制到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: '8px' }}>JSON格式化与验证工具</Title>
        <Text>粘贴JSON文本进行格式化、压缩、验证和移除转义</Text>
      </Card>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="输入JSON" variant="borderless" style={{ marginBottom: '16px' }}>
            <TextArea
              rows={10}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="在此粘贴JSON文本..."
              style={{ fontFamily: 'monospace' }}
            />
          </Card>
        </Col>
        
        <Col span={24}>
          <Space wrap style={{ marginBottom: '16px' }}>
            <Button 
              type="primary" 
              icon={<ExpandOutlined />} 
              onClick={formatJson}
            >
              格式化
            </Button>
            <Button 
              icon={<CompressOutlined />} 
              onClick={compressJson}
            >
              压缩
            </Button>
            <Button 
              icon={<CodeOutlined />} 
              onClick={validateJson}
            >
              验证
            </Button>
            <Button 
              icon={<UndoOutlined />} 
              onClick={removeEscapes}
            >
              移除转义
            </Button>
            <Radio.Group 
              value={indentSize} 
              onChange={(e) => setIndentSize(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value={2}>2空格</Radio.Button>
              <Radio.Button value={4}>4空格</Radio.Button>
              <Radio.Button value={8}>8空格</Radio.Button>
            </Radio.Group>
          </Space>
        </Col>
        
        {error && (
          <Col span={24}>
            <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />
          </Col>
        )}
        
        <Col span={24}>
          <Card 
            title="输出结果" 
            variant="borderless"
            extra={
              jsonOutput && (
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
              rows={10}
              value={jsonOutput}
              readOnly
              style={{ fontFamily: 'monospace' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JsonFormatter;