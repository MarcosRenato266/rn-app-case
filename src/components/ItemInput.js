import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

import { Icon, Input, Text } from 'native-base';
import { MaskService } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import { focusTextInput } from '../utils';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

const IS_IOS = Platform.OS === 'ios';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: new Animated.Value(false),
      value: props.initialValue,
      sizeFont: 16,
      familyFont: 'Rubik-Light',
    };
  }

  handleFocusInput() {
    this.setState({ focusInput: true });
  }

  handleOnChangeText = text => {
    const { maskType, maskOptions } = this.props;
    const value = maskType
      ? MaskService.toMask(maskType, text, maskOptions)
      : text;

    this.setState({
      value,
    });

    // Chain down
    if (this.props.onChangeText) this.props.onChangeText(value);
  };

  handleOnFocus = () => {
    Animated.timing(this.state.isActive, {
      toValue: true,
      duration: IS_IOS ? 250 : 150,
      easing: Easing.ease,
    }).start();

    // Chain down
    if (this.props.onFocus) this.props.onFocus();
  };

  handleOnBlur = () => {
    Animated.timing(this.state.isActive, {
      toValue: false,
      duration: IS_IOS ? 250 : 150,
      easing: Easing.ease,
    }).start();

    // Chain down
    if (this.props.onBlur) this.props.onBlur();
  };

  handleOnPress = () => {
    if (this.props.isDate) {
      this.dateInput.onPressDate();
    } else {
      focusTextInput(this.textInput);
    }
  };

  render() {
    const {
      iconName,
      overlayText,
      iconType,
      containerStyle,
      error,
      isDate,
      style,
      ...props
    } = this.props;
    const { isActive, value } = this.state;

    const borderColor = error
      ? colors.error
      : isActive.interpolate({
          inputRange: [false, true],
          outputRange: [colors.border, colors.primary],
        });

    const iconColor = error ? colors.error : 'rgba(0, 0, 0, 0.2)';

    return (
      <Animated.View style={[styles.formItem, containerStyle, { borderColor }]}>
        <TouchableWithoutFeedback onPress={this.handleOnPress}>
          <View style={styles.inputWrapper}>
            {iconName && (
              <View style={styles.iconContainer}>
                <Icon
                  name={iconName}
                  type={iconType}
                  style={[styles.icon, { color: iconColor }]}
                />
              </View>
            )}
            {isDate && (
              <DatePicker
                ref={node => {
                  this.dateInput = node;
                }}
                style={[
                  styles.formDateInput,
                  {
                    width: '100%',
                  },
                ]}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    paddingLeft: 12,
                  },
                  dateText: {
                    fontSize: 16,
                    color: 'rgba(255, 255, 255, 0.6)',
                  },
                  placeholderText: {
                    fontSize: 16,
                    color: 'rgba(0, 0, 0, 0.3)',
                  },
                }}
                {...props}
              />
            )}
            {overlayText && (
              <Text style={styles.overlayText}>{overlayText}</Text>
            )}
            {!isDate && (
              <Input
                returnKeyType="next"
                ref={node => {
                  this.textInput = node;
                }}
                {...props}
                placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
                style={[
                  {
                    color: colors.primary,
                    fontSize: this.state.sizeFont,
                    fontFamily: this.state.familyFont,
                  },
                  style,
                  {
                    marginLeft: iconName && 6,
                  },
                ]}
                onChangeText={text => this.handleOnChangeText(text)}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
                value={value}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  formItem: {
    //backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderRadius: 0,
    paddingHorizontal: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveUnderline: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  underline: {
    position: 'relative',
    top: -2,
    height: 2,
    width: '50%',
  },
  formDateInput: {
    marginVertical: 6,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  icon: {
    fontSize: 26,
    color: 'rgba(0, 0, 0, 0.3)',
  },
  whiteText: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    color: colors.text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(14),
  },
});
