import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import { moderateScale } from '../config/scaling';
import { _getData } from '../lib/AsyncStorage';

let homeScreen;

class LoadingApp extends Component {
  componentWillMount = () => {
    _getData('cpf').then(firstOpen => {
      homeScreen = firstOpen.value ? 'Login' : 'Home';

      switch (homeScreen) {
        case 'Login':
          this.renderPageLogin();
          break;

        case 'Home':
          this.renderPageHome();
          break;

        default:
          this.renderPageHome();
          break;
      }
    });
  };
  renderPageLogin = () => {
    this.props.navigation.navigate('Login');
  };
  renderPageHome = () => {
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: moderateScale(50),
    paddingVertical: moderateScale(5),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
  },
});

export default withApollo(withNavigation(LoadingApp));
