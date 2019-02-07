import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Input, Item, Label } from 'native-base';
import { withFormik } from 'formik';
import { withNavigation } from 'react-navigation';
import yup from 'yup';
import { withApollo } from 'react-apollo';

import Modal from 'react-native-modal';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import FormField from './FormField';
import ItemInput from './ItemInput';
import Button from './Button';
import AlertContainer from './AlertContainer';

//Local storage
import { _getData } from '../lib/AsyncStorage';

const enhancer = withFormik({
  validationSchema: yup.object().shape({
    cpf: yup.string().required('Este campo é obrigatório'),
    name: yup.string().required('Este campo é obrigatório'),
  }),
  mapPropsToValues: props => ({
    cpf: '',
    name: '',
  }),
  handleSubmit: (values, { props: { client, navigation }, setSubmitting }) => {
    const { cpf, name } = values;

    if (!cpf || !name) {
      AlertContainer.show({
        message: 'Nome ou cpf inválidos',
        buttonText: 'Tentar novamente',
      });
      setSubmitting(false);
    }
  },
});

class ConfirmDataForm extends Component {
  state = {
    cpf: this.props.navigation.getParam('cpf'),
    visibleModal: true,
    alreadyUpdateCPFValidation: false,
  };

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalWarning}>
        Favor confirmar suas informações de acordo com os documentos enviados.
      </Text>

      {this.renderButton('Entendido', () =>
        this.setState({ visibleModal: null })
      )}
    </View>
  );

  cpfMark = x => {
    this.setState({
      cpf: x.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'),
    });
  };

  render() {
    const {
      values,
      touched,
      errors,
      setFieldValue,
      setFieldTouched,
      isSubmitting,
      navigation,
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
        <Modal
          isVisible={this.state.visibleModal === true}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          {this.renderModalContent()}
        </Modal>
        <Text style={styles.title}>Confirme seus Dados</Text>
        <FormField
          validateStatus={getValidateStatus('name')}
          error={getError('name')}
        >
          <ItemInput
            style={styles.inputField}
            containerStyle={{ marginTop: 12 }}
            overlayText="NOME"
            onChangeText={text => setFieldValue('name', text)}
            onBlur={() => setFieldTouched('name')}
            initialValue={values.name}
          />
        </FormField>
        <FormField
          validateStatus={getValidateStatus('cpf')}
          error={getError('cpf')}
        >
          <Item>
            <Label style={[styles.labelInput]}>CPF</Label>
            <Input
              style={[styles.inputField]}
              disabled
              overlayText="CPF"
              maskType="cpf"
              keyboardType="numeric"
              value={this.state.cpf}
              maxLength={14}
            />
          </Item>
        </FormField>
        <View style={styles.confirmationAlertView}>
          <Text style={styles.confirmationAlert}>
            Por favor confirme seus dados, ou corrija para efetuarmos um
            cadastro completo.
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            primary
            style={styles.submitButton}
            onPress={() => {
              navigation.navigate('WaitingFetch');
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
              Confirmar informações
            </Text>
          </Button>
          <Button
            secondary
            style={styles.submitButton}
            onPress={() => false}
            //disabled={isSubmitting}
            //loading={isSubmitting}
          >
            <Text
              style={[
                styles.submitButtonText,
                //isSubmitting && { color: colors.secondary_text },
              ]}
              uppercase={false}
            >
              Corrigir Informações
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default withNavigation(withApollo(enhancer(ConfirmDataForm)));

const styles = StyleSheet.create({
  submitButton: {
    justifyContent: 'center',
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
    alignSelf: 'center',
    width: '65%',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.button_text,
    fontSize: moderateScale(17),
    fontFamily: 'Rubik-Light',
  },
  whiteText: {
    color: colors.secondary_text,
  },
  passwordRecoveryButton: {
    marginTop: moderateScale(3),
    fontFamily: 'Rubik-Light',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  confirmationAlertView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationAlert: {
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: colors.secondary_text,
    padding: 38,
  },
  passwordRecoveryText: {
    paddingHorizontal: moderateScale(20),
    fontFamily: 'Rubik-Light',
  },
  inputField: {
    textAlign: 'right',
  },
  title: {
    color: colors.text,
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(20),
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#977430',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    color: 'white',
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
  },
  modalWarning: {
    padding: 30,
    fontSize: 18,
    color: colors.secondary,
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
  },
});
