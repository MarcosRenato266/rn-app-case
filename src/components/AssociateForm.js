import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Text, Card, CardItem, Body, Input } from 'native-base';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import _ from 'lodash';
import { BallIndicator } from 'react-native-indicators';
import Button from './Button';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import { partnersStartingWith } from '../graphql/queries';
import { PARTNER_FOR_CLIENT } from '../graphql/mutations';

class AssociateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      associated: null,
      hasAssociate: false,
      associateName: '',
      associateId: '',
      clientId: '',
      saving: false,
    };
  }

  associateSelected(value) {
    this.setState({ hasAssociate: false, associateName: `${value}` });
  }

  saveButton() {
    return (
      <View>
        <Button
          primary
          style={styles.submitButton}
          onPress={() => {
            this.partnerForClient();
          }}
        >
          <Text style={[styles.submitButtonText]} uppercase={false}>
            Selecionar
          </Text>
        </Button>
        <View style={styles.registerContainer}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('Survey', {
                clientId: this.props.clientId,
              })
            }
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textOne}>Não conhece nossos Sócios?</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textTwo}>Clique aqui</Text>
                <Text style={styles.textOne}> e receba uma indicação</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  savingSpinner = () => {
    return (
      <BallIndicator
        color={colors.primary}
        style={{ height: Dimensions.get('window').height / 3 }}
      />
    );
  };
  partnerForClient() {
    const { client } = this.props;
    this.setState({ saving: true });
    client
      .mutate({
        mutation: PARTNER_FOR_CLIENT,
        variables: {
          input: {
            partnerId: this.state.associateId,
          },
        },
      })
      .then(data => {
        this.setState({ saving: false });
        this.props.navigation.navigate('AssociatedSelected', {
          associateName: this.state.associateName,
          clientId: this.props.clientId,
        });
      })
      .catch(error =>
        this.setState({ saving: false }, () => {
          console.log(error);
        })
      );
  }

  render() {
    const { associateName, saving } = this.state;
    const SelectPartner = () => {
      const { associated, hasAssociate } = this.state;
      if (hasAssociate) {
        return _.map(associated, associate => {
          return (
            <CardItem key={associate.id}>
              <Body style={styles.containerAutoComplete}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.setState({
                      associateName: associate.user.name,
                      associateId: associate.id,
                      hasAssociate: false,
                    })
                  }
                >
                  <Text style={styles.associatedStyle}>
                    {associate.user.name}
                  </Text>
                </TouchableWithoutFeedback>
              </Body>
            </CardItem>
          );
        });
      } else {
        return <Text />;
      }
    };

    const getPartnerName = text => {
      this.props.client
        .query({
          query: partnersStartingWith,
          variables: {
            startingWith: `${text.charAt(0).toUpperCase()}${text.slice(1)}`,
          },
        })
        .then(data => {
          const { partnersStartingWith } = data.data;
          if (partnersStartingWith) {
            this.setState({
              associated: partnersStartingWith,
              hasAssociate: /[a-zA-Z]/g.test(text),
            });
          }
        })
        .catch(err => {
          this.setState({ hasAssociate: false }, () => {
            console.log(err);
          });
        });
      this.setState({ associateName: text });
    };

    const ShowAssociate = () => {
      const { hasAssociate } = this.state;

      if (hasAssociate) {
        return (
          <Card
            style={{
              shadowColor: 'transparent',
              borderWidth: 1,
              marginTop: -0.5,
            }}
          >
            <SelectPartner />
          </Card>
        );
      } else {
        return <Text />;
      }
    };

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.title}>Selecione seu</Text>
          <Text style={styles.titleFiduc}> Sócio FIDUC </Text>
        </View>
        <KeyboardAvoidingView>
          <View style={styles.testeeee}>
            <ShowAssociate />
          </View>
          <View style={styles.inputStyle}>
            <Input
              placeholder="Nome e sobrenome..."
              onChangeText={text => getPartnerName(text)}
              style={styles.input}
              value={associateName}
            />
          </View>
        </KeyboardAvoidingView>
        <Text style={styles.subtitle}>
          Digite aqui o nome e sobrenome do Sócio que irá gerenciar sua conta.
        </Text>
        {!saving ? this.saveButton() : this.savingSpinner()}
      </View>
    );
  }
}

export default withApollo(withNavigation(AssociateForm));

const styles = StyleSheet.create({
  registerContainer: {
    marginVertical: moderateScale(15),
  },
  testeeee: {
    marginTop: moderateScale(15),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  submitButton: {
    justifyContent: 'center',
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
    alignSelf: 'center',
    width: '65%',
  },
  submitButtonText: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  whiteText: {
    color: colors.secondary_text,
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontFamily: 'Rubik-Light',
  },
  titleFiduc: {
    color: colors.text,
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingVertical: moderateScale(10),
  },
  inputStyle: {
    flexDirection: 'column',
    marginVertical: 30,
  },

  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: 'Rubik-Light',
    color: 'grey',
    textAlign: 'center',
  },
  containerAutoComplete: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  associatedStyle: {
    fontSize: moderateScale(18),
    color: colors.text,
    fontFamily: 'Rubik-Regular',
    paddingHorizontal: moderateScale(12),
  },
  input: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    color: colors.primary,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  textOne: {
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Regular',
    color: 'grey',
  },
  textTwo: {
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Regular',
    textDecorationLine: 'underline',
    color: 'grey',
  },
});
