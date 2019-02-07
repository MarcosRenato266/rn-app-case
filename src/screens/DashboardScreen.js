import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Icon, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';

import UserProfileHeading from '../components/UserProfileHeading';
import CoverBackgroundImageWrapper from '../components/CoverBackgroundImageWrapper';
import FlatHorizontalMenu from '../components/FlatHorizontalMenu';
import ActivityTimeline from '../components/ActivityTimeline';
import TasksList from '../components/TasksList';
import StoreProductsList from '../components/StoreProductsList';

class DashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
    drawerIcon: (
      <Icon
        type="MaterialIcons"
        name="dashboard"
        style={{ color: colors.text, padding: 0.1 }}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTabIndex: 0,
      refreshing: false,
    };
  }

  handleTabMenuClick = (item, index) => {
    this.setState({ currentTabIndex: index });
  };

  refresh = () => {
    // Refetch dashboard tasks
    return this.props.refetch();
  };

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await Promise.all([
      this.refresh(),
      this.userProfileHeading.refresh(),
      this.state.currentTabIndex === 1 && this.activityTimeline.refresh(),
      this.state.currentTabIndex === 2 && this.storeProductsList.refresh(),
    ]);
    this.setState({ refreshing: false });
  };

  render() {
    const { currentTabIndex, refreshing } = this.state;
    const { loading, dashboardTasks } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <CoverBackgroundImageWrapper
          style={styles.container}
          scrollViewRefreshing={refreshing}
          scrollViewOnRefresh={this.handleRefresh}
        >
          <UserProfileHeading
            style={styles.userProfileHeading}
            onRef={node => (this.userProfileHeading = node)}
          />

          <FlatHorizontalMenu
            style={styles.menu}
            items={['Missões', 'Atividades', 'Resgatar']}
            onItemClick={this.handleTabMenuClick}
          />

          <View style={styles.contentWrapper}>
            {currentTabIndex === 0 && (
              <View>
                <TasksList
                  onRef={node => (this.tasksList = node)}
                  loading={loading}
                  tasks={dashboardTasks}
                />
              </View>
            )}
            {currentTabIndex === 1 && (
              <View>
                <View style={styles.activityTitleBox}>
                  <Text style={styles.activityTitleBoxText}>
                    Atividade da sua conta
                  </Text>
                </View>
                <ActivityTimeline
                  onRef={node => (this.activityTimeline = node)}
                />
              </View>
            )}
            {currentTabIndex === 2 && (
              <View>
                <StoreProductsList
                  onRef={node => (this.storeProductsList = node)}
                />
              </View>
            )}
          </View>
        </CoverBackgroundImageWrapper>
        <View style={styles.bottomShadow} pointerEvents="none">
          <Image
            source={require('../assets/i/dashboardShadow.png')}
            resizeMode="stretch"
            style={{ width: '100%' }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(15),
    paddingBottom: moderateScale(20),
  },
  userProfileHeading: {
    marginTop: moderateScale(35, 0.5, true),
  },
  menu: {
    marginTop: moderateScale(10, 0.5, true),
  },
  contentWrapper: {
    marginTop: moderateScale(20, 0.5, true),
  },
  activityTitleBox: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    marginTop: moderateScale(15),
    borderRadius: 8,
  },
  activityTitleBoxText: {
    color: colors.text,
    textAlign: 'center',
  },
  bottomShadow: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const dashboardTasksQuery = gql`
  query GetDashboardTasks {
    me {
      id
      dashboardTasks {
        id
        name
        value
        scope
      }
    }
  }
`;

export default graphql(dashboardTasksQuery, {
  props: ({ data: { me, loading, refetch } }) => ({
    dashboardTasks: me && me.dashboardTasks,
    loading,
    refetch,
  }),
})(withNavigation(DashboardScreen));
