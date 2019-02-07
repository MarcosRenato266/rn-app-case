import React from 'react';
import { StyleSheet, ImageBackground, ScrollView, View } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import UserProfileHeading from './UserProfileHeading';

export default props => (
  <ScrollView style={styles.container}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <ImageBackground
        style={{ width: undefined, height: undefined }}
        source={
          require('../assets/i/login_cover.jpg') /* TODO: change bg image */
        }
      >
        <View style={styles.bgTint} />
        <UserProfileHeading style={styles.userProfileHeading} />
      </ImageBackground>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

export const contentOptions = {
  inactiveTintColor: colors.secondary_text,
  activeTintColor: colors.text,
  itemStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: colors.divider,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  userProfileHeading: {
    marginVertical: moderateScale(35, 0.5, true),
    marginLeft: moderateScale(10),
  },
  bgTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
