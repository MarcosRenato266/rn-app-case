import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Text, Icon } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

const IS_IOS = Platform.OS === 'ios';

class TaskCard extends React.Component {
  static defaultProps = {
    showIcon: true,
    showCoins: true,
  };

  get buttonComponent() {
    return IS_IOS ? TouchableOpacity : TouchableNativeFeedback;
  }

  handleOnPress = () => {
    const { id, onPress } = this.props;
    onPress && onPress(id);
  };

  render() {
    //const { style, bonus, icon, title, coins } = this.props;
    const {
      style,
      bonus,
      title,
      coins,
      scope,
      subTitle,
      showIcon,
      showCoins,
      cardBellowWidth,
    } = this.props;

    const backgroundColor = bonus ? colors.primary : colors.cardBackground;
    const textColor = bonus ? colors.darkText : colors.text;
    const subColor = bonus ? colors.darkText : colors.secondary_text;
    const plusTextColor = bonus ? colors.text : colors.primary;
    const iconBgColor = bonus ? colors.white02 : colors.primary;
    const rippleColor = bonus ? colors.white02 : colors.primary;

    const subTitleText = subTitle || (bonus ? 'Bônus' : 'Desafio');

    let iconName = 'qrcode';
    switch (scope) {
      case 'qrcode':
        iconName = 'qrcode';
        break;
      case 'facebook':
        iconName = 'facebook-f';
        break;
      case 'facebookShare':
        iconName = 'facebook-f';
        break;
      case 'instagram':
        iconName = 'instagram';
        break;
    }

    const ButtonComponent = this.buttonComponent;
    return (
      <View style={[styles.container, style]}>
        <ButtonComponent
          background={
            IS_IOS ? null : TouchableNativeFeedback.Ripple(rippleColor)
          }
          activeOpacity={0.5}
          onPress={this.handleOnPress}
        >
          <View
            style={[styles.card, { backgroundColor }]}
            pointerEvents="box-only"
          >
            <View style={styles.cardColorBar} />
            <View style={styles.content}>
              {showIcon && (
                <View
                  style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}
                >
                  <Icon
                    style={styles.icon}
                    type="FontAwesome"
                    name={iconName}
                  />
                </View>
              )}
              <View style={styles.titleWrapper}>
                <Text style={[styles.subTitleText, { color: subColor }]}>
                  {subTitleText}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.titleText, { color: textColor }]}
                >
                  {title}
                </Text>
              </View>
              {showCoins && (
                <View style={styles.coinsWrapper}>
                  <Text
                    style={[styles.coinsPlusText, { color: plusTextColor }]}
                  >
                    +
                  </Text>
                  <Text style={[styles.coinsValueText, { color: textColor }]}>
                    {coins}
                  </Text>
                  <Text style={styles.coinsNameText}>Pontos</Text>
                </View>
              )}
            </View>
          </View>
        </ButtonComponent>
        {!bonus && (
          <View
            style={[
              styles.cardBellow,
              cardBellowWidth && { width: cardBellowWidth },
            ]}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    minHeight: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardColorBar: {
    backgroundColor: colors.primary,
    width: 6,
    height: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  iconWrapper: {
    backgroundColor: colors.primary,
    marginLeft: 8,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.secondaryCardBackground,
  },
  titleWrapper: {
    marginLeft: 8,
    flex: 1,
    justifyContent: 'center',
  },
  subTitleText: {
    color: colors.secondary_text,
    fontSize: moderateScale(10),
  },
  titleText: {
    color: colors.text,
    fontSize: moderateScale(12),
    fontFamily: 'MontserratBold',
    flexWrap: 'wrap',
  },
  coinsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 15,
  },
  coinsPlusText: {
    color: colors.primary,
    fontSize: moderateScale(20),
  },
  coinsValueText: {
    color: colors.text,
    fontSize: moderateScale(20),
    fontFamily: 'MontserratBold',
  },
  coinsNameText: {
    color: colors.secondary_text,
    fontSize: moderateScale(11),
    paddingLeft: 2,
  },
  cardBellow: {
    backgroundColor: colors.secondaryCardBackground,
    height: moderateScale(5, 0.5, true),
    width: '95%',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default TaskCard;
