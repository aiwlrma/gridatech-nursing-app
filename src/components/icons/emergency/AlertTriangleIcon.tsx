import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '../types';

export const AlertTriangleIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#1884FF' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
        fill={color}
      />
    </Svg>
  );
};
