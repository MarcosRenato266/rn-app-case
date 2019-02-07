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
  StatusBar,
} from 'react-native';
import { withApollo } from 'react-apollo';
import { RNCamera } from 'react-native-camera';
import { ReactNativeFile } from 'apollo-upload-client';
import { Icon } from 'native-base';
import Modal from 'react-native-modal';
import { withNavigation } from 'react-navigation';
import { BallIndicator } from 'react-native-indicators';
import _ from 'lodash';
import { PHOTO_DOCUMENTS_UPLOAD } from '../graphql/mutations';
// import { iphoneX } from '../utils/IphoneX';
import Button from '../components/Button';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

class AndroidPhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      introduction: true,
      flashOn: false,
      visibleModal: true,
      graphQLError: false,
      photos: [],
    };
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => {
    const { graphQLError, introduction, loading } = this.state;
    if (!graphQLError && introduction) {
      return (
        <View style={styles.mainContainer}>
          <View style={{ alignSelf: 'flex-end', flex: 0, marginTop: 10 }}>
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
          <View style={{ flex: 0 }}>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/id.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.titleText}>Fotografia de documentos</Text>
            <Text style={styles.infoText}>
              Precisamos que fotografe Assinatura, Identidade, CPF e Comprovante
              de endereço. Favor notar que seu comprovante de residência. deve
              ter no máximo 3 meses. Certifique-se de ter uma boa iluminação e
              nitidez.
            </Text>
          </View>
          {this.renderButton('Continuar', () =>
            this.setState({ visibleModal: null, introduction: false })
          )}
        </View>
      );
    } else if (graphQLError) {
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
    } else if (loading) {
      return <BallIndicator color={colors.primary} style={{ height: 50 }} />;
    }
  };

  render() {
    console.log('PHOTOS', this.state.photos);
    const android = Platform.OS === 'android';
    const iphone = Platform.OS === 'ios';
    const { flashOn } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Modal
          isVisible={this.state.visibleModal}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          {this.renderModalContent()}
        </Modal>
        <RNCamera
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
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        {iphone && (
          <View style={styles.box}>
            <View style={styles.boxContainer}>
              <Button
                style={styles.backButton}
                iconButton
                primary
                onPress={() => {
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
                style={styles.flashButton}
                iconButton
                onPress={() => {
                  this.setState({
                    flashOn: this.state.flashOn,
                  });
                }}
              >
                <Icon
                  type="FontAwesome"
                  name="bolt"
                  color={colors.button_text}
                />
              </Button>
            </View>
          </View>
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
          </View>
        )}
      </View>
    );
  }

  takePicture = async function() {
    this.setState({ loading: true, visibleModal: true });
    if (this.camera) {
      const { photos } = this.state;
      const options = { quality: 0.5, base64: true };
      console.log(Object.keys(photos).length);
      if (Object.keys(photos).length < 4) {
        await this.camera
          .takePictureAsync(options)
          .then(data => {
            console.log(data);
            this.setState({
              loading: false,
              visibleModal: false,
              photos: { ...photos, [data.uri]: data },
            });
            //   this.props.navigation.navigate('UploadDocAnalysis', {
            //     uri: data.uri,
            //     type: 'residence',
            //     navigationRoute: 'ConfirmData',
            //     header: 'Assinatura',
            //     // navigationRoute: 'ConfirmData',
            //   });
          })
          .catch(error => {
            this.setState({
              saving: false,
            });
            console.log('Deu erro aqui', error);
          });
      } else {
        const { client } = this.props;
        const photoUri = _.keys(photos);
        console.log(photoUri);

        photoUri.map(uri => {
          const image = new ReactNativeFile({
            uri,
            name: 'a.jpg',
            type: 'image/jpeg',
          });
          client
            .mutate({
              mutation: PHOTO_DOCUMENTS_UPLOAD,
              variables: {
                input: {
                  image,
                  type: 'cpf',
                },
              },
            })
            .then(() => {
              this.setState({ loading: false, visibleModal: false });
              this.props.navigation.navigate('ConfirmData');
            })
            .catch(error => {
              this.setState({ loading: false });
              console.log('Error:...', error.message);
            });
        });

        // this.props.navigation.navigate('UploadDocAnalysis', {
        //   // uri: data.uri,
        //   photos,
        //   type: 'residence',
        //   navigationRoute: 'ConfirmData',
        //   header: 'Assinatura',
        //   // navigationRoute: 'ConfirmData',
        // });
        // return this.props.navigation.navigate('ConfirmData')
      }
    }
  };
}

export default withApollo(withNavigation(AndroidPhotoUpload));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
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
    // alignSelf: 'center',
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
    backgroundColor: '#fff',
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
});

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Platform,
// } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { moderateScale } from '../config/scaling';
// import { Icon, } from 'native-base';
// import colors from '../config/colors';
// import Modal from 'react-native-modal';
// import Button from '../components/Button';

// export default class SignatureScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       saving: false,
//       flashOn: false,
//     };
//   }

//   saveButton() {
//     return (
//       <View style={styles.box}>
//         <View style={styles.boxContainer}>
//           <Button
//             style={styles.backButton}
//             iconButton
//             primary
//             onPress={() => {
//               this.takePicture.bind(this);
//             }}
//           >
//             <Icon type="FontAwesome" name="camera" color={colors.button_text} />
//           </Button>
//           <Button
//             style={styles.flashButton}
//             iconButton
//             onPress={() => {
//               this.setState({
//                 flashOn: this.state.flashOn ? false : true,
//               });
//             }}
//           >
//             <Icon type="FontAwesome" name="bolt" color={colors.button_text} />
//           </Button>
//         </View>
//       </View>
//     );
//   }

//   render() {
//     const android = Platform.OS === 'android';
//     const iphone = Platform.OS === 'ios';
//     const { flashOn } = this.state;
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={
//             iphone
//               ? flashOn
//                 ? RNCamera.Constants.FlashMode.on
//                 : RNCamera.Constants.FlashMode.off
//               : RNCamera.Constants.FlashMode.on
//           }
//           permissionDialogTitle={'Permission to use camera'}
//           permissionDialogMessage={
//             'We need your permission to use your camera phone'
//           }
//           onGoogleVisionBarcodesDetected={({ barcodes }) => {
//             console.log(barcodes);
//           }}
//         />
//         {iphone && (
//           <View style={styles.box}>
//             <View style={styles.boxContainer}>
//               <Button
//                 style={styles.backButton}
//                 iconButton
//                 primary
//                 onPress={() => {
//                   this.takePicture();
//                 }}
//               >
//                 <Icon
//                   type="FontAwesome"
//                   name="camera"
//                   color={colors.button_text}
//                 />
//               </Button>
//               <Button
//                 style={styles.flashButton}
//                 iconButton
//                 onPress={() => {
//                   this.setState({
//                     flashOn: this.state.flashOn ? false : true,
//                   });
//                 }}
//               >
//                 <Icon
//                   type="FontAwesome"
//                   name="bolt"
//                   color={colors.button_text}
//                 />
//               </Button>
//             </View>
//           </View>
//         )}
//         {android && (
//           <View
//             style={{
//               flex: 0,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               backgroundColor: 'rgba(52, 52, 52, 0.8)',
//             }}
//           >
//             <TouchableOpacity
//               style={styles.backButtonAndroid}
//               onPress={this.takePicture.bind(this)}
//             >
//               <Icon
//                 type="FontAwesome"
//                 name="camera"
//                 style={{ color: '#fff' }}
//               />
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   }

//   takePicture = async function() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       await this.camera
//         .takePictureAsync(options)
//         .then(data => {
//           console.log('DATA....', data.uri);
//           this.props.navigation.navigate('UploadDocAnalysis', {
//             uri: data.uri,
//             type: 'signature',
//             // navigationRoute: confirmChecked ? 'RgPicture' : 'CpfPicture',
//             navigationRoute: 'CpfPicture',

//           });
//         })
//         .catch(error => {
//           this.setState({
//             saving: false,
//           });
//           console.log('Deu erro aqui', error);
//         });
//     }
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     // justifyContent: 'flex-end',
//     // alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
//   backButtonAndroid: {
//     flex: 0,
//     backgroundColor: colors.primary,
//     borderRadius: 300,
//     alignSelf: 'center',
//     margin: 20,
//     padding: 15,
//     paddingHorizontal: 20,
//   },
//   box: {
//     height: Dimensions.get('window').height / 8,
//     width: Dimensions.get('window').width,
//     backgroundColor: 'rgba(52, 52, 52, 0.8)',
//   },
//   boxContainer: {
//     width: Dimensions.get('window').width / 1.5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     alignSelf: 'flex-end',
//     marginVertical: Dimensions.get('window').height / 8 / 8,
//   },
//   backButton: {
//     borderRadius: 28,
//     height: moderateScale(56),
//     width: moderateScale(56),
//     // alignSelf: 'center',
//   },
//   flashButton: {
//     borderRadius: 28,
//     height: moderateScale(56),
//     width: moderateScale(56),
//     backgroundColor: 'rgba(52, 52, 52, 0.8)',
//   },
// });
