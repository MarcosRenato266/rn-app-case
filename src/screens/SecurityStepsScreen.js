import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import { iphoneX } from '../utils/IphoneX';
import SecurityStepsScreenSwiper from '../components/SecurityStepsScreenSwiper';

export default class SelectAssociateScreen extends React.Component {
  render() {
    return (
      <View style={styles.registerContainers}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.swiper}>
          <SecurityStepsScreenSwiper />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  swiper: {
    flex: iphoneX ? 0.9 : 1,
    paddingVertical: iphoneX ? 50 : 10,
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
