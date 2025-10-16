import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '../types';

export const AmbulanceIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#1884FF' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 7H16V4C16 3.45 15.55 3 15 3H9C8.45 3 8 3.45 8 4V7H5C3.9 7 3 7.9 3 9V18C3 19.1 3.9 20 5 20H6C6.55 20 7 19.55 7 19V18H17V19C17 19.55 17.45 20 18 20H19C20.1 20 21 19.1 21 18V9C21 7.9 20.1 7 19 7ZM10 5H14V7H10V5ZM19 18H18V17C18 16.45 17.55 16 17 16H7C6.45 16 6 16.45 6 17V18H5V9H19V18Z"
        fill={color}
      />
      <Path
        d="M8 12H10V14H8V12ZM14 12H16V14H14V12ZM12 10H14V12H12V10ZM12 14H14V16H12V14Z"
        fill={color}
      />
    </Svg>
  );
};
