import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Text,
} from 'react-native';

import { Input } from 'native-base';
import { MaskService } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import { focusTextInput } from '../utils';
import colors from '../config/colors';

import { moderateScale } from '../config/scaling';

const IS_IOS = Platform.OS === 'ios';

export default class EditInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: new Animated.Value(false),
      value: props.initialValue || '',
    };
  }

  handleOnChangeText = text => {
    const { maskType, maskOptions } = this.props;
    const value = maskType
      ? MaskService.toMask(maskType, text, maskOptions)
      : text;
    this.setState({ value });

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
      containerStyle,
      error,
      isDate,
      desc,
      ...props
    } = this.props;
    const { isActive, value } = this.state;

    const borderColor = error
      ? colors.error
      : isActive.interpolate({
          inputRange: [false, true],
          outputRange: [colors.border, colors.primary],
        });

    return (
      <Animated.View style={[styles.formItem, containerStyle, { borderColor }]}>
        <TouchableWithoutFeedback onPress={this.handleOnPress}>
          <View style={styles.inputWrapper}>
            {desc != null ? <Text style={styles.descText}>{desc}</Text> : null}
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
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
                {...props}
              />
            )}
            {!isDate && (
              <Input
                ref={node => {
                  this.textInput = node;
                }}
                {...props}
                placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
                style={[
                  styles.formInput,
                  {
                    marginLeft: iconName && 6,
                  },
                ]}
                onChangeText={this.handleOnChangeText}
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
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'solid',
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  inputWrapper: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    flexDirection: 'row',
  },
  inactiveUnderline: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  underline: {
    position: 'relative',
    top: -2,
    height: 2,
    width: '50%',
  },
  formInput: {
    color: colors.text,
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
    color: 'rgba(255, 255, 255, 0.2)',
  },
  whiteText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  descText: {
    color: colors.secondary_text,
    fontSize: moderateScale(12),
    fontFamily: 'MontserratBold',
  },
});
