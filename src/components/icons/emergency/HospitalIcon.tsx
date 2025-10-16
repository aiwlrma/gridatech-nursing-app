import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '../types';

export const HospitalIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#1884FF' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
        fill={color}
      />
      <Path
        d="M11 7H13V9H15V11H13V13H11V11H9V9H11V7Z"
        fill={color}
      />
      <Path
        d="M11 15H13V17H11V15Z"
        fill={color}
      />
    </Svg>
  );
};
