import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import FormField from './FormField';
import ItemInput from './ItemInput';
import { SECURITY_QUESTION } from '../graphql/mutations';
import Button from '../components/Button';
import FieldsWarning from '../components/FieldsWarning';

class SecurityQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securityQuestion: '',
      securityAnswer: '',
      blankField: false,
      blanksecurityQuestion: false,
      blanksecurityAnswer: false,
    };
  }

  securityQuestionMutation() {
    const { client } = this.props;
    const { securityQuestion, securityAnswer } = this.state;
    const regex = /^$/g;
    const answer = regex.test(securityAnswer);
    const question = regex.test(securityQuestion);

    if (!question) {
      if (!answer) {
        client
          .mutate({
            mutation: SECURITY_QUESTION,
            variables: {
              input: {
                question: securityQuestion,
                answer: securityAnswer,
              },
            },
          })
          .then(() => {
            this.setState({ blankField: false });
            this.props.navigation.navigate('SuitabilitySurvey');
          })
          .catch(error => console.log(error.message));
      } else {
        this.setState({ blanksecurityAnswer: true });
      }
    } else {
      this.setState({ blanksecurityQuestion: true });
    }
  }

  setQuestion = (question, state) => {
    const regex = /\D/g;
    const blankSpecificField = `blank ${state}`;
    console.log(blankSpecificField);
    this.state[state] = question;
    if (regex.test(this.state[state])) {
      this.setState({ [blankSpecificField]: false, blankField: false });
    }
  };

  render() {
    const {
      blankField,
      blanksecurityAnswer,
      blanksecurityQuestion,
    } = this.state;
    const renderItem = () => {
      return (
        <View>
          <FormField>
            <ItemInput
              onChangeText={securityQuestion =>
                this.setQuestion(securityQuestion, 'securityQuestion')
              }
              initialValue={this.state.securityQuestion}
              maxLength={32}
            />
          </FormField>
          {blanksecurityQuestion && <FieldsWarning />}
          <Text style={styles.questionAnswerStyle}> Digite sua Pergunta </Text>
          <FormField>
            <ItemInput
              onChangeText={securityAnswer =>
                this.setQuestion(securityAnswer, 'securityAnswer')
              }
              initialValue={this.state.securityAnswer}
              maxLength={32}
            />
          </FormField>
          <Text style={styles.questionAnswerStyle}> Digite sua Resposta </Text>
          {blanksecurityAnswer && <FieldsWarning />}
          <View style={styles.registerContainer}>
            <Button
              primary
              standard
              onPress={() => this.securityQuestionMutation()}
            >
              <Text uppercase={false} style={styles.textButton}>
                Confirmar
              </Text>
            </Button>
          </View>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pergunta de Segurança</Text>
        <Text style={styles.subtitle}>
          Cadastre a sua pergunta de segurança
        </Text>
        <View>{renderItem()}</View>
      </View>
    );
  }
}

export default withApollo(withNavigation(SecurityQuestionForm));

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
    marginBottom: moderateScale(20),
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(60),
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
    fontFamily: 'Rubik-Light',
  },
  subtitle: {
    color: colors.text,
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Rubik-Light',
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingVertical: moderateScale(10),
  },
  wrapper: {},
  questionAnswerStyle: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: colors.secondary_text,
    fontFamily: 'Rubik-Light',
    padding: 8,
  },
});
