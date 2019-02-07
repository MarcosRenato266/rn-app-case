import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withNavigation } from 'react-navigation';

import colors from '../config/colors';
import TasksList from './TasksList';
import { moderateScale } from '../config/scaling';

class EventTasksList extends React.Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  refresh = () => {
    return this.props.refetch();
  };

  render() {
    const { style, loading, eventTasks } = this.props;

    if (!loading && !eventTasks) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Ocorreu um erro ao tentar obter as tarefas. Tente novamente.
          </Text>
        </View>
      );
    }

    return (
      <TasksList
        onRef={node => (this.eventTasksList = node)}
        loading={loading}
        tasks={eventTasks}
        loadingViewStyle={{ marginTop: 15 }}
        style={style}
      />
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    margin: moderateScale(15),
    marginTop: 0,
    borderRadius: 8,
  },
  errorText: {
    color: colors.text,
    textAlign: 'center',
    fontSize: moderateScale(15),
  },
});

const eventTasksQuery = gql`
  query GetEventTasks($name: String!) {
    eventByName(name: $name) {
      id
      tasks {
        id
        name
        value
        scope
      }
    }
  }
`;

export default graphql(eventTasksQuery, {
  options: ({ eventName }) => ({
    variables: {
      name: eventName,
    },
  }),
  props: ({ data: { eventByName, loading, refetch } }) => ({
    eventTasks: eventByName && eventByName.tasks,
    loading,
    refetch,
  }),
})(withNavigation(EventTasksList));
