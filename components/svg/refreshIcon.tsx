import React from 'react';
import { Path, Svg } from 'react-native-svg';

const RefreshIcon = ({ size = 24, color = "#7541CD" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.5715 4.00003C19.3301 5.57409 21.1429 8.59654 21.1429 12C21.1429 17.0495 17.0495 21.1429 12 21.1429C6.95057 21.1429 2.85718 17.0495 2.85718 12C2.85718 6.95057 6.95057 2.85718 12 2.85718"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5715 8.57143V4H21.143"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default RefreshIcon;