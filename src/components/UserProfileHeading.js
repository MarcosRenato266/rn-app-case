import React from 'react';
import gql from 'graphql-tag';
import { StyleSheet, View, Image } from 'react-native';
import { graphql } from 'react-apollo';
import { Icon, Text } from 'native-base';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';

const defaultPicture = require('../assets/i/default-user.png');

class UserProfileHeading extends React.Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  refresh = () => {
    return this.props.refetch();
  };

  render() {
    const { style, user, loading } = this.props;

    const userName = loading
      ? 'Loading...'
      : (user && user.name) || 'Failed to fetch user'; // TODO: proper error handling

    const points = loading ? '...' : (user && user.points) || 'N/A';
    const picture =
      loading || !user || !user.picture
        ? defaultPicture
        : { uri: user.picture };

    return (
      <View style={[styles.container, style]}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={picture} />
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userName}>
            <Text style={styles.userNameText}>{userName}</Text>
          </View>
          <View>
            <View style={styles.userCoins}>
              <Text style={styles.userCoinsText}>{points}</Text>
              <Icon
                style={styles.userCoinsIcon}
                type="MaterialCommunityIcons"
                name="coin"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    zIndex: 99,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoContainer: {
    paddingLeft: 5,
  },
  userNameText: {
    color: colors.text,
    fontSize: moderateScale(20),
  },
  userCoins: {
    top: 5,
    left: -30,
    position: 'relative',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingRight: 15,
    paddingLeft: 35,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  userCoinsText: {
    fontFamily: 'MontserratBold',
    fontSize: moderateScale(16),
    color: colors.darkText,
  },
  userCoinsIcon: {
    marginLeft: 5,
    color: colors.darkText,
    fontSize: moderateScale(24),
  },
});

const meQuery = gql`
  query GetMe {
    me {
      id
      name
      points
      picture
    }
  }
`;

export default graphql(meQuery, {
  props: ({ data: { me, loading, refetch } }) => ({
    user: me,
    loading,
    refetch,
  }),
})(UserProfileHeading);
