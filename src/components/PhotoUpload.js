import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'native-base';
import Modal from 'react-native-modalbox';
import { withNavigation } from 'react-navigation';
import { BallIndicator } from 'react-native-indicators';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';
import Button from './Button';

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      flashOn: false,
      visibleModal: true,
      graphQLError: false,
      photos: [],
      flashBackgroundColor: '',
      data: '',
      loading: false,
    };
  }

  componentWillMount() {
    let visibleModal = this.props.modalStatus;
    this.setState({ visibleModal, loading: true });
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => {
    const { modalTitle, modalInfo, modalInfoTwo } = this.props;
    const { graphQLError } = this.state;
    if (!graphQLError) {
      return (
        <View style={styles.mainContainer}>
          <View style={{ alignSelf: 'flex-end', flex: 0, marginTop: 10 }}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ visibleModal: false })}
            >
              <Icon
                type="FontAwesome"
                name="close"
                color={colors.primary}
                style={{ color: colors.primary }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 0 }}>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/id.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.titleText}>{modalTitle}</Text>
            <Text style={styles.infoText}>{modalInfo}</Text>
            <Text style={styles.infoText}>{modalInfoTwo}</Text>
          </View>
          {this.renderButton('Continuar', () =>
            this.setState({ visibleModal: false })
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.mainContainer}>
          <View style={{ alignSelf: 'flex-end', flex: 1, marginTop: 10 }}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ visibleModal: null })}
            >
              <Icon
                type="FontAwesome"
                name="close"
                color={colors.primary}
                style={{ color: colors.primary }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 4 }}>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/wrong.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.titleText}>Ops! Algo deu errado :(</Text>
            <Text style={styles.infoText}>
              Experimente posicionar o documento em um local mais iluminado. Se
              o error persistir favor entrar em contato com nosso Suporte!
            </Text>
          </View>
        </View>
      );
    }
  };

  render() {
    const android = Platform.OS === 'android';
    const iphone = Platform.OS === 'ios';
    const { flashOn, saving } = this.state;
    if (saving) {
      return (
        <View style={styles.savingStyle}>
          <BallIndicator color={colors.primary} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Modal isOpen={this.state.visibleModal} ref={'modal1'}>
            {this.renderModalContent()}
          </Modal>
          <RNCamera
            onCameraReady={() => this.setState({ loading: false })}
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={
              iphone
                ? flashOn
                  ? RNCamera.Constants.FlashMode.on
                  : RNCamera.Constants.FlashMode.off
                : RNCamera.Constants.FlashMode.on
            }
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={
              'We need your permission to use your camera phone'
            }
          />
          {iphone && (
            <View style={styles.box}>
              {/* <View style={styles.boxContainer}> */}
              {this.state.loading ? (
                <BallIndicator color={colors.primary} />
              ) : (
                <View style={styles.box}>
                  <View style={styles.boxContainer}>
                    <Button
                      style={styles.backButton}
                      iconButton
                      primary
                      onPress={() => {
                        this.setState({ loading: true });
                        this.takePicture();
                      }}
                    >
                      <Icon
                        type="FontAwesome"
                        name="camera"
                        color={colors.button_text}
                      />
                    </Button>
                    <Button
                      style={{
                        borderRadius: 28,
                        height: moderateScale(56),
                        width: moderateScale(56),
                        backgroundColor: this.state.flashOn
                          ? '#fff'
                          : 'rgba(52, 52, 52, 0.8)',
                      }}
                      iconButton
                      onPress={() => {
                        this.setState({
                          flashOn: !this.state.flashOn,
                        });
                      }}
                    >
                      <Icon
                        type="FontAwesome"
                        name="bolt"
                        color={'black'}
                        style={{ color: this.state.flashOn ? '#000' : '#fff' }}
                      />
                    </Button>
                  </View>
                </View>
              )}
            </View>
            // </View>
          )}
          {android && (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
              }}
            >
              {this.state.loading ? (
                <BallIndicator color={colors.primary} />
              ) : (
                <TouchableOpacity
                  style={styles.backButtonAndroid}
                  onPress={this.takePicture.bind(this)}
                >
                  <Icon
                    type="FontAwesome"
                    name="camera"
                    style={{ color: '#fff' }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      );
    }
  }

  takePicture = async function() {
    const clientId = this.props.clientId;
    const { type, navigationRoute, header, backRoute } = this.props;
    const options = {
      quality: 0.5,
      base64: true,
      fixOrientation: true,
      forceUpOrientation: true,
    };

    if (this.camera) {
      await this.camera
        .takePictureAsync(options)
        .then(data => {
          this.setState({ loading: false });
          this.props.navigation.navigate('UploadDocAnalysis', {
            uri: data.uri,
            photo: data.base64,
            type,
            navigationRoute,
            header,
            clientId,
            backRoute,
          });
        })
        .catch(error => {
          this.setState({
            loading: false,
          });
          console.log('Deu erro aqui', error);
        });
    }
  };
}
export default withNavigation(PhotoUpload);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  backButtonAndroid: {
    flex: 0,
    backgroundColor: colors.primary,
    borderRadius: 300,
    alignSelf: 'center',
    margin: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  box: {
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  boxContainer: {
    width: Dimensions.get('window').width / 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    marginVertical: Dimensions.get('window').height / 8 / 8,
  },
  backButton: {
    borderRadius: 28,
    height: moderateScale(56),
    width: moderateScale(56),
  },
  flashButton: {
    borderRadius: 28,
    height: moderateScale(56),
    width: moderateScale(56),
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  button: {
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    color: 'white',
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalWarning: {
    padding: 30,
    fontSize: 18,
    color: colors.secondary,
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1.0,
    backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  shield: {
    width: 160,
    height: 160,
  },
  titleText: {
    fontSize: moderateScale(25),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Medium',
    padding: 15,
  },
  infoText: {
    fontSize: moderateScale(17),
    paddingVertical: moderateScale(15),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
  },
  savingStyle: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
