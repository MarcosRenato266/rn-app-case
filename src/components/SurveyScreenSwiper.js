import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Text } from 'native-base';
import Swiper from 'react-native-swiper';
import FormField from './FormField';
import ItemInput from './ItemInput';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

export default class SurveyScreenSwiper extends Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        height={Dimensions.get('window').height}
        showsButtons={false}
      >
        <View style={styles.slide}>
          <FormField>
            <ItemInput
              placeholder="Nome e sobrenome..."
              onChangeText={text => {}}
              maxLength={32}
            />
          </FormField>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Apenas o</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Quarto passo</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur
            daowdaowkdoawkopdawdkwaidjajwd
          </Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.2)',
  },
  text: {
    color: colors.text,
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  description: {
    color: colors.text_secondary,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  inputField: {
    width: '100%',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderRadius: 0,
    paddingHorizontal: 12,
  },
});
