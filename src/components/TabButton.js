import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const IS_IOS = Platform.OS === 'ios';

const TabButton = props => {
  if (IS_IOS) {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  }
  return (
    <TouchableNativeFeedback
      delayPressIn={0}
      background={TouchableNativeFeedback.SelectableBackground()}
      {...props}
    >
      {props.children}
    </TouchableNativeFeedback>
  );
};

export default TabButton;
