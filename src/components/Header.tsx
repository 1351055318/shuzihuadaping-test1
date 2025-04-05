import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 15px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(24, 144, 255, 0.3) 20%, 
      rgba(114, 46, 209, 0.3) 50%, 
      rgba(24, 144, 255, 0.3) 80%, 
      transparent);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 70%;
    background: linear-gradient(to bottom, #1890ff, #7649eb);
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  background: linear-gradient(90deg, #1890ff, #7649eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 10px rgba(114, 46, 209, 0.3);
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #52c41a;
    border-radius: 50%;
    margin-left: 10px;
    box-shadow: 0 0 8px #52c41a;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(82, 196, 26, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);
    }
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  margin: 5px 0 0 0;
`;

const DateTime = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: rgba(20, 20, 20, 0.5);
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Time = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
`;

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [currentTime, setCurrentTime] = React.useState('');
  const [currentDate, setCurrentDate] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString('zh-CN'));
      setCurrentDate(date.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      }));
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <HeaderWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleWrapper>
      <DateTime>
        <Time>{currentTime}</Time>
        <div>{currentDate}</div>
      </DateTime>
    </HeaderWrapper>
  );
};

export default Header; 