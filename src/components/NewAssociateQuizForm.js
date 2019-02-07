import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import yup from 'yup';
import { withApollo } from 'react-apollo';
import { Pagination } from 'react-native-snap-carousel';
import Auth from '../lib/auth';
import Button from './Button';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import FormField from './FormField';
import ItemInput from './ItemInput';
import AlertContainer from './AlertContainer';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    name: yup.string().required('Este campo é obrigatório'),
  }),
  mapPropsToValues: props => ({
    associate: '',
  }),
  handleSubmit: (values, { props: { client, navigation }, setSubmitting }) => {
    const { associate } = values;
    if (!associate) {
      AlertContainer.show({
        message: 'Sócio inexistente',
        buttonText: 'Tentar novamente',
      });
      setSubmitting(false);
      return;
    }

    Auth.loginRequest(associate)
      .then(res => {
        if (!res || !res.data || !res.data.token) {
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
            message = 'Sócio inválido';
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

const AssociateForm = props => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    navigation,
    isSubmitting,
  } = props;

  const renderItem = () => {
    return (
      <FormField
        validateStatus={getValidateStatus('associate')}
        error={getError('associate')}
      >
        <ItemInput
          placeholder="Nome e sobrenome..."
          onChangeText={text => {
            setFieldValue('associate', text);
          }}
          onBlur={() => setFieldTouched('associate')}
          initialValue={values.associate}
          maxLength={32}
        />
      </FormField>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={0}
        containerStyle={{ backgroundColor: 'transparent' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#a18037',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

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
    <View style={styles.container}>
      <Text style={styles.title}>Responda o questionário</Text>
      <Text style={styles.subtitle}>
        {`Para ser um sócio Fiduc você precisa responder a este questionário e entraremos em contato para uma entrevista`}
      </Text>
      <View>
        {renderItem()}
        {pagination()}
      </View>
      <Button
        primary
        style={styles.submitButton}
        onPress={() => {
          navigation.navigate('NewAssociateSuccessScreen');
        }}
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
          Receber Indicação
        </Text>
      </Button>
    </View>
  );
};

export default withNavigation(withApollo(enhancer(AssociateForm)));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  submitButton: {
    height: moderateScale(20),
    borderRadius: 0,
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
  whiteText: {
    color: colors.secondary_text,
  },

  title: {
    color: colors.text,
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.text,
    fontSize: moderateScale(16),
    textAlign: 'justify',
    marginBottom: 30,
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingVertical: moderateScale(10),
  },
  wrapper: {},
});
