import {ImageSourcePropType} from 'react-native';

export interface MeditationSession {
  background: ImageSourcePropType;
  music: string;
  duration: number;
}
