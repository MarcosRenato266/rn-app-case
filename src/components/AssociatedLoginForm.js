import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Label } from 'native-base';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import yup from 'yup';
import { withApollo } from 'react-apollo';
import Auth from '../lib/auth';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import FormField from './FormField';
import ItemInput from './ItemInput';
import Button from './Button';
import AlertContainer from './AlertContainer';

import TextButton from './TextButton';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    cpf: yup.string().required('Este campo é obrigatório'),

    password: yup
      .string()
      .min(3, 'A senha deve conter pelo menos 3 caracteres')
      .required('A senha é obrigatória'),
  }),
  mapPropsToValues: props => ({
    cpf: '',
    password: '',
  }),
  handleSubmit: (values, { props: { client, navigation }, setSubmitting }) => {
    const { cpf, password } = values;

    if (!cpf || !password) {
      AlertContainer.show({
        message: 'Usuário ou senha inválidos',
        buttonText: 'Tentar novamente',
      });
      setSubmitting(false);
      return;
    }

    Auth.loginRequest(cpf, password)
      .then(res => {
        if (!res || !res.data || !res.data.token) {
          // We can't tell much to the user
          AlertContainer.show({
            message: 'Erro interno',
            buttonText: 'Tentar novamente',
          });
          return;
        }
        const { token } = res.data;
        Auth.login(token, client).then(() => navigation.navigate('App'));
      })
      .catch(error => {
        const { response } = error;
        if (response) {
          // HTTP Request response
          const { status } = response;
          let message = 'Erro interno';
          if (status === 400) {
            message = 'Dados inválidos';
          }
          if (status === 401) {
            message = 'CPF ou senha inválidos';
          }
          AlertContainer.show({
            message,
            buttonText: 'Tentar novamente',
          });
        } else {
          // Raw error message
          const errorString = error.toString();
          if (errorString && errorString.indexOf('Network Error') >= 0) {
            AlertContainer.show({
              message: 'Erro de conexão',
              buttonText: 'Tentar novamente',
            });
          }
        }
      })
      .finally(() => setSubmitting(false));
  },
});

const cpfMark = x => {
  this.setState({
    cpf: x.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'),
  });
};

// if (!this.state.alreadyUpdateCPFValidation) {
//   this.setState({ alreadyUpdateCPFValidation: true }, () => {
//     _getData('cpf').then(res => {
//       this.setState({ cpf: res.value.toString() });
//       setFieldValue('CPFField', res.value.toString());
//     });
//     setFieldValue('CPFField', this.state.cpf);
//   });
// }

const LoginForm = props => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;

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
    <View style={styles.viewInput}>
      <FormField
        validateStatus={getValidateStatus('cpf')}
        error={getError('cpf')}
      >
        <Item>
          <Label style={[styles.labelInput]}>CPF</Label>
          <Input
            style={[styles.inputField]}
            overlayText="CPF"
            maskType="cpf"
            keyboardType="numeric"
            maxLength={14}
            onChangeText={e => {
              cpfMark(e);
            }}
          />
        </Item>
      </FormField>

      <FormField
        validateStatus={getValidateStatus('password')}
        error={getError('password')}
      >
        <ItemInput
          style={styles.inputField}
          containerStyle={{ marginTop: 12 }}
          overlayText="SENHA"
          secureTextEntry
          onChangeText={text => setFieldValue('password', text)}
          onBlur={() => setFieldTouched('password')}
          initialValue={values.password}
        />
      </FormField>

      <View style={styles.passwordRecoveryContainer}>
        <TextButton
          color={colors.text}
          style={styles.passwordRecoveryText}
          text="Esqueceu sua senha?"
        />
      </View>

      <Button
        primary
        style={styles.submitButton}
        onPress={() => props.navigation.navigate('AssociatedDashboardScreen')}
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
          Acessar
        </Text>
      </Button>
    </View>
  );
};

export default withNavigation(withApollo(enhancer(LoginForm)));

const styles = StyleSheet.create({
  labelInput: {
    fontSize: moderateScale(16),
    color: colors.text,
    fontFamily: 'Rubik-Light',
  },
  submitButton: {
    marginTop: 60,
    justifyContent: 'center',
    marginVertical: 5,
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: colors.button_text,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  whiteText: {
    color: colors.secondary_text,
  },
  passwordRecoveryButton: {
    marginTop: moderateScale(3),
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  passwordRecoveryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(14),
  },
  passwordRecoveryText: {
    paddingHorizontal: moderateScale(20),
  },
  inputField: {
    textAlign: 'right',
  },
});
