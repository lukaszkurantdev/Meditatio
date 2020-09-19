import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import MandalaLogo from '../assets/svg/MandalaLogo';

interface IProps {
  isSmall?: boolean;
}

const MandalaAnimatedLogo: React.FC<IProps> = ({isSmall}) => {
  const [value] = useState(new Animated.Value(0));

  const rotate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View style={{transform: [{scale}, {rotate}]}}>
      <MandalaLogo isSmall={isSmall} />
    </Animated.View>
  );
};

export default MandalaAnimatedLogo;
