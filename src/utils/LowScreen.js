import { Platform, Dimensions } from 'react-native';

// const LowScreen = () => {
//   if (
//     Platform.OS === 'ios' &&
//     Dimensions.get('window').width <= 320 &&
//     Dimensions.get('window') <= 568
//   ) {
//     return true;
//   } else if (
//     Platform.OS === 'android' &&
//     Dimensions.get('window').width <= 480 &&
//     Dimensions.get('window') <= 720
//   ) {
//     return true;
//   }
// };

const LowScreen =
  (Platform.OS === 'ios' || Platform.OS === 'android') &&
  Dimensions.get('window').width <= 320 &&
  Dimensions.get('window').height <= 568;

export { LowScreen };
