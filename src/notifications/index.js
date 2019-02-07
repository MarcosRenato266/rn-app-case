import firebase from 'react-native-firebase';

const getFCMToken = async () => {
  return firebase
    .messaging()
    .getToken()
    .then(res => res)
    .catch(err => err);
};

export default getFCMToken;
