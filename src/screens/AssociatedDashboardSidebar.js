import React, { Component } from 'react';
import {
  Container,
  Label,
  Button,
  Right,
  Header,
  Icon,
  Thumbnail,
  List,
  ListItem,
} from 'native-base';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';

export default class AssociatedDashboardSidebar extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  render() {
    return (
      <Container style={container}>
        <Header
          style={{
            backgroundColor: '#a18037',
            borderBottomColor: 'transparent',
          }}
        >
          <Right>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.closeDrawer()}
            >
              <Icon name="close" />
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <View
          style={{
            backgroundColor: '#a18037',
            height: 45,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ marginTop: 24, marginLeft: 20 }}>
            <Thumbnail
              large
              source={require('../assets/i/associatedImage.jpg')}
            />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={associatedFiduc}>Sócio FIDUC</Text>
            <Text style={associatedFiducName}>João Pedro</Text>
          </View>
        </View>
        <List style={{ marginTop: 45 }}>
          <ListItem>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('AssociatedCustomerScreen')
              }
            >
              <Text style={sideText}>Clientes</Text>
            </Button>
          </ListItem>
          <ListItem>
            <Button transparent onPress={() => false}>
              <Text style={sideText}>Fiduc</Text>
            </Button>
          </ListItem>
        </List>
        <View style={{ justifyContent: 'flex-end', flex: 1, margin: 10 }}>
          <Button
            transparent
            onPress={() =>
              this.props.navigation.navigate('AssociatedLoginScreen')
            }
          >
            <Label style={{ color: '#8c8c8c' }}>Sair</Label>
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
  associatedFiduc: {
    fontSize: 15,
    fontWeight: '300',
    color: '#fff',
    marginLeft: 10,
  },
  associatedFiducName: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 10,
  },
  sideText: {
    fontSize: 18,
    fontWeight: '400',
  },
});

const { container, associatedFiduc, associatedFiducName, sideText } = styles;
