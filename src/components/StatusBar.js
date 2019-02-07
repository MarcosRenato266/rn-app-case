import React from 'react';
import { StatusBar } from 'react-native';
import { getStatusBarHeight } from '../config/statusBar';

export default ({ backgroundColor, ...props }) => {
  return (
    <StatusBar barStyle="light-content" backgroundColor="white" {...props} />
  );
};

export function getHeight() {
  return getStatusBarHeight();
}
