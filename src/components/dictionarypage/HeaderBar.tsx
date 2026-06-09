import React from 'react';
import { Layout, Input, Button, Space } from 'antd';
import { HomeOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Header } = Layout;

interface HeaderBarProps {
  primaryBlue: string;
  onSearch: (value: string) => void; 
}

const HeaderBar: React.FC<HeaderBarProps> = ({ primaryBlue, onSearch }) => {
  
  const navigate = useNavigate();
  return (
    
    <Header style={{ 
      backgroundColor: primaryBlue, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <Button type="text" icon={<HomeOutlined style={{ fontSize: '24px', color: '#fff' }}  onClick={() => navigate("/")}/>} />
      
      <div style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>LOGO</div>

      <Space>
        <Input 
          placeholder="Pesquisar" 
          prefix={<SearchOutlined style={{ color: '#aaa' }}/>}
          style={{ borderRadius: '20px', width: '250px' }}
          onChange={(e) => onSearch(e.target.value)} 
          allowClear
        />
        <Button shape="circle" icon={<FilterOutlined />} />
      </Space>
    </Header>
  );
};

export default HeaderBar;