import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../types';

export const StethoscopeIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#3182F6' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M12 12v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M12 12V9a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle
        cx="18"
        cy="18"
        r="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
};