import Reactotron from 'reactotron-react-native';

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

// import {NativeModules} from 'react-native';
// import Reactotron from 'reactotron-react-native';

// let scriptHostname;
// if (__DEV__) {
//     const scriptURL = NativeModules.SourceCode.scriptURL;
//     scriptHostname = scriptURL.split('://')[1].split(':')[0];
// }

// Reactotron
//     .configure({host: scriptHostname})
//     .connect();
