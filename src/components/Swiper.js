import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { moderateScale } from './scaling';
import Button from './Button';

export default () => (
  <View style={styles.container}>
    <Swiper
      style={styles.wrapper}
      height={Dimensions.get('window').height}
      dotColor="#4d4d4d"
      activeDotColor="#fff"
    >
      <View style={styles.slide}>
        <View style={styles.container1}>
          <Image style={styles.stretch} source={require('./img/step1.png')} />
        </View>
        <View style={styles.container2}>
          <Text style={styles.title}>Leitura QR Code</Text>
          <Text style={styles.description}>
            Para validar seu desafio você precisa direcionar a câmera do seu
            celular para o código QR que se encontra com um dos responsáveis no
            local onde será realizado seu desafio.
          </Text>
        </View>
      </View>
      <View style={styles.slide}>
        <View style={styles.container1}>
          <Image style={styles.stretch} source={require('./img/step2.png')} />
        </View>

        <View style={styles.container2}>
          <Text style={styles.title}>Dificuldade na Leitura</Text>
          <Text style={styles.description}>
            Caso enfrente dificuldades na leitura do QR Code você pode utilizar
            as opções de iluminação na câmera do aplicativo ou aproximar mais o
            código da câmera do seu celular.
          </Text>
        </View>
      </View>
      <View style={styles.slide}>
        <View style={styles.container1}>
          <Image style={styles.stretch} source={require('./img/step3.png')} />
        </View>
        <View style={styles.container2}>
          <Text style={styles.title}>Nos vemos em Valhalla!</Text>
          <Text style={styles.description}>BIRL.</Text>
          <Button
            style={styles.button}
            text="Realizar Desafio"
            bgColor="#d7a54a"
            onPress={() => {}}
          />
        </View>
      </View>
    </Swiper>
  </View>
);

var styles = {
  wrapper: {},
  stretch: {
    width: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  button: {
    alignSelf: 'flex-end',
    paddingTop: '20%',
    borderRadius: 20,
  },
  title: {
    color: 'inhited',
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
    //fontWeight: 'bold'
  },
  description: {
    color: '#fff',
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingBottom: '10%',
    //fontWeight: 'bold'
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '62%',
  },
  container2: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '38%',
    width: '90%',
  },
  container: {
    flex: 1,
  },
};
