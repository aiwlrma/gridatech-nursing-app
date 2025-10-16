import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from '../types';

export const FirstAidIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#F04452' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L2 7l10 5 10-5-10-5z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M2 17l10 5 10-5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M2 12l10 5 10-5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Rect
        x="10"
        y="10"
        width="4"
        height="4"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
};