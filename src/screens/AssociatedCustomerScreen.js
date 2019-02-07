import React, { Component } from 'react';
import {
  Container,
  Button,
  Text,
  Left,
  Right,
  Header,
  Icon,
  Content,
  Input,
  Item,
  List,
  ListItem,
  Body,
  CardItem,
  Card,
  Thumbnail,
} from 'native-base';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
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
    const pendingCustomer = ['Alan Muá', 'Maria Britney'];

    const customers = [
      'Marina Buckers',
      'Mathew Gradlew',
      'Jonas Burmigan',
      'Frederick Stampick',
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
          <Right>
            <Button transparent onPress={() => alert('oi')}>
              <Icon name="notifications" style={{ color: '#000' }} />
            </Button>
          </Right>
        </Header>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Procurar Cliente" />
        </Item>
        <Content>
          <List style={{ marginTop: 30 }}>
            <ListItem icon>
              <Body style={{ borderBottomColor: 'transparent' }}>
                <Text>Pendentes</Text>
              </Body>
              <Right style={{ borderBottomColor: 'transparent' }}>
                <Icon active name="eye" />
              </Right>
            </ListItem>
          </List>
          <Card
            dataArray={pendingCustomer}
            renderRow={data => (
              <CardItem>
                <Left>
                  <Thumbnail
                    source={require('../assets/i/associatedImage.jpg')}
                  />
                  <Body>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.push('CustomerDataValidation', {
                          customerName: data,
                        })
                      }
                    >
                      <Text>{data}</Text>
                    </TouchableWithoutFeedback>
                  </Body>
                </Left>
              </CardItem>
            )}
          />
          <List style={{ marginTop: 30 }}>
            <ListItem icon>
              <Body style={{ borderBottomColor: 'transparent' }}>
                <Text>Clientes</Text>
              </Body>
              <Right style={{ borderBottomColor: 'transparent' }}>
                <Icon active name="person" fontSize={60} />
              </Right>
            </ListItem>
          </List>
          <Card
            dataArray={customers}
            renderRow={data => (
              <CardItem>
                <Left>
                  <Thumbnail
                    source={require('../assets/i/associatedImage.jpg')}
                  />
                  <Body>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.push('CustomerDataValidation', {
                          customerName: data,
                        })
                      }
                    >
                      <Text>{data}</Text>
                    </TouchableWithoutFeedback>
                  </Body>
                </Left>
              </CardItem>
            )}
          />
        </Content>
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

const { container } = styles;

module.exports = AssociatedDashboardScreen;
