import React, { Component } from 'react';
import {
  Container,
  Button,
  Text,
  Left,
  Right,
  Header,
  Icon,
  Body,
  CardItem,
  Card,
} from 'native-base';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';

export default class CustomerDataValidation extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const { customerName } = this.props.navigation.state.params;

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
          <Body>
            <View style={{ flexDirection: 'row' }}>
              <Text> {customerName}</Text>
            </View>
          </Body>
          <Right>
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
        <View style={{ alignItems: 'center' }}>
          <Text style={dataValidation}>Validação de Dados</Text>
          <Text style={dataValidationText}>
            Preenchemos os seus Dados com as as informações que encontramos em
            nossos sistemas. Pedimos que por favor valide os dados encontrados
          </Text>
        </View>
        <Card
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#e6e6e6',
          }}
        >
          <Text style={addressStyle}> Endereço:</Text>
          <Text style={streetStyle}> Rua das coves, 976 </Text>
          <Text style={cityStyle}> Rio de Janeiro - Brasil </Text>
          <CardItem style={{ backgroundColor: 'transparent' }}>
            <Button rounded dark>
              <Icon
                name="create"
                style={{ color: 'white', alignSelf: 'center' }}
              />
            </Button>
          </CardItem>
        </Card>
        <View
          transparent
          style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
        >
          <Text style={{ marginTop: 30 }}> 1/24 </Text>
          <Button rounded primary style={submitButton} onPress={() => false}>
            <Text style={submitButtonText} uppercase={false}>
              Confirmado
            </Text>
          </Button>
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
  dataValidation: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 15,
  },
  dataValidationText: {
    fontSize: 16,
    textAlign: 'auto',
    marginBottom: 15,
  },
  addressStyle: {
    fontSize: 16,
    marginBottom: 15,
    marginTop: 20,
  },
  streetStyle: {
    fontSize: 22,
  },
  cityStyle: {
    fontSize: 22,
    marginBottom: 25,
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
  cardStyle: {
    backgroundColor: '#e6e6e6',
  },
  iconStyle: {
    backgroundColor: '#000',
  },
});

const {
  container,
  dataValidation,
  dataValidationText,
  addressStyle,
  streetStyle,
  cityStyle,
  submitButtonText,
  submitButton,
} = styles;
