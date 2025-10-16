import React from 'react';
import { IconProps } from './types';

// Common Icons
import { CheckIcon } from './common/CheckIcon';
import { CloseIcon } from './common/CloseIcon';
import { ArrowRightIcon } from './common/ArrowRightIcon';
import { AlertIcon } from './common/AlertIcon';
import { InfoIcon } from './common/InfoIcon';
import { SearchIcon } from './common/SearchIcon';
import { BellIcon } from './common/BellIcon';
import { MoreIcon } from './common/MoreIcon';

// Medical Icons
import { PillIcon } from './medical/PillIcon';
import { SyringeIcon } from './medical/SyringeIcon';
import { StethoscopeIcon } from './medical/StethoscopeIcon';
import { BandageIcon } from './medical/BandageIcon';
import { FirstAidIcon } from './medical/FirstAidIcon';
import { HeartRateIcon } from './medical/HeartRateIcon';

// Additional Medical Icons
import { 
  SyringeIcon as MedicalSyringeIcon,
  BookIcon as MedicalBookIcon,
  VideoIcon,
  CheckIcon as MedicalCheckIcon,
  AlertIcon as MedicalAlertIcon,
  ChevronRightIcon
} from './medical/MedicalIcons';

// Navigation Icons
import { HomeIcon } from './navigation/HomeIcon';
import { ClipboardIcon } from './navigation/ClipboardIcon';
import { BookIcon } from './navigation/BookIcon';
import { SettingsIcon } from './navigation/SettingsIcon';

// Status Icons
import { SuccessIcon } from './status/SuccessIcon';
import { WarningIcon } from './status/WarningIcon';
import { ErrorIcon } from './status/ErrorIcon';
import { PendingIcon } from './status/PendingIcon';
import { ShieldIcon } from './status/ShieldIcon';

// Emergency Icons
import { 
  AmbulanceIcon,
  HeartIcon,
  PhoneIcon,
  HospitalIcon,
  AlertTriangleIcon,
  ShieldIcon as EmergencyShieldIcon
} from './emergency';

// Icon Registry
export const Icons = {
  // Common
  check: CheckIcon,
  close: CloseIcon,
  arrowRight: ArrowRightIcon,
  alert: AlertIcon,
  info: InfoIcon,
  search: SearchIcon,
  bell: BellIcon,
  more: MoreIcon,
  
  // Medical
  pill: PillIcon,
  syringe: SyringeIcon,
  stethoscope: StethoscopeIcon,
  bandage: BandageIcon,
  firstAid: FirstAidIcon,
  heartRate: HeartRateIcon,
  
  // Additional Medical Icons
  medicalSyringe: MedicalSyringeIcon,
  medicalBook: MedicalBookIcon,
  video: VideoIcon,
  medicalCheck: MedicalCheckIcon,
  medicalAlert: MedicalAlertIcon,
  chevronRight: ChevronRightIcon,
  
  // Navigation
  home: HomeIcon,
  clipboard: ClipboardIcon,
  book: BookIcon,
  settings: SettingsIcon,
  
  // Status
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  pending: PendingIcon,
  shield: ShieldIcon,
  
  // Emergency
  ambulance: AmbulanceIcon,
  heart: HeartIcon,
  phone: PhoneIcon,
  hospital: HospitalIcon,
  alertTriangle: AlertTriangleIcon,
  emergencyShield: EmergencyShieldIcon,
} as const;

export type IconName = keyof typeof Icons;

// Generic Icon Component
interface IconComponentProps extends IconProps {
  name: IconName;
}

export const Icon: React.FC<IconComponentProps> = ({ 
  name, 
  size = 24, 
  color 
}) => {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }
  
  return <IconComponent size={size} color={color} />;
};

// Export individual icons for direct use
export {
  // Common
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
  AlertIcon,
  InfoIcon,
  SearchIcon,
  BellIcon,
  MoreIcon,
  
  // Medical
  PillIcon,
  SyringeIcon,
  StethoscopeIcon,
  BandageIcon,
  FirstAidIcon,
  HeartRateIcon,
  
  // Additional Medical Icons
  MedicalSyringeIcon,
  MedicalBookIcon,
  VideoIcon,
  MedicalCheckIcon,
  MedicalAlertIcon,
  ChevronRightIcon,
  
  // Navigation
  HomeIcon,
  ClipboardIcon,
  BookIcon,
  SettingsIcon,
  
  // Status
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  PendingIcon,
  ShieldIcon,
  
  // Emergency
  AmbulanceIcon,
  HeartIcon,
  PhoneIcon,
  HospitalIcon,
  AlertTriangleIcon,
  EmergencyShieldIcon,
};