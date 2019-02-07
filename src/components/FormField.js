import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'native-base';
import colors from '../config/colors';

export default class FormField extends React.Component {
  renderError = () => {
    const { error } = this.props;
    if (!error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  };

  render() {
    const { containerStyle, children, error } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { error: !!error })
    );

    return (
      <View style={[styles.formField, containerStyle]}>
        {childrenWithProps}
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formField: {
    marginHorizontal: 5,
    paddingHorizontal: 6,
  },
  errorContainer: {
    paddingHorizontal: 10,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    paddingRight: 34,
  },
  errorIcon: {
    color: '#cb2431',
    width: 28,
    marginRight: 8,
  },
  icon: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.2)',
  },
  whiteText: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
});
