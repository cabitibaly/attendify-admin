import Svg, { Circle, Path } from 'react-native-svg';

interface CalendarIconProps {
  size?: number;
  color?: string;
  opacity?: number;
}

const CalendarIcon2 = ({ size = 24, color = '#1C274C', opacity = 1 }: CalendarIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Cadre principal */}
    <Path 
      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" 
      stroke={color} 
      strokeWidth="1.5"
    />
    
    {/* Attache gauche */}
    <Path 
      opacity={opacity * 0.5}
      d="M7 4V2.5" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    
    {/* Attache droite */}
    <Path 
      opacity={opacity * 0.5}
      d="M17 4V2.5" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    
    {/* Ligne horizontale */}
    <Path 
      opacity={opacity * 0.5}
      d="M2.5 9H21.5" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    
    {/* Points du calendrier */}
    <Circle cx="17" cy="17" r="1" fill={color} />
    <Circle cx="17" cy="13" r="1" fill={color} />
    <Circle cx="12" cy="17" r="1" fill={color} />
    <Circle cx="12" cy="13" r="1" fill={color} />
    <Circle cx="7" cy="17" r="1" fill={color} />
    <Circle cx="7" cy="13" r="1" fill={color} />
  </Svg>
);

export default CalendarIcon2;