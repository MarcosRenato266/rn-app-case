import React, { Component } from 'react';
import {
  Container,
  Button,
  Left,
  Right,
  Header,
  Icon,
  Badge,
} from 'native-base';

import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';

export default class AssociatedDashboardScreen extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Container style={container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Header style={{ backgroundColor: '#a18037' }}>
          <Left>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" style={{ color: '#000' }} />
            </TouchableWithoutFeedback>
          </Left>
          <Right>
            <Badge danger solid style={badgeStyle} />
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('AssociatedNotificationsScreen')
              }
            >
              <Icon name="notifications" style={{ color: '#000' }} />
            </Button>
          </Right>
        </Header>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            source={require('../assets/i/emptypage.png')}
            style={{ width: 300, height: 300 }}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  emptyPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPageView: {
    resizeMode: 'center',
  },
  title: {
    color: '#a9872f',
    fontSize: moderateScale(25),
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.text,
    fontSize: moderateScale(16),
    textAlign: 'justify',
    margin: 20,
  },
  submitButton: {
    backgroundColor: '#a18037',
    height: moderateScale(40),
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: moderateScale(50),
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: colors.button_text,
    fontSize: moderateScale(18),
    textAlign: 'center',
    alignSelf: 'center',
  },
  badgeStyle: {
    position: 'absolute',
    width: 16,
    height: 16,
    right: 4,
    bottom: 25,
  },
});

const { container, badgeStyle } = styles;

module.exports = AssociatedDashboardScreen;
