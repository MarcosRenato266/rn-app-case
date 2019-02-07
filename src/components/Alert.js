import React from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import Button from './Button';

export default ({ style, message, buttonText, onClose }) => (
  <Animated.View style={[styles.container, style]}>
    <Image
      source={require('../assets/i/whiteAlert.png')}
      style={styles.alertImage}
    />
    <Text style={styles.message}>{message}</Text>
    <View>
      <Button primary style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Button>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: colors.cardBackground,
    padding: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
    transform: [{ translateY: 0 }],
  },
  alertImage: {
    height: moderateScale(110),
    resizeMode: 'contain',
    opacity: 0.4,
  },
  message: {
    color: colors.text,
    fontFamily: 'MontserratBold',
    fontSize: moderateScale(18),
    paddingVertical: moderateScale(20),
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: moderateScale(26),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: colors.darkText,
  },
});
