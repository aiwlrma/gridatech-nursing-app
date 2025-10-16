import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from '../types';

export const BandageIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#3182F6' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="8"
        width="18"
        height="8"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M8 12h8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M12 8v8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};