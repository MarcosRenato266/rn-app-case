import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import { Container, Content, Spinner, Text, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import Auth from '../lib/auth';

import ContinueAsForm from '../components/ContinueAsForm';
import TextButton from '../components/TextButton';

const { height: deviceHeight } = Dimensions.get('window');
const defaultPicture = require('../assets/i/default-user.png');

class ContinueAsScreen extends React.Component {
  logoutUser = () => {
    Auth.logout().then(() => this.props.navigation.navigate('Initialize'));
  };

  getUserData = () => {
    const { navigation } = this.props;

    // Check if an user is sent by navigtation
    const { userData } =
      (navigation && navigation.state && navigation.state.params) || {};
    if (userData) return { loading: false, user: userData };

    const { loading, user } = this.props;
    return { loading, user }; // Fallback to server request
  };

  render() {
    const { loading, user } = this.getUserData();

    if (loading) {
      return (
        <View
          style={[
            styles.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Spinner style={{ marginTop: 30 }} color={colors.primary} />
        </View>
      );
    }

    if (!user) {
      // We should logout the user so he doesn't get stuck with this error message
      this.logoutUser();
      return (
        <View style={styles.container}>
          <View style={styles.errorBox}>
            <Icon
              style={styles.errorText}
              type="MaterialIcons"
              name="error-outline"
            />
            <Text style={styles.errorText}>
              Error interno! Por favor, tente novamente.
            </Text>
          </View>
        </View>
      );
    }

    const fullName = user.name + ' ' + user.lastname;
    const picture = user.picture ? { uri: user.picture } : defaultPicture;

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.backgroundImageWrapper}>
            <Image
              source={require('../assets/i/dashboard_cover.jpg')}
              style={styles.backgroundImage}
            />
            <View style={styles.backgroundImageOverlay} />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>Continuar como </Text>
              <Text style={styles.headerNameText}>{fullName}</Text>
              <Text style={styles.headerText}>?</Text>
            </Text>
            <View style={styles.avatarWrapper}>
              <View style={[styles.avatarBackshape, styles.avatarBackshape1]} />
              <View style={[styles.avatarBackshape, styles.avatarBackshape2]} />
              <Image style={styles.avatar} source={picture} />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formWrapper}>
              <ContinueAsForm userEmail={user.email} />

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Ou</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.logoutContainer}>
                <TextButton
                  style={styles.logoutButton}
                  textStyle={styles.logoutText}
                  color={colors.text}
                  text="Clique aqui"
                  onPress={this.logoutUser}
                />
                <Text style={styles.logoutText}>para sair dessa conta</Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 10,
    marginTop: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  errorText: {
    marginTop: 7,
    color: colors.text,
    textAlign: 'center',
  },
  backgroundImageWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23, 23, 23, 0.9)',
  },
  headerContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: deviceHeight * 0.5,
  },
  headerTextWrapper: {
    textAlign: 'center',
  },
  headerText: {
    color: colors.text,
    fontSize: moderateScale(25),
  },
  headerNameText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: moderateScale(26),
  },
  avatarWrapper: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBackshape: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  avatarBackshape1: {
    width: 118,
    height: 118,
    borderRadius: 59,
  },
  avatarBackshape2: {
    width: 132,
    height: 132,
    borderRadius: 66,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    marginTop: 20,
    minHeight: deviceHeight * 0.5,
  },
  formWrapper: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    elevation: 4,
    padding: moderateScale(15),
    marginHorizontal: moderateScale(15),
  },
  dividerContainer: {
    marginVertical: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: colors.divider,
    height: 2,
    width: '30%',
  },
  dividerText: {
    color: colors.divider,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  logoutContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(10),
  },
  logoutButton: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  logoutText: {
    color: colors.secondary_text,
    fontSize: moderateScale(15),
  },
});

const meQuery = gql`
  query GetDashboardTasks {
    me {
      id
      name
      lastname
      picture
      email
    }
  }
`;

export default graphql(meQuery, {
  props: ({ data: { me, loading, refetch } }) => ({
    user: me,
    loading,
    refetch,
  }),
})(withNavigation(ContinueAsScreen));
