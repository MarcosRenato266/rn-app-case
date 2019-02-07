import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Spinner, Text, Icon } from 'native-base';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import moment from 'moment-timezone';
import colors from '../config/colors';
import { moderateScale, width as viewportWidth } from '../config/scaling';
import { timezone } from '../lib/config';

import CoverBackgroundImageWrapper from '../components/CoverBackgroundImageWrapper';
import TasksList from '../components/TasksList';
import IconBadgeValue from '../components/IconBadgeValue';
import EventCard from '../components/EventCard';
import Button from '../components/Button';

class TaskDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Desafio',
    drawerLabel: () => null,
  };

  state = {
    refreshing: false,
  };

  handleCompleteButtonOnPress = () => {
    const { navigation, task } = this.props;
    if (!task) return;
    const { taskId } =
      (navigation && navigation.state && navigation.state.params) || {};
    if (!taskId) navigation.goBack(); // Invalid task
    navigation.navigate('TaskSteps', {
      taskId,
      taskValue: task.value,
      taskScope: task.scope,
    });
  };

  handleViewEventButtonPress = id => {
    const { navigation } = this.props;
    navigation.navigate('Event', { eventId: id });
  };

  getTaskWarning = task => {
    const {
      userCanComplete: { canComplete, reason },
    } = task;
    if (canComplete) return null;
    switch (reason) {
      case 'TASK_LIMIT_INDV_REACHED':
        return 'Você não pode realizar essa tarefa novamente porque já atingiu o limite máximo individual';
      case 'TASK_LIMIT_GLOBAL_REACHED':
        return 'Você não pode realizar essa tarefa porque o limite máximo global foi atingido';
      default:
        return null;
    }
  };

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.refetch();
    this.setState({ refreshing: false });
  };

  render() {
    const { loading, task, dashboardTasks } = this.props;

    if (loading) {
      return (
        <View style={styles.mainContainer}>
          <Spinner style={{ marginTop: 30 }} color={colors.primary} />
        </View>
      );
    }

    if (!task) {
      return (
        <View style={styles.mainContainer}>
          <View>
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
        </View>
      );
    }

    if (!task.active) {
      return (
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.errorBox}>
              <Icon
                style={styles.errorText}
                type="MaterialIcons"
                name="error-outline"
              />
              <Text style={styles.errorText}>The task is not active</Text>
            </View>
          </View>
        </View>
      );
    }

    const isEvent = !!task.event;
    const otherTasks = (isEvent ? task.event.tasks : dashboardTasks)
      .filter(t => t.id !== task.id)
      .sort(Math.random)
      .slice(0, 5);
    const taskWarning = this.getTaskWarning(task);
    const buttonDisabled = !task.userCanComplete.canComplete;
    let durationString = null;

    if (isEvent) {
      const startTime = new Date(task.event.startTime);
      const startStr = moment(startTime)
        .tz(timezone)
        .format('DD/MM');

      const finishTime = new Date(task.event.finishTime);
      const finishStr = moment(finishTime)
        .tz(timezone)
        .format('DD/MM');

      durationString = `${startStr} - ${finishStr}`;
    }

    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <CoverBackgroundImageWrapper
            style={styles.container}
            scrollViewRefreshing={this.state.refreshing}
            scrollViewOnRefresh={this.handleRefresh}
          >
            <View style={styles.peopleLimitsWrapper}>
              <View style={styles.peopleLimits}>
                <IconBadgeValue
                  style={styles.peopleLimitIconBadge}
                  iconName="torso"
                  iconType="Foundation"
                  active={task.maxQuantityIndividual > 0}
                  value={task.maxQuantityIndividual}
                />
                <IconBadgeValue
                  style={styles.peopleLimitIconBadge}
                  iconName="torsos-all"
                  iconType="Foundation"
                  active={task.maxQuantityGlobal > 0}
                  value={task.maxQuantityGlobal}
                />
              </View>
            </View>

            <View style={styles.taskHeader}>
              <View>
                {isEvent && (
                  <Text style={styles.taskEventNameText}>
                    {task.event.name}
                  </Text>
                )}
                <View style={styles.taskDetails}>
                  <View style={styles.taskColorBar} />
                  <Text style={styles.taskNameText}>{task.name}</Text>
                </View>
              </View>
            </View>

            {taskWarning && (
              <View style={styles.taskWarningCard}>
                <Text style={styles.taskWarningText}>{taskWarning}</Text>
              </View>
            )}

            <View style={styles.taskDescriptionCard}>
              <Text style={styles.taskDescriptionTitleText}>
                Descrição do desafio
              </Text>
              <Text style={styles.taskDescriptionText}>{task.description}</Text>
            </View>

            {isEvent && (
              <EventCard
                id={task.event.id}
                style={styles.eventCard}
                imageSource={{ uri: task.event.iconImage }}
                title={task.event.name}
                description={task.event.shortDescription}
                duration={durationString}
                onViewEventPress={this.handleViewEventButtonPress}
              />
            )}

            <Text style={styles.otherTasks}>
              {isEvent ? 'Outros desafios do evento' : 'Outros desafios'}
            </Text>

            <View style={styles.otherTasksList}>
              {
                <TasksList
                  onRef={node => (this.tasksList = node)}
                  loading={loading}
                  tasks={otherTasks}
                />
              }
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
        <View style={styles.completeContainer}>
          <Button
            primary
            style={styles.completeButton}
            onPress={this.handleCompleteButtonOnPress}
            disabled={buttonDisabled}
          >
            <Text
              style={[
                styles.completeButtonText,
                buttonDisabled && { color: colors.disabledText },
              ]}
            >
              Completar Desafio
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingBottom: moderateScale(20),
  },
  peopleLimitsWrapper: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  peopleLimits: {
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(100),
  },
  peopleLimitIconBadge: {
    width: 50,
  },
  taskHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  taskEventNameText: {
    paddingHorizontal: moderateScale(15),
    color: colors.text,
    fontSize: moderateScale(14),
    fontFamily: 'MontserratBold',
  },
  taskDetails: {
    flexDirection: 'row',
    paddingRight: moderateScale(15),
  },
  taskColorBar: {
    backgroundColor: colors.primary,
    width: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    marginRight: 10,
  },
  taskNameText: {
    color: colors.secondary_text,
    width: viewportWidth * 0.65,
  },
  taskDeadline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  taskDeadlineIcon: {
    color: colors.secondary_text,
    fontSize: moderateScale(13),
    marginRight: 5,
  },
  taskDeadlineText: {
    color: colors.secondary_text,
    fontSize: moderateScale(14),
    textAlign: 'right',
  },
  taskWarningCard: {
    backgroundColor: colors.primary,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    margin: moderateScale(15),
    marginBottom: 0,
    borderRadius: 8,
  },
  taskWarningText: {
    color: colors.text,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  taskDescriptionCard: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    margin: moderateScale(15),
    borderRadius: 8,
  },
  taskDescriptionTitleText: {
    color: colors.text,
    fontSize: moderateScale(16),
    marginBottom: 5,
    fontFamily: 'MontserratBold',
  },
  taskDescriptionText: {
    color: colors.text,
    fontSize: moderateScale(12),
  },
  eventCard: {
    marginHorizontal: moderateScale(15),
  },
  otherTasks: {
    color: colors.secondary_text,
    margin: 15,
    fontFamily: 'MontserratBold',
  },
  otherTasksList: {
    marginHorizontal: moderateScale(15),
  },
  taskCard: {
    marginBottom: 7,
  },
  bottomShadow: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  completeContainer: {
    backgroundColor: colors.background,
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButton: {
    height: moderateScale(46),
    borderRadius: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(17),
  },
  completeButtonText: {
    color: colors.cardBackground,
    fontSize: moderateScale(14),
    textAlign: 'center',
    alignSelf: 'center',
  },
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  errorText: {
    marginTop: 7,
    color: colors.text,
    textAlign: 'center',
  },
});

const getTaskQuery = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
      id
      name
      description
      scope
      value
      active
      category {
        type
      }
      event {
        id
        name
        shortDescription
        iconImage
        startTime
        finishTime
        tasks {
          id
          name
          value
          scope
        }
      }
      maxQuantityGlobal
      maxQuantityIndividual
      maxQuantityIndividualResetTime
      userCanComplete {
        canComplete
        reason
      }
    }
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

export default graphql(getTaskQuery, {
  options: ({ navigation }) => {
    const { taskId } =
      (navigation && navigation.state && navigation.state.params) || {};

    return {
      variables: {
        id: taskId,
      },
    };
  },
  props: ({ data: { task, me, loading, refetch } }) => ({
    task,
    dashboardTasks: me && me.dashboardTasks,
    loading,
    refetch,
  }),
})(TaskDetailsScreen);
