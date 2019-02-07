import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { StyleSheet, Image, Text, View } from 'react-native';
import { moderateScale } from '../config/scaling';
import Button from '../components/Button';
import colors from '../config/colors';

class TaskSuccessScreen extends React.Component {
  static navigationOptions = {
    title: 'Task Success',
  };

  componentDidMount() {
    // Refetch the user and task from the server so
    // when he come back to the task details screen it
    // will be updated with the new state from server
    this.props.refetchUser();
    this.props.refetchTask();
  }

  handleContinueButtonPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const { taskValue } =
      (navigation && navigation.state && navigation.state.params) || {};

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/i/success.png')}
            style={styles.successImage}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Tarefa realizada com sucesso!</Text>
          <Text style={styles.newCoinsContainer}>
            <Text style={styles.newCoinsText}>Você obteve </Text>
            <Text style={[styles.newCoinsText, { color: colors.primary }]}>
              {taskValue}
            </Text>
            <Text style={styles.newCoinsText}> pontos</Text>
          </Text>
          <Button
            style={styles.actionButton}
            primary
            onPress={this.handleContinueButtonPress}
          >
            <Text style={styles.actionButtonText}>Continuar</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    width: '100%',
    height: '40%',
  },
  successImage: {
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    width: '75%',
    height: '75%',
  },
  content: {
    marginTop: 20,
  },
  text: {
    fontFamily: 'MontserratBold',
    color: colors.text,
    fontSize: moderateScale(24),
    textAlign: 'center',
    paddingTop: moderateScale(8),
  },
  newCoinsContainer: {
    textAlign: 'center',
    paddingVertical: moderateScale(25),
  },
  newCoinsText: {
    fontFamily: 'MontserratBold',
    color: colors.text,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  actionButton: {
    height: moderateScale(46),
    borderRadius: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(12),
  },
  actionButtonText: {
    color: colors.button,
    fontSize: moderateScale(14),
    paddingHorizontal: moderateScale(8),
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'MontserratBold',
  },
});

const getTaskQuery = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
      id
      userCanComplete {
        canComplete
        reason
      }
    }
  }
`;

const getUserQuery = gql`
  query GetMe {
    me {
      id
      points
    }
  }
`;

export default compose(
  graphql(getTaskQuery, {
    options: ({ navigation }) => {
      const { taskId } =
        (navigation && navigation.state && navigation.state.params) || {};

      return { variables: { id: taskId } };
    },
    props: ({ data: { refetch } }) => ({
      refetchTask: refetch,
    }),
  }),
  graphql(getUserQuery, {
    props: ({ data: { refetch } }) => ({
      refetchUser: refetch,
    }),
  })
)(TaskSuccessScreen);
