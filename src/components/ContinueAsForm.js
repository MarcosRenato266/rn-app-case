import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
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
import SocialLoginButtons from '../components/SocialLoginButtons';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    password: yup
      .string()
      .min(3, 'A senha deve conter pelo menos 3 caracteres')
      .required('A senha é obrigatória'),
  }),
  mapPropsToValues: props => ({
    password: '',
  }),
  handleSubmit: (
    values,
    { props: { userEmail, client, navigation }, setSubmitting }
  ) => {
    const { password } = values;

    if (!password) {
      AlertContainer.show({
        message: 'Senha inválida',
        buttonText: 'Tentar novamente',
      });
      setSubmitting(false);
      return;
    }

    Auth.loginRequest(userEmail, password)
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
        console.log('error on login request', error);
        const { response } = error;
        if (response) {
          // HTTP Request response
          const { status } = response;
          let message = 'Erro interno';
          if (status === 400) {
            message = 'Dados inválidos';
          }
          if (status === 401) {
            message = 'Email ou senha inválidos';
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

const ContinueAsForm = props => {
  const {
    values,
    touched,
    errors,
    handleSubmit,
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
    <View>
      <SocialLoginButtons />

      <FormField
        validateStatus={getValidateStatus('password')}
        error={getError('password')}
      >
        <ItemInput
          containerStyle={{ marginTop: 12 }}
          iconName="lock"
          iconType="FontAwesome"
          placeholder="Digite sua senha..."
          secureTextEntry
          onChangeText={text => setFieldValue('password', text)}
          onBlur={() => setFieldTouched('password')}
          initialValue={values.password}
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
          Acessar Conta
        </Text>
      </Button>
    </View>
  );
};

export default withNavigation(withApollo(enhancer(ContinueAsForm)));

const styles = StyleSheet.create({
  //#region antes da minha alteração
  // submitButton: {
  //   height: moderateScale(54),
  //   borderRadius: 26,
  //   justifyContent: 'center',
  //   marginTop: 24,
  //   paddingHorizontal: 48,
  //   alignSelf: 'center',
  // },
  // submitButtonText: {
  //   color: colors.cardBackground,
  //   fontSize: 20,
  //   textAlign: 'center',
  //   alignSelf: 'center',
  // },
  //#endregion
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
});
