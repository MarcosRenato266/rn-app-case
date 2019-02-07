import { Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5, isVertical = false) =>
  size + ((isVertical ? verticalScale(size) : scale(size)) - size) * factor;
