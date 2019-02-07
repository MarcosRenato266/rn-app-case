import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { ReactNativeFile } from 'apollo-upload-client';
import { withApollo } from 'react-apollo';
import { BallIndicator } from 'react-native-indicators';
import Modal from 'react-native-modal';
import { moderateScale } from '../config/scaling';

import { PHOTO_DOCUMENTS_UPLOAD } from '../graphql/mutations';

import { iphoneX } from '../utils/IphoneX';

import colors from '../config/colors';

let uriOfAllPhotos = [];
let typeOfAllPhotos = [];

class UploadDocAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideInfo: false,
      loading: false,
      photoRender: [],
      uriArray: [],
      typeArray: [],
      asyncPromisse: [],
    };
    let uri = this.props.navigation.getParam('uri');
    let type = this.props.navigation.getParam('type');
    this.reRender = this.props.navigation.addListener('willFocus', () => {
      this.setState({
        uriArray: [...this.state.uriArray, uri],
        typeArray: [...this.state.typeArray, type],
      });
    });
  }

  renderModalContent = () => {
    return <BallIndicator color={colors.primary} style={{ height: 50 }} />;
  };

  async server(){
    const { navigation, client } = this.props;
    let navigationRoute = navigation.getParam('navigationRoute');

    await uriOfAllPhotos.forEach((uri, index) => {
      const docType = typeOfAllPhotos[index];
      ImageResizer.createResizedImage(
        uriOfAllPhotos[index],
        1280,
        1920,
        'JPEG',
        60
      )
        .then(({ uri }) => {
          const image = new ReactNativeFile({
            uri: `${uri}`,
            name: 'a.jpg',
            type: 'image/jpeg',
          });
          client
            .mutate({
              mutation: PHOTO_DOCUMENTS_UPLOAD,
              variables: {
                input: {
                  image,
                  type: `${docType}`,
                },
              },
            })
            .then(data => {
              this.setState(
                {
                  asyncPromisse: [...this.state.asyncPromisse, data.data],
                },
                () => {
                  if (
                    this.state.asyncPromisse.length === uriOfAllPhotos.length
                  ) {
                    this.setState({ loading: false });
                    this.props.navigation.navigate(navigationRoute);
                  }
                }
              );
            })
            .catch(error => {
              this.setState({ loading: false });
              console.log('Error:...', error);
              this.props.navigation.navigate(navigationRoute);
            });
        })
        .catch(error => {
          this.setState({ loading: false }),
            console.log('error no resize', error);
        });
    });
  };

  sendImage(uriToPush, typeToPush) {
    let navigationRoute = this.props.navigation.getParam('navigationRoute');
    // const { uriArray } = this.state;
    uriOfAllPhotos.push(uriToPush);
    typeOfAllPhotos.push(typeToPush);

    console.log('links', uriOfAllPhotos);
    console.log('types', typeOfAllPhotos);

    if (navigationRoute === 'DataValidation') {
      this.setState({ loading: true });
      return this.server();
    } else {
      this.props.navigation.navigate(navigationRoute);
    }
  }

  handleHideInfo = () => {
    this.setState({
      hideInfo: !this.state.hideInfo,
    });
  };

  render() {
    const { getParam } = this.props.navigation;
    let uri = getParam('uri');
    let type = getParam('type');
    let header = getParam('header');
    let route = getParam('backRoute');
    return (
      <ImageBackground
        source={{
          uri: `${uri}`,
        }}
        style={style.photo}
      >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Modal
          isVisible={this.state.loading}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          {this.renderModalContent()}
        </Modal>
        <View style={style.container}>
          <View
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              marginVertical: iphoneX ? 40 : 10,
              borderRadius: 20,
            }}
          >
            <TouchableWithoutFeedback>
              <Text style={style.headerPhoto}>{header}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.state.hideInfo ? (
          <View style={style.box2}>
            <Text
              style={{ color: 'white', marginTop: 10 }}
              onPress={this.handleHideInfo}
            >
              Máximizar
            </Text>
            <TouchableWithoutFeedback onPress={() => this.sendImage(uri, type)}>
              <View style={style.button}>
                <Text style={style.modalText}>Enviar Imagem</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate(`${route}`)}
            >
              <Text style={style.analysisText}>Tentar Novamente</Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View style={style.box}>
            <Text
              style={{ color: 'white', marginTop: 10 }}
              onPress={this.handleHideInfo}
            >
              Minimizar
            </Text>
            <Text style={style.analysisImage}>Analise a Imagem</Text>
            <Text style={style.analysisText}>
              Verifique se a fotografia está completamente legível e se a
              iluminação está boa. Se estiver legível para você estará tudo
              certo.
            </Text>
            <TouchableWithoutFeedback onPress={() => this.sendImage(uri, type)}>
              <View style={style.button}>
                <Text style={style.modalText}>Enviar Imagem</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate(`${route}`)}
            >
              <Text style={style.analysisText}>Tentar Novamente</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </ImageBackground>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photo: {
    flex: 1,
  },
  headerPhoto: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Rubik-Light',
    width: Dimensions.get('window').width / 2,
    textAlign: 'center',
    padding: 8,
  },
  box: {
    height: Dimensions.get('window').height / 2.4,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'space-around',
  },
  box2: {
    height: Dimensions.get('window').height / 5.4,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    justifyContent: 'space-around',
  },
  analysisImage: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
    padding: 15,
  },
  analysisText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Rubik-Light',
    paddingHorizontal: moderateScale(10),
    marginBottom: iphoneX ? 30 : 20,
  },
  button: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    color: 'white',
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(16),
  },
  spinner: {
    alignItems: 'center',
    flex: 0.5,
  },
});

export default withApollo(UploadDocAnalysis);
