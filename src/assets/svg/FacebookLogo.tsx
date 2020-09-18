import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const FacebookLogo = (props: any) => (
  <Svg width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        d="M13.394 20v-7.288h2.45l.376-2.853h-2.826V8.043c0-.824.23-1.386 1.411-1.386h1.496V4.113A19.699 19.699 0 0 0 14.108 4c-2.171 0-3.658 1.32-3.658 3.76v2.1H8v2.852h2.45V20h2.944z"
        fill={'#4267B2'}
      />
    </G>
  </Svg>
);

export default FacebookLogo;
