import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { moderateScale } from '../config/scaling';

export default ({ image, children }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.stretch} source={image} />
    </View>
    <View style={styles.contentContainer}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    width: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: moderateScale(8),
    paddingBottom: moderateScale(40),
  },
});
