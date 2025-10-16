import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../types';

export const AlertIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#F04452' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"
        fill={color}
      />
    </Svg>
  );
};