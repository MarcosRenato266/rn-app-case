import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

const IconBadgeValue = ({ iconName, active, iconType, value }) => (
  <View style={[styles.container, !active && styles.notActive]}>
    <Icon style={styles.icon} name={iconName} type={iconType} />
    <View style={styles.valueContainer}>
      <Text style={styles.valueText}>{active && value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  notActive: {
    opacity: 0.5,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: moderateScale(25),
  },
  valueContainer: {
    position: 'relative',
    top: -7,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 17,
  },
  valueText: {
    color: colors.darkText,
    fontSize: moderateScale(10),
  },
});

export default IconBadgeValue;
