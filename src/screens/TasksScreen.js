import React from 'react';
import { StyleSheet, View, Image, RefreshControl } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import FlatHorizontalMenu from '../components/FlatHorizontalMenu';
import TasksList from '../components/TasksList';
import EventTasksList from '../components/EventTasksList';

class TasksScreen extends React.Component {
  static navigationOptions = {
    title: 'Desafios',
    drawerIcon: (
      <Icon
        type="MaterialIcons"
        name="list"
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

  refresh = () => {
    return this.props.refetch();
  };

  handleTabMenuClick = (item, index) => {
    this.setState({ currentTabIndex: index });
  };

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await Promise.all([
      this.refresh(),
      this.state.currentTabIndex === 1 && this.eventTasksList.refresh(),
    ]);
    this.setState({ refreshing: false });
  };

  render() {
    const { currentTabIndex, refreshing } = this.state;
    const { loading, dashboardTasks } = this.props;

    return (
      <Container style={styles.container}>
        <Content
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          <View style={styles.menuContainer}>
            <FlatHorizontalMenu
              style={styles.menu}
              items={['Todos']}
              onItemClick={this.handleTabMenuClick}
              underlineColor={colors.darkText}
              activeTextColor={colors.darkText}
              inactiveTextColor={colors.ghost}
            />
          </View>

          <View style={styles.menuContent}>
            {currentTabIndex === 0 && (
              <View style={styles.tabContent}>
                <TasksList
                  onRef={node => (this.tasksList = node)}
                  loading={loading}
                  tasks={dashboardTasks}
                  loadingViewStyle={{ marginTop: 15 }}
                />
              </View>
            )}
            {currentTabIndex === 1 && (
              <View style={styles.tabContent}>
                <EventTasksList
                  eventName="Bauernfest"
                  onRef={node => (this.eventTasksList = node)}
                />
              </View>
            )}
          </View>
        </Content>
        <View style={styles.bottomShadow} pointerEvents="none">
          <Image
            source={require('../assets/i/dashboardShadow.png')}
            resizeMode="stretch"
            style={{ width: '100%' }}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
  },
  menuContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: colors.primary,
  },
  menuContent: {
    paddingHorizontal: moderateScale(15),
  },
  tabContent: {
    position: 'relative',
    flex: 1,
    top: -20,
    zIndex: 999,
  },
  taskCard: {
    marginBottom: 7,
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
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
})(TasksScreen);
