import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import { withApollo, graphql, compose } from 'react-apollo';
import yup from '../lib/yup';
import Auth from '../lib/auth';

import createUserQuery from '../graphql/createUser';
import createUserWithFacebookQuery from '../graphql/createUserWithFacebook';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import FormField from './FormField';
import ItemInput from './ItemInput';
import Button from './Button';
import AlertContainer from './AlertContainer';

import { _getData } from '../lib/AsyncStorage';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    cpf: yup
      .string()
      .required('O CPF é obrigatório')
      .cpf('CPF inválido'),

    birthday: yup.string().required('A data de nascimento é obrigatória'),
  }),

  mapPropsToValues: props => ({
    cpf: '',
    birthday: '',
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const { navigation, client, createUser, createUserWithFacebook } = props;
    const { cpf, birthday } = values;
    const { registerData } =
      (navigation && navigation.state && navigation.state.params) || {};

    if (!registerData) {
      return;
    }

    if (!birthday || !cpf) return; // TODO: handle with alert

    const formatedBirthday = moment(birthday, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );
    const formatedCpf = cpf.replace(/\.|-|\s/g, '');

    // User got from the email register screen
    const { email, name, lastname, password, socialProfileId } = registerData;

    if (socialProfileId) {
      // User is using Facebook to register
      createUserWithFacebook({
        variables: {
          input: {
            birthday: formatedBirthday,
            cpf: formatedCpf,
            socialProfileId,
          },
        },
      })
        .then(res => {
          if (!res || !res.data || !res.data.createUserWithFacebook) return;
          const usr = res.data.createUserWithFacebook;
          const userData = {
            name: usr.name,
            lastname: usr.lastname,
            picture: usr.picture,
            email: usr.email,
          };
          // Successful login, send the user to the continue page with complete data
          navigation.navigate('ContinueAs', { userData });
        })
        .catch(err => {
          console.log('Error on createUserWithFacebook', err);
          AlertContainer.show({
            message: 'Erro interno',
            buttonText: 'Tentar novamente',
          });
          setSubmitting(false);
        });

      return;
    }

    // Use email and password
    createUser({
      variables: {
        input: {
          birthday: formatedBirthday,
          cpf: formatedCpf,
          name,
          lastname,
          email,
          password,
        },
      },
    })
      .then(res => {
        if (!res && res.data && res.data.createUser) return false;
        // Register successful, login the user
        Auth.loginRequest(email, password).then(res => {
          if (!res || !res.data || !res.data.token) {
            // Handle error with alert
            return;
          }
          const { token } = res.data;
          Auth.login(token, client).then(() => navigation.navigate('App'));
        });
      })
      .catch(err => {
        console.log('err', err);
        if (err) {
          const errorString = err.toString();
          if (errorString.indexOf('ER_USER_ALREADY_EXIST') >= 0) {
            AlertContainer.show({
              message: 'O CPF inserido já está registrado',
              buttonText: 'Tentar novamente',
            });
          } else {
            AlertContainer.show({
              message: 'Erro desconhecido',
              buttonText: 'Tentar novamente',
            });
          }
        }
        setSubmitting(false);
      });
  },
});

class DetailsRegisterForm extends React.Component {
  state = {
    date: null,
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      isSubmitting,
    } = this.props;

    if (!this.state.alreadyUpdateCPFValidation) {
      this.setState({ alreadyUpdateCPFValidation: true }, () => {
        _getData('cpf').then(res => {
          this.setState({ cpf: res.value.toString() });
          setFieldValue('CPFField', res.value.toString());
        });
        setFieldValue('CPFField', this.state.cpf);
      });
    }

    const getValidateStatus = param => {
      return errors[param] && touched[param]
        ? 'error'
        : touched[param]
        ? 'success'
        : '';
    };

    const getError = param => {
      return errors[param] && touched[param] ? errors[param] : '';
    };

    return (
      <View>
        <Text style={styles.headerText}>
          Seu registro está quase completo, preencha os seguintes dados para
          finalizar
        </Text>

        <FormField
          validateStatus={getValidateStatus('cpf')}
          error={getError('cpf')}
        >
          <ItemInput
            iconName="id-card"
            iconType="FontAwesome"
            placeholder="Digite seu CPF..."
            onChangeText={text => {
              this.setState({ cpf: text });
              setFieldValue('CPFField', text);
            }}
            value={this.state.cpf}
            maxLength={14}
            onBlur={() => setFieldTouched('cpf')}
            initialValue={values.cpf}
            maskType="cpf"
            keyboardType="numeric"
          />
        </FormField>

        <FormField
          validateStatus={getValidateStatus('birthday')}
          error={getError('birthday')}
        >
          <ItemInput
            containerStyle={{ marginTop: 12 }}
            isDate
            iconName="calendar"
            iconType="FontAwesome"
            date={this.state.date}
            mode="date"
            placeholder="Selecione a data de nascimento..."
            format="DD/MM/YYYY"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            showIcon={false}
            onDateChange={date => {
              this.setState({ date });
              setFieldValue('birthday', date);
            }}
          />
        </FormField>

        <Button
          primary
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          <Text
            style={[
              styles.submitButtonText,
              isSubmitting && { color: colors.secondary_text },
            ]}
            uppercase={false}
          >
            Finalizar
          </Text>
        </Button>
      </View>
    );
  }
}

export default compose(
  graphql(createUserQuery, { name: 'createUser' }),
  graphql(createUserWithFacebookQuery, { name: 'createUserWithFacebook' })
)(withNavigation(withApollo(enhancer(DetailsRegisterForm))));

const styles = StyleSheet.create({
  headerText: {
    color: colors.text,
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    height: moderateScale(54),
    borderRadius: 26,
    justifyContent: 'center',
    marginVertical: 24,
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: colors.cardBackground,
    fontSize: moderateScale(18),
    textAlign: 'center',
    alignSelf: 'center',
  },
  whiteText: {
    color: colors.secondary_text,
  },
  passwordRecoveryButton: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  passwordRecoveryButtonText: {
    color: colors.text,
  },
  passwordRecoveryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
