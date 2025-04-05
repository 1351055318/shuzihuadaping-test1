import React from 'react';
import styled from 'styled-components';
import Header from './Header';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: #121212;
  background-image: 
    radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.15) 2%, transparent 0%),
    radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.15) 2%, transparent 0%);
  background-size: 100px 100px;
  padding: 15px 25px;
  color: white;
  overflow: hidden;
  
  /* 添加悬浮粒子效果 */
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 50% 30%, rgba(24, 144, 255, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 80% 70%, rgba(114, 46, 209, 0.1) 0%, transparent 20%);
    z-index: 0;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(80px, auto);
  grid-gap: 12px;
  position: relative;
  z-index: 1;
`;

// 添加装饰组件
const DecorativeCorner = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-style: solid;
  border-color: rgba(24, 144, 255, 0.5);
  z-index: 0;
  
  &.top-left {
    top: 20px;
    left: 20px;
    border-width: 2px 0 0 2px;
  }
  
  &.top-right {
    top: 20px;
    right: 20px;
    border-width: 2px 2px 0 0;
  }
  
  &.bottom-left {
    bottom: 20px;
    left: 20px;
    border-width: 0 0 2px 2px;
  }
  
  &.bottom-right {
    bottom: 20px;
    right: 20px;
    border-width: 0 2px 2px 0;
  }
`;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <LayoutWrapper>
      <DecorativeCorner className="top-left" />
      <DecorativeCorner className="top-right" />
      <DecorativeCorner className="bottom-left" />
      <DecorativeCorner className="bottom-right" />
      <Header title={title} subtitle={subtitle} />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </LayoutWrapper>
  );
};

// Grid Item Component for easier layout
interface GridItemProps {
  children: React.ReactNode;
  colSpan: number;
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
}

const GridItem = styled.div<GridItemProps>`
  grid-column: ${props => props.colStart ? `${props.colStart} / span ${props.colSpan}` : `span ${props.colSpan}`};
  grid-row: ${props => props.rowStart ? `${props.rowStart} / span ${props.rowSpan || 1}` : `span ${props.rowSpan || 1}`};
  position: relative;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: ${props => Math.random() * 0.5}s;
  opacity: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(24, 144, 255, 0.3), transparent);
    z-index: 1;
  }
`;

export { DashboardLayout, GridItem };
export type { GridItemProps }; 