import React from 'react';
import { View, StatusBar } from 'react-native';
import { Label } from 'native-base';
import { withApollo } from 'react-apollo';
import PasswordGesture from '../service/react-native-gesture-password/source';
import colors from '../config/colors';
import { iphoneX } from '../utils/IphoneX';
import { SET_PATTERN_PASSWORD } from '../graphql/mutations';

var Password1 = '';

class RegisterPattnerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Por favor, defina seu padrão de seguranca.',
      status: 'normal',
      defaultPassword: null,
      wrongPattern: false,
    };
  }

  onEnd(password) {
    if (Password1 === '') {
      // The first password
      Password1 = password;
      this.setState({
        status: 'normal',
        message: 'Insira mais uma vez seu padrão de segurança.',
      });
    } else {
      // The second password
      if (password === Password1) {
        this.props.client
          .mutate({
            mutation: SET_PATTERN_PASSWORD,
            variables: {
              input: {
                patternPassword: password,
              },
            },
          })
          .then(() => {})
          .catch(err => console.log(err));
        this.setState({
          status: 'right',
          message: 'Sua senha foi definida como a ordem: ' + password,
        });
        return this.props.navigation.navigate('SecurityQuestion');
      } else {
        password = '';
        Password1 = '';
        this.setState({
          status: 'wrong',
          message:
            'Esta não coincide com a primeira digitada. Insira um padrão de segurança, logo após insira novamente o mesmo padrão.',
          wrongPattern: true,
        });
      }
    }
  }

  onStart() {
    if (Password1 === '') {
      this.setState({
        message: 'Por favor, defina seu padrão de segurança.',
        wrongPattern: false,
      });
    } else {
      this.setState({
        message: 'Insira mais uma vez seu padrão de segurança.',
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <PasswordGesture
          ref="pg"
          status={this.state.status}
          // message={this.state.message}
          onStart={() => this.onStart()}
          onEnd={password => this.onEnd(password)}
          innerCircle
          inner
          outerCircle
          color={'#000'}
          fill={'blue'}
          normalColor={'#cdbcbd'}
          rightColor={colors.accent}
        />
        <View style={{ flex: iphoneX ? 0.3 : 0.1, backgroundColor: '#fff' }}>
          <Label
            style={{
              color: this.state.wrongPattern ? 'red' : colors.primary,
              fontFamily: 'Rubik-Light',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            {this.state.message}
          </Label>
        </View>
      </View>
    );
  }
}

export default withApollo(RegisterPattnerScreen);
