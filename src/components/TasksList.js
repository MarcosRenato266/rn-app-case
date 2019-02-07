import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Spinner } from 'native-base';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';
import TaskCard from '../components/TaskCard';

class TasksList extends React.Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  handleTaskOnPress = id => {
    const { navigation } = this.props;
    setTimeout(() => navigation.navigate('TaskDetails', { taskId: id }), 0);
  };

  refresh = () => {
    return this.props.refetch();
  };

  render() {
    const { loading, tasks, loadingViewStyle } = this.props;
    const listData = tasks || [];

    return (
      <View>
        {loading && (
          <View style={loadingViewStyle}>
            <Spinner color={colors.primary} />
          </View>
        )}
        {!loading && (
          <FlatList
            data={listData}
            keyExtractor={task => task.id}
            renderItem={({ item }) => (
              <TaskCard
                id={item.id}
                style={styles.taskCard}
                scope={item.scope}
                title={item.name}
                coins={item.value}
                onPress={this.handleTaskOnPress}
              />
            )}
          />
        )}
        {!loading && tasks.length === 0 && (
          <View style={styles.noTasksContainer}>
            <Text style={styles.noTasksText}>
              Não há nenhum desafio disponível no momento, verifique novamente
              mais tarde.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  taskCard: {
    marginBottom: 7,
  },
  noTasksContainer: {
    backgroundColor: colors.cardBackground,
    padding: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTasksText: {
    color: colors.text,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});

export default withNavigation(TasksList);
