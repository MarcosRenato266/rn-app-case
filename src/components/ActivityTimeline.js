import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { Text, Spinner } from 'native-base';
import moment from 'moment';
import 'moment/locale/pt-br.js';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import TaskCard from './TaskCard';

class ActivityTimeline extends React.Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  refresh = () => {
    return this.props.refetch();
  };

  handleItemOnPress = (isTask, id) => {
    const { navigation } = this.props;
    if (isTask) {
      setTimeout(() => navigation.navigate('TaskDetails', { taskId: id }), 0);
    } else {
      setTimeout(() => navigation.navigate('Product', { productId: id }), 0);
    }
  };

  getCircleIndicatorColor = value => {
    if (value > 0) return '#6aca5e';
    if (value < 0) return '#b53f3f';
    return '#5d5d5d';
  };

  getSignText = value => {
    if (value > 0) return '+';
    if (value < 0) return '-';
    return '';
  };

  renderItem = ({ item }) => {
    const numberValue = parseFloat(item.value);
    const displayTime = item.time ? moment(new Date(item.time)).fromNow() : '';
    return (
      <View style={[styles.wrapper, item.initial && { marginTop: 10 }]}>
        <View style={styles.valueWrapper}>
          {!item.initial && (
            <View style={styles.coinsWrapper}>
              <Text style={styles.coinsPlusText}>
                {this.getSignText(numberValue)}
              </Text>
              <Text style={styles.coinsValueText}>{Math.abs(item.value)}</Text>
              <Text style={styles.coinsNameText}>Coins</Text>
            </View>
          )}
        </View>
        <View style={styles.lineWrapper}>
          <View
            style={[
              styles.line,
              item.initial && { height: '50%', alignSelf: 'flex-end' },
            ]}
          />
          <View
            style={[
              styles.circleIndicator,
              {
                backgroundColor: this.getCircleIndicatorColor(numberValue),
              },
            ]}
          />
        </View>
        <View style={styles.contentWrapper}>
          {item.initial ? (
            <Text style={styles.contentText}>Atividades mais recentes</Text>
          ) : (
            <View>
              <Text style={styles.dateText}>{displayTime}</Text>
              <TaskCard
                id={item.id}
                title={item.title}
                subTitle={item.isTask ? 'Desafio' : 'Produto'}
                showIcon={false}
                showCoins={false}
                cardBellowWidth={'90%'}
                onPress={() =>
                  this.handleItemOnPress(item.isTask, item.objectId)
                }
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  render() {
    const { style, loading, activity } = this.props;

    if (loading) {
      return (
        <View style={[styles.container, style]}>
          <Spinner color={colors.primary} />
        </View>
      );
    }

    if (!activity) {
      return (
        <View style={[styles.container, style]}>
          <Text style={styles.errorText}>Error fetching activity</Text>
        </View>
      );
    }

    if (activity.length === 0) {
      return (
        <View style={[styles.container, style]}>
          <Text style={styles.infoText}>
            Você ainda não efetuou nenhuma atividade em sua conta
          </Text>
        </View>
      );
    }

    const data = [
      {
        id: '0',
        initial: true,
      },
      ...activity,
    ];

    return (
      <View style={[styles.container, style]}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueWrapper: {
    width: moderateScale(80),
  },
  coinsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinsPlusText: {
    color: colors.primary,
    fontSize: moderateScale(17),
  },
  coinsValueText: {
    color: colors.text,
    fontSize: moderateScale(17),
    fontFamily: 'MontserratBold',
  },
  coinsNameText: {
    color: colors.secondary_text,
    fontSize: moderateScale(11),
  },
  valueText: {
    color: colors.text,
    fontFamily: 'MontserratBold',
    fontSize: moderateScale(18),
  },
  lineWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginLeft: 5,
  },
  line: {
    width: 4,
    height: '100%',
    backgroundColor: '#262626',
    position: 'absolute',
  },
  circleIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'green',
  },
  contentWrapper: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 10,
  },
  contentText: {
    color: colors.secondary_text,
  },
  errorText: {
    alignSelf: 'center',
    color: colors.error,
    paddingVertical: 20,
  },
  infoText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.secondary_text,
    paddingVertical: 20,
  },
  dateText: {
    color: colors.secondary_text,
    fontSize: moderateScale(11),
    paddingBottom: 3,
  },
});

const activityQuery = gql`
  query GetActivity {
    me {
      id
      activity {
        id
        title
        isTask
        objectId
        value
        time
      }
    }
  }
`;

export default graphql(activityQuery, {
  props: ({ data: { me, loading, refetch } }) => ({
    activity: me && me.activity,
    loading,
    refetch,
  }),
})(withNavigation(ActivityTimeline));
