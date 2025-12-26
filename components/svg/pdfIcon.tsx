import Svg, { Path } from 'react-native-svg';

interface PDFIconProps {
  size?: number;
  color?: string;
}

const PDFIcon = ({ size = 32, color = '#FF1474' }: PDFIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Lettre P */}
    <Path 
      d="M7.46657 17.0667H6.3999V14.9333H7.46657C8.05567 14.9333 8.53324 15.4109 8.53324 16C8.53324 16.5891 8.05567 17.0667 7.46657 17.0667Z" 
      fill={color}
    />
    
    {/* Lettre D */}
    <Path 
      d="M14.9333 21.3334V14.9333H16C16.5891 14.9333 17.0667 15.4109 17.0667 16V20.2667C17.0667 20.8558 16.5891 21.3334 16 21.3334H14.9333Z" 
      fill={color}
    />
    
    {/* Contour du document avec PDF */}
    <Path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M2.1333 3.2C2.1333 1.43269 3.56598 0 5.3333 0H22.8418L29.8666 7.02483V28.8C29.8666 30.5673 28.4339 32 26.6666 32H5.3333C3.56598 32 2.1333 30.5673 2.1333 28.8V3.2ZM7.46663 12.8H4.26663V23.4667H6.39997V19.2H7.46663C9.23395 19.2 10.6666 17.7673 10.6666 16C10.6666 14.2327 9.23395 12.8 7.46663 12.8ZM16 12.8H12.8V23.4667H16C17.7673 23.4667 19.2 22.0339 19.2 20.2667V16C19.2 14.2327 17.7673 12.8 16 12.8ZM21.3333 23.4667V12.8H27.7333V14.9333H23.4666V17.0667H25.6V19.2H23.4666V23.4667H21.3333Z" 
      fill={color}
    />
  </Svg>
);

export default PDFIcon;