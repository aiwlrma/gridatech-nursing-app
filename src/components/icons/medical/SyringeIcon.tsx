import React from 'react';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { IconProps } from '../types';

export const SyringeIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#3182F6' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 2L22 6L20 8L16 4L18 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M3 7L17 21L15 23L1 9L3 7Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle
        cx="12"
        cy="12"
        r="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Line
        x1="8"
        y1="8"
        x2="6"
        y2="6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};