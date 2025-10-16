import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '../types';

export const ShieldIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#1884FF' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 21C7.5 19.5 5 15.5 5 11V6.3L12 3.19L19 6.3V11C19 15.5 16.5 19.5 12 21Z"
        fill={color}
      />
    </Svg>
  );
};
