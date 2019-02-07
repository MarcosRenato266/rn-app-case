import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modalbox';
import Checkbox from 'react-native-custom-checkbox';
import Button from './Button';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import { iPhoneX } from '../utils/IphoneX';

class WelcomeScreenSwiper extends Component {
  state = {
    visibleModal: null,
    confirmChecked: false,
  };

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  openModal() {
    this.setState({ visibleModal: true });
  }

  navigateScreen = () => {
    this.props.navigation.navigate('SignaturePicture', {
      confirmChecked: this.state.confirmChecked,
      clientId: this.props.clientId,
    });
  };

  setConfirmationChecked = checked => {
    this.setState({ confirmChecked: checked });
  };

  toggleConfirmationChecked = () => {
    this.setState(state => ({ confirmChecked: !state.confirmChecked }));
  };

  renderModalContent = () => (
    <View style={styles.mainContainer}>
      <View style={{ alignSelf: 'flex-end', flex: 1, marginTop: 10 }}>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ visibleModal: false })}
        >
          <Icon
            type="FontAwesome"
            name="close"
            r
            color={colors.primary}
            style={{ color: colors.primary }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/i/id.png')} style={styles.shield} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.infoTextNoPadding}>
            Primeiro precisamos que você nos envie uma foto de um documento de
            identificação, de um comprovante de residência e de sua assinatura.
          </Text>
          <Text style={styles.infoText}>
            Tenha seus documentos em mãos para a Próxima etapa.
          </Text>

          <Checkbox
            style={styles.checkbox}
            onChange={(name, checked) => this.setConfirmationChecked(checked)}
            checked={this.state.confirmChecked}
          />
          <TouchableOpacity onPress={this.toggleConfirmationChecked}>
            <Text style={styles.modalWarning}>
              Marque a caixa acima se seu documento tiver seu número de CPF
            </Text>
          </TouchableOpacity>
          {this.renderButton('Continuar', () => this.navigateScreen())}
        </View>
      </View>
    </View>
  );

  toogleModal() {
    this.setState({ visibleModal: true });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(20),
          backgroundColor: '#fff',
        }}
      >
        <Modal isOpen={this.state.visibleModal} ref={'modal1'}>
          {this.renderModalContent()}
        </Modal>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Bem-vindo à FIDUC</Text>
        </View>
        <View style={{ flex: 4 }}>
          <Swiper
            style={styles.wrapper}
            height="100%"
            showsPagination
            loop={false}
            activeDotColor={colors.primary}
            ref={swiper => (this._swiper = swiper)}
          >
            <View>
              <Text style={styles.question}>
                Gestão de patrimônio e planejamento financeiro pessoal.
              </Text>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            <View>
              <Text style={styles.question}>
                Vamos realizar seu Cadastro agora. Siga atentamente as
                instruções e caso tenha dúvidas fale com seu Sócio.
              </Text>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this.openModal()}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Cadastrar-se Agora
                </Text>
              </Button>
            </View>
          </Swiper>
        </View>
      </View>
    );
  }
}

export default withNavigation(WelcomeScreenSwiper);

const styles = StyleSheet.create({
  logoContainer: {
    height: moderateScale(150),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(8),
  },
  proceedButton: {
    justifyContent: 'center',
    marginTop: moderateScale(50),
    alignSelf: 'center',
    width: '65%',
  },
  proceedButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  buttonText: {
    fontSize: 50,
    color: colors.primary,
    fontFamily: 'Arial',
  },
  slide: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: moderateScale(20),
  },
  slideTitle: {
    flex: 0.5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: moderateScale(22),
    fontFamily: 'Rubik-Light',
    marginTop: 30,
    marginBottom: moderateScale(6),
    textAlign: 'center',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(17),
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
    marginTop: moderateScale(15),
  },
  pagination: {
    marginBottom: moderateScale(150),
  },
  backButton: {
    fontFamily: 'Rubik-Light',
    color: colors.text,
    marginTop: moderateScale(20),
  },
  slideOptions: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    color: 'white',
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  modalWarning: {
    marginHorizontal: 2,
    padding: 20,
    fontSize: 14,
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
  },
  modalWarningSub: {
    marginBottom: 30,
    fontSize: 18,
    color: colors.secondary,
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
  },
  confirmWrapper: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    backgroundColor: '#ccc',
    color: '#a18037',
    borderColor: 'transparent',
  },
  confirmText: {
    marginLeft: moderateScale(15),
  },
  mainContainer: {
    flex: iPhoneX ? 1 : 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  shield: {
    width: 150,
    height: 150,
  },
  titleText: {
    fontSize: moderateScale(25),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Medium',
  },
  infoTextNoPadding: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
  },
  infoText: {
    fontSize: moderateScale(15),
    paddingTop: moderateScale(7),
    paddingBottom: moderateScale(15),
    textAlign: 'center',
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
    fontWeight: 'bold',
  },
  question: {
    color: colors.secondary_text,
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-light',
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(24),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
});
