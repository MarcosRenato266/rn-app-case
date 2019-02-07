import React, { Component } from 'react';
import {
  Container,
  Text,
  Left,
  Header,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Body,
} from 'native-base';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';

export default class AssociatedDashboardScreen extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const notifications = [
      {
        notTitle: 'Solicitação de amizade',
        subtitle: 'Jana quer ser sua amiga',
      },
      {
        notTitle: 'Solicitação de amizade',
        subtitle: 'Mariana quer ser sua amiga',
      },
      {
        notTitle: 'Solicitação de amizade',
        subtitle: 'Joana quer ser sua amiga',
      },
    ];

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
        </Header>
        <Card
          dataArray={notifications}
          renderRow={data => (
            <CardItem style={{ backgroundColor: '#e6e6e6', marginBottom: 10 }}>
              <Left>
                <Thumbnail
                  large
                  source={require('../assets/i/bussinesswoman.jpg')}
                />
                <Body>
                  <Text style={notificationText}>{data.notTitle}</Text>
                  <Text style={notificationText}>{data.subtitle}</Text>
                </Body>
              </Left>
            </CardItem>
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationText: {
    marginLeft: 5,
  },
});

const { container, notificationText } = styles;
