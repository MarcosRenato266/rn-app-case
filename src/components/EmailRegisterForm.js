import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import yup from '../lib/yup';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import FormField from './FormField';
import ItemInput from './ItemInput';
import Button from './Button';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),

    lastname: yup.string().required('O último nome é obrigatório'),

    email: yup
      .string()
      .email('Endereço de email inválido')
      .required('O endereço de email é obrigatório'),

    password: yup
      .string()
      .min(3, 'A senha deve conter pelo menos 3 caracteres')
      .required('A senha é obrigatória'),

    cpassword: yup
      .string()
      .sameAs(yup.ref('password'), 'As senhas devem ser iguais')
      .required('A confirmação de senha é obrigatória'),
  }),
});

const EmailRegisterForm = props => {
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
      <FormField
        validateStatus={getValidateStatus('name')}
        error={getError('name')}
      >
        <ItemInput
          iconName="user"
          iconType="FontAwesome"
          placeholder="Digite seu nome..."
          onChangeText={text => setFieldValue('name', text)}
          onBlur={() => setFieldTouched('name')}
          initialValue={values.name}
        />
      </FormField>

      <FormField
        validateStatus={getValidateStatus('lastname')}
        error={getError('lastname')}
      >
        <ItemInput
          containerStyle={{ marginTop: 12 }}
          iconName="user"
          iconType="FontAwesome"
          placeholder="Digite seu último nome..."
          onChangeText={text => setFieldValue('lastname', text)}
          onBlur={() => setFieldTouched('lastname')}
          initialValue={values.lastname}
        />
      </FormField>

      <FormField
        validateStatus={getValidateStatus('email')}
        error={getError('email')}
      >
        <ItemInput
          containerStyle={{ marginTop: 12 }}
          iconName="envelope"
          iconType="FontAwesome"
          placeholder="Digite seu email..."
          onChangeText={text => setFieldValue('email', text)}
          onBlur={() => setFieldTouched('email')}
          initialValue={values.email}
        />
      </FormField>

      <FormField
        validateStatus={getValidateStatus('password')}
        error={getError('password')}
      >
        <ItemInput
          containerStyle={{ marginTop: 12 }}
          iconName="lock"
          iconType="FontAwesome"
          placeholder="Digite sua senha..."
          onChangeText={text => setFieldValue('password', text)}
          onBlur={() => setFieldTouched('password')}
          initialValue={values.password}
          secureTextEntry
        />
      </FormField>

      <FormField
        validateStatus={getValidateStatus('cpassword')}
        error={getError('cpassword')}
      >
        <ItemInput
          containerStyle={{ marginTop: 12 }}
          iconName="lock"
          iconType="FontAwesome"
          placeholder="Confirme sua senha..."
          onChangeText={text => setFieldValue('cpassword', text)}
          onBlur={() => setFieldTouched('cpassword')}
          initialValue={values.cpassword}
          secureTextEntry
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
          Continuar
        </Text>
      </Button>
    </View>
  );
};

export default withNavigation(withApollo(enhancer(EmailRegisterForm)));

const styles = StyleSheet.create({
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
