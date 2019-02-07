import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Icon, Spinner } from 'native-base';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import UserProfileStats from '../components/UserProfileStats';
import UserProfileEditForm from '../components/UserProfileEditForm';

const defaultPicture = require('../assets/i/default-user.png');
const coverImage = require('../assets/i/dashboard_cover.jpg');

class UserProfileScreen extends React.Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  refresh = () => {
    return this.props.refetch();
  };

  render() {
    const { user, loading } = this.props;

    if (!loading && !user) {
      return (
        <View>
          <Text>Error fetching user</Text>
        </View>
      );
    }

    const username = loading
      ? 'Loading...'
      : user && user.name + ' ' + user.lastname;

    const pictureSource = loading ? defaultPicture : { uri: user.picture };
    const userPoints = loading ? '...' : user.points;

    return (
      <Container style={styles.mainContainer}>
        <Content>
          <View style={styles.headerContainer}>
            <Image source={coverImage} style={styles.backgroundCoverImg} />
            <View style={styles.coverContainer} />
          </View>

          <View style={styles.pictureContainer}>
            <View style={styles.userPictureWrapper}>
              <Image style={styles.userPictureImage} source={pictureSource} />
            </View>
            <View style={styles.pictureEditButton}>
              <TouchableOpacity>
                <Icon
                  type="FontAwesome"
                  name="photo"
                  style={{ fontSize: 16, color: colors.text }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.userNameText}>{username}</Text>

          <UserProfileStats
            style={styles.profileStatsContainer}
            completeTasks={23}
            completeEvents={2}
            userPoints={userPoints}
          />

          <View style={styles.editFormContainer}>
            {loading ? (
              <Spinner color={colors.primary} />
            ) : (
              <UserProfileEditForm
                name={user.name}
                lastname={user.lastname}
                email={user.email}
              />
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

const properties = {
  imageSize: moderateScale(150),
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(180, 0.5, true),
  },
  backgroundCoverImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  coverContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  userNameText: {
    marginTop: 15,
    paddingHorizontal: 15,
    color: colors.text,
    fontSize: moderateScale(24),
    alignSelf: 'center',
    fontFamily: 'MontserratBold',
  },
  pictureContainer: {
    alignSelf: 'center',
    marginTop: -properties.imageSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: properties.imageSize + properties.imageSize / 4,
    height: properties.imageSize,
  },
  userPictureWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: parseInt(properties.imageSize / 2, 10),
    borderWidth: 8,
    width: properties.imageSize,
    height: properties.imageSize,
    borderColor: colors.background,
  },
  pictureBorder: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 8,
    width: properties.imageSize,
    height: properties.imageSize,
    borderColor: colors.background,
  },
  userPictureImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: properties.imageSize,
    height: properties.imageSize,
    borderColor: colors.background,
    borderRadius: 100,
    overflow: 'hidden',
  },
  pictureEditButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    marginRight: -moderateScale(80),
    width: properties.imageSize / 3,
    height: properties.imageSize / 3,
    marginLeft: properties.imageSize * 1.5,
    borderRadius: 50,
    backgroundColor: colors.primary,
    borderWidth: 5,
    borderColor: colors.background,
  },
  profileStatsContainer: {
    marginTop: 20,
  },
  editFormContainer: {
    flex: 1,
    paddingTop: 25,
    height: '100%',
    backgroundColor: colors.backgroundColor,
  },
});

const meQuery = gql`
  query GetMe {
    me {
      id
      name
      lastname
      email
      picture
      points
    }
  }
`;

export default graphql(meQuery, {
  props: ({ data: { me, loading, refetch } }) => ({
    user: me,
    loading,
    refetch,
  }),
})(UserProfileScreen);
