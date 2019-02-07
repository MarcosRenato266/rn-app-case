import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import WelcomeScreenSwiper from '../components/WelcomeScreenSwiper';
import { iphoneX } from '../utils/IphoneX';

export default class SelectAssociateScreen extends React.Component {
  render() {
    return (
      <View style={styles.registerContainers}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.swiper}>
          <WelcomeScreenSwiper
            clientId={this.props.navigation.getParam('clientId')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    flex: iphoneX ? 0.9 : 1,
    paddingVertical: iphoneX ? 50 : 10,
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingVertical: moderateScale(10),
  },
  proceedButton: {
    justifyContent: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  proceedButtonText: {
    color: colors.button_text,
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignSelf: 'center',
  },
  registerContainers: {
    flex: 1,
    backgroundColor: '#fff',
  },
  registerContainerText: {
    color: colors.secondary_text,
  },
  textButton: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
