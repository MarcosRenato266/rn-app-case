import { AsyncStorage } from 'react-native';

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key.toUpperCase(), value);
    return { err: null, success: true };
  } catch (err) {
    return { err, success: false };
  }
};

export const _getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key.toUpperCase());
    return { err: null, value };
  } catch (err) {
    return { err, value: null };
  }
};
