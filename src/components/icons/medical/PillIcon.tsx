import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../types';

export const PillIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#3182F6' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 12.75a6 6 0 0 1 6-6h3a6 6 0 0 1 6 6v0a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6v0z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M9.5 8.5L14.5 15.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};