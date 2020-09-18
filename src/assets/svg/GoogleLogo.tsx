import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const GoogleLogo = (props: any) => (
  <Svg width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        d="M19.844 10.433H19.2V10.4H12v3.2h4.522A4.8 4.8 0 0 1 12 16.8 4.8 4.8 0 0 1 7.2 12 4.8 4.8 0 0 1 12 7.2a4.77 4.77 0 0 1 3.184 1.216l2.263-2.263A7.962 7.962 0 0 0 12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 7.844-9.567z"
        fill="#FBBC05"
      />
      <Path
        d="M4.922 8.277l2.63 1.928A4.797 4.797 0 0 1 12 7.2a4.77 4.77 0 0 1 3.184 1.216l2.263-2.263A7.962 7.962 0 0 0 12 4a7.995 7.995 0 0 0-7.078 4.277z"
        fill="#EA4335"
      />
      <Path
        d="M12 20c2.066 0 3.944-.79 5.364-2.077l-2.476-2.095A4.767 4.767 0 0 1 12 16.8a4.796 4.796 0 0 1-4.512-3.178l-2.61 2.01A7.993 7.993 0 0 0 12 20z"
        fill="#34A853"
      />
      <Path
        d="M19.844 10.433H19.2V10.4H12v3.2h4.522a4.822 4.822 0 0 1-1.636 2.228h.002l2.476 2.095C17.19 18.081 20 16 20 12a7.98 7.98 0 0 0-.156-1.567z"
        fill="#4285F4"
      />
    </G>
  </Svg>
);

export default GoogleLogo;
