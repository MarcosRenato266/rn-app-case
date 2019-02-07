import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'native-base';
import colors from '../config/colors';

import FacebookLoginButtonWrapper from './FacebookLoginButtonWrapper';

export default ({ style }) => (
  <View style={[styles.buttonsContainer, style]}>
    <FacebookLoginButtonWrapper>
      <Button bordered style={styles.socialButton}>
        <Icon
          style={styles.socialButtonIcon}
          type="FontAwesome"
          name="facebook-official"
        />
      </Button>
    </FacebookLoginButtonWrapper>
  </View>
);

const styles = StyleSheet.create({
  buttonsContainer: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 10,
    height: 70,
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderRadius: 7,
    justifyContent: 'center',
  },
  socialButtonIcon: {
    fontSize: 36,
    color: colors.secondary_text,
  },
});
