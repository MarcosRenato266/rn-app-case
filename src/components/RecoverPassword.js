import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import { moderateScale } from '../config/scaling';
import ItemInput from './ItemInput';
import Button from './Button';
import { cpfRegex } from '../utils/Mask';
import colors from '../config/colors';
import { recoverPassaword } from '../graphql/queries';

class RecoverPassword extends Component {
  state = {
    cpf: this.props.navigation.getParam('cpf'),
    render: '',
    email: '',
    loading: false,
    title: '',
    description: '',
  };
  recoveryPassword = () => {
    this.setState({
      loading: true,
    });
    return this.props.client
      .query({
        query: recoverPassaword,
        variables: { cpf: cpfRegex(this.state.cpf) },
      })
      .then(data => {
        this.setState(
          {
            email: data.data.emailRetrievePassword.email,
          },
          () => {
            this.setState({
              title: 'Redefinição de senha efetuada com sucesso!',
              description: 'Verifique sua caixa de Email',
              render: true,
            });
          }
        );
      })
      .catch(error => {
        this.setState({
          title: 'Ops! Algo deu errado',
          description: 'Porfavor verifique seu CPF. Código do Erro ' + error,
          render: true,
        });
      });
  };
  closeModal = () => {
    return this.props.navigation.navigate('Login');
  };

  handleGoToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
        </View>
        <View>
          <Text style={styles.text}>
            Para recuperar sua senha preencha com seu CPF o campo abaixo,
            automaticamente vai ser enviado um email com sua nova senha.
          </Text>
          <ItemInput
            maskType="cpf"
            keyboardType="numeric"
            maxLength={14}
            style={styles.inputField}
            placeholder="Digite seu CPF"
            onChangeText={text => {
              this.setState({ cpf: text });
            }}
            initialValue={this.state.cpf}
          />
        </View>
        <View style={styles.buttonView}>
          {this.state.loading ? (
            <View>
              <Text>Carregando ...</Text>
            </View>
          ) : (
            <View style={styles.actionsContainer}>
              <Button
                primary
                style={styles.button}
                onPress={this.recoveryPassword}
              >
                <Text style={styles.buttonText}>Nova Senha</Text>
              </Button>
              <Text
                style={styles.getBackSurvey}
                onPress={() => this.handleGoToLogin()}
              >
                Voltar
              </Text>
            </View>
          )}
        </View>
        <Modal
          isVisible={this.state.render}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/i/logo.png')}
                style={styles.logo}
              />
            </View>
            <View>
              <Text style={styles.title}>{this.state.title}</Text>
              <Text style={styles.text}>{this.state.description}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button primary style={styles.button} onPress={this.test}>
                <Text style={styles.buttonText} onPress={this.closeModal}>
                  Continuar
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Medium',
    color: colors.text,
    textAlign: 'center',
    marginBottom: moderateScale(25),
  },
  actionsContainer: {
    width: '65%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getBackSurvey: {
    fontSize: moderateScale(17),
    fontFamily: 'Rubik-Light',
    color: colors.text,
    textAlign: 'center',
    marginBottom: moderateScale(25),
  },
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
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Rubik-Light',
    paddingBottom: moderateScale(40),
    fontSize: moderateScale(16),
    color: 'grey',
    textAlign: 'center',
  },
  inputField: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: 'Rubik-Light',
  },
  button: {
    width: '100%',
    borderRadius: 20,
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontFamily: 'Rubik-Light',
    color: '#fff',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withApollo(withNavigation(RecoverPassword));
