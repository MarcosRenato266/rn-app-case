import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';

export default class PhotoCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    lastScannedCode: null,
    cameraSize: {
      width: 0,
      height: 0,
    },
    cameraReady: false,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { onCameraPermissionChange } = this.props;
    const status = await Permissions.request('camera');
    this.setState({ hasCameraPermission: status === 'authorized' });
    onCameraPermissionChange && onCameraPermissionChange(status);
  };

  _handleOnLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      cameraSize: { width, height },
      cameraReady: width !== 0 && height !== 0,
    });
    this.props.onCameraIsReady && this.props.onCameraIsReady();
  };

  render() {
    const { style, showPermissionError, cameraFlashMode } = this.props;
    const { cameraSize } = this.state;

    return (
      <View style={[styles.container, style]}>
        {this.state.hasCameraPermission === false ? (
          <View>
            {showPermissionError && (
              <Text style={{ color: '#fff' }}>
                Camera permission is not granted
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.scannerContainer} onLayout={this._handleOnLayout}>
            {this.state.cameraReady && (
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={cameraFlashMode || RNCamera.Constants.FlashMode.off}
                style={[
                  styles.scanner,
                  {
                    width: cameraSize.width,
                    height: cameraSize.height,
                  },
                ]}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scannerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    position: 'absolute',
  },
});
