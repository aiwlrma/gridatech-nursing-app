import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface ClipboardIconProps {
  size?: number;
  color?: string;
}

const ClipboardIcon: React.FC<ClipboardIconProps> = ({ 
  size = 24, 
  color = '#6B7280' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Rect
        x="9"
        y="3"
        width="6"
        height="4"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M9 12H15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 16H15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ClipboardIcon;