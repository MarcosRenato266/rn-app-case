import React from 'react';
import { WebView } from 'react-native';

export default class WebViewToolsScreen extends React.Component {
  render() {
    return (
      <WebView
        source={{
          uri:
            'http://fiduc-tools-webapp.s3-website-sa-east-1.amazonaws.com/aposentadoria/',
        }}
      />
    );
  }
}
