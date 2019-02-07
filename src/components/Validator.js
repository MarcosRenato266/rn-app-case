// import React, { Component } from 'react';
// import { Text } from 'react-native'

// class Validator extends Component {
// //   constructor(props) {
// //     super(props){

// //     }
// //   }
//   render() {
//     return <Text>Oi</Text>;
//   }
// }

import moment from 'moment';
// export default Validator

const unMask = value => {
  const regex = /[^a-zA-Z0-9]/g;
  return (value || '').toString().replace(regex, '');
};

var Validator = function(param) {
  let unMasked = unMask(param);
  let day = parseFloat(unMasked[0] + unMasked[1]);
  let validDay = day > 0 && day <= 31; //true or false
  let month = parseFloat(unMasked[2] + unMasked[3]);
  let validMonth = month > 0 && month <= 12;
  let year = parseFloat(unMasked[4] + unMasked[5] + unMasked[6] + unMasked[7]);
  let validYear = year >= 1919 && year <= moment().years();

  if (!validDay || !validMonth || !validYear) {
    return false;
  } else if (validDay && validMonth && validYear) {
    return true;
  }
};

export { Validator };
