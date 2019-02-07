import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Toast } from 'native-base';
import { withFormik } from 'formik';
import yup from 'yup';
import { graphql, withApollo } from 'react-apollo';

import updateUserBasicQuery from '../graphql/updateUserBasic';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import FormField from './FormField';
import EditInput from './EditInput';
import Button from './Button';
import AlertContainer from './AlertContainer';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),

    lastname: yup.string().required('O último nome é obrigatório'),

    email: yup
      .string()
      .email('Endereço de email inválido')
      .required('O email é obrigatório'),
  }),
  mapPropsToValues: ({ name, lastname, email }) => ({
    name,
    lastname,
    email,
  }),
  handleSubmit: (values, { props: { updateUserBasic }, setSubmitting }) => {
    const { name, lastname, email } = values;
    if (!name) {
      return AlertContainer.show({
        message: 'Nome inválido',
        buttonText: 'Fechar',
        onClose: () => setSubmitting(false),
      });
    }
    if (!lastname) {
      return AlertContainer.show({
        message: 'Último nome inválido',
        buttonText: 'Fechar',
        onClose: () => setSubmitting(false),
      });
    }
    if (!email) {
      return AlertContainer.show({
        message: 'Email inválido',
        buttonText: 'Fechar',
        onClose: () => setSubmitting(false),
      });
    }
    updateUserBasic({
      variables: {
        input: {
          name,
          lastname,
          email,
        },
      },
    })
      .then(res => {
        if (res && res.data && res.data.updateUserBasic) {
          Toast.show({
            text: 'Dados alterados com sucesso!',
            buttonText: 'Ok',
          });
        } else {
          AlertContainer.show({
            message: 'Ocorreu um erro ao alterar os dados',
            buttonText: 'Tentar novamente',
            onClose: () => setSubmitting(false),
          });
        }
      })
      .catch(error => {
        const errorString = error.toString();
        if (errorString && errorString.indexOf('Network Error') >= 0) {
          return AlertContainer.show({
            message: 'Erro de conexão',
            buttonText: 'Tentar novamente',
          });
        }
        AlertContainer.show({
          message: 'Ocorreu um erro ao alterar os dados',
          buttonText: 'Tentar novamente',
          onClose: () => setSubmitting(false),
        });
      })
      .finally(() => setSubmitting(false));
  },
});

const UserProfileEditForm = props => {
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
      <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
        <FormField
          validateStatus={getValidateStatus('name')}
          error={getError('name')}
        >
          <EditInput
            containerStyle={{ marginTop: 12 }}
            iconName="envelope"
            iconType="FontAwesome"
            onChangeText={text => setFieldValue('name', text)}
            onBlur={() => setFieldTouched('name')}
            initialValue={values.name}
            desc="Nome:"
          />
        </FormField>
      </View>

      <FormField
        validateStatus={getValidateStatus('lastname')}
        error={getError('lastname')}
      >
        <EditInput
          containerStyle={{ marginTop: 12 }}
          iconName="envelope"
          iconType="FontAwesome"
          onChangeText={text => setFieldValue('lastname', text)}
          onBlur={() => setFieldTouched('lastname')}
          initialValue={values.lastname}
          desc="Último Nome:"
        />
      </FormField>

      <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
        <FormField
          validateStatus={getValidateStatus('email')}
          error={getError('email')}
        >
          <EditInput
            containerStyle={{ marginTop: 12 }}
            iconName="envelope"
            iconType="FontAwesome"
            onChangeText={text => setFieldValue('email', text)}
            onBlur={() => setFieldTouched('email')}
            initialValue={values.email}
            desc="Email:"
          />
        </FormField>
      </View>

      <Button
        primary
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        <Text style={styles.submitButtonText} uppercase={false}>
          Salvar Alterações
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    height: moderateScale(50),
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  submitButtonText: {
    paddingTop: 3,
    color: colors.cardBackground,
    fontSize: moderateScale(20),
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
  fieldInfo: {
    fontFamily: 'MontserratBold',
    color: colors.secondary_text,
    fontSize: moderateScale(12),
  },
});

export default graphql(updateUserBasicQuery, { name: 'updateUserBasic' })(
  withApollo(enhancer(UserProfileEditForm))
);
