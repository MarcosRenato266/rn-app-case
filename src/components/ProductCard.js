import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

const IS_IOS = Platform.OS === 'ios';

class ProductCard extends React.Component {
  get buttonComponent() {
    return IS_IOS ? TouchableOpacity : TouchableNativeFeedback;
  }

  handleOnPress = () => {
    const { id, onPress } = this.props;
    onPress && onPress(id);
  };

  render() {
    const { style, name, category, price, available, image } = this.props;
    const rippleColor = colors.primary;
    const ButtonComponent = this.buttonComponent;

    return (
      <View style={[styles.container, style]}>
        <ImageBackground source={image} style={styles.imageBackground}>
          <ButtonComponent
            background={
              IS_IOS ? null : TouchableNativeFeedback.Ripple(rippleColor)
            }
            activeOpacity={0.5}
            onPress={this.handleOnPress}
          >
            <View style={styles.card} pointerEvents="box-only">
              <View style={styles.cardColorBar} />
              <View style={styles.content}>
                <View style={styles.contentShadow} pointerEvents="none">
                  <Image
                    source={require('../assets/i/productShadow.png')}
                    resizeMode="stretch"
                    style={{ width: '100%', height: moderateScale(150) }}
                  />
                </View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.subTitleText}>{category}</Text>
                  <Text numberOfLines={2} style={styles.titleText}>
                    {name}
                  </Text>
                </View>
                <View style={styles.coinsWrapper}>
                  <Text style={styles.coinsValueText}>{price}</Text>
                  <Text style={styles.coinsNameText}>Pontos</Text>
                </View>
                {!available && (
                  <View style={styles.unavailableOverlay} pointerEvents="none">
                    <Text style={styles.unavailableOverlayText}>
                      Indisponível
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ButtonComponent>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    backgroundColor: colors.cardBackground,
  },
  card: {
    flexDirection: 'row',
    minHeight: moderateScale(170),
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
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: moderateScale(10),
  },
  contentShadow: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleWrapper: {
    marginLeft: 8,
    flex: 1,
    justifyContent: 'center',
  },
  subTitleText: {
    color: colors.secondary_text,
    fontSize: moderateScale(11),
  },
  titleText: {
    color: colors.text,
    fontSize: moderateScale(13),
    fontFamily: 'MontserratBold',
    flexWrap: 'wrap',
  },
  coinsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 15,
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
  unavailableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableOverlayText: {
    color: colors.text,
    fontSize: moderateScale(20),
    fontFamily: 'MontserratBold',
  },
});

export default ProductCard;
