import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Spinner, Text, Icon } from 'native-base';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { moderateScale, width as viewportWidth } from '../config/scaling';

import GoogleMaps from '../components/GoogleMaps';
import FlatHorizontalMenu from '../components/FlatHorizontalMenu';
import TaskCard from '../components/TaskCard';
import TasksList from '../components/TasksList';
import CoverBackgroundImageWrapper from '../components/CoverBackgroundImageWrapper';
import colors from '../config/colors';

class EventScreen extends React.Component {
  static navigationOptions = {
    title: 'Evento',
    drawerIcon: (
      <Icon
        type="MaterialIcons"
        name="event-note"
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

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.refetch();
    this.setState({ refreshing: false });
  };

  render() {
    const { loading, event } = this.props;

    if (loading) {
      return (
        <View style={styles.mainContainer}>
          <Spinner style={{ marginTop: 30 }} color={colors.primary} />
        </View>
      );
    }

    if (!event) {
      // TODO: style
      return (
        <View style={styles.mainContainer}>
          <Text>Error!</Text>
        </View>
      );
    }

    const eventTasks = (event && event.tasks) || [];
    const onMapsTab = this.state.currentTabIndex === 1;

    return (
      <CoverBackgroundImageWrapper
        style={styles.container}
        height={180}
        scrollViewRefreshing={this.state.refreshing}
        scrollViewOnRefresh={this.handleRefresh}
        scrollViewEnabled={!onMapsTab}
        coverImage={{ uri: event.coverImage }}
      >
        <View style={styles.eventNameContainer}>
          <View style={styles.eventNameColorBar} />
          <Text style={styles.eventNameText}>{event.name}</Text>
        </View>

        <FlatHorizontalMenu
          style={styles.menu}
          items={['Evento', 'Local']}
          onItemClick={this.handleTabMenuClick}
        />

        <View>
          {this.state.currentTabIndex === 0 && (
            <Grid style={{ paddingHorizontal: moderateScale(15) }}>
              <Row>
                <Col size={37} style={styles.dcLeftWrapper}>
                  <Image
                    style={styles.eventAvatar}
                    source={{ uri: event.iconImage }}
                  />
                </Col>
                <Col size={63}>
                  <Text style={styles.eventDescriptionTitleText}>
                    Descrição do evento
                  </Text>
                  <Text style={styles.eventDescriptionText}>
                    {event.shortDescription}
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginTop: 3 }}>
                <Text style={styles.eventDescriptionText}>
                  {event.description}
                </Text>
              </Row>
              <Row>
                {event.info && (
                  <View>
                    <Text style={styles.eventInfoTitleText}>
                      Mais informações
                    </Text>
                    <Text style={styles.eventInfoText}>{event.info}</Text>
                  </View>
                )}
              </Row>
              <Row style={styles.tasksRow}>
                <Col>
                  {event.isGroup && (
                    <TaskCard
                      style={styles.taskCard}
                      bonus
                      title="Complete todos os desafios"
                      coins={event.totalGroupReward}
                    />
                  )}
                  <TasksList
                    onRef={node => (this.tasksList = node)}
                    loading={loading}
                    tasks={eventTasks}
                  />
                </Col>
              </Row>
            </Grid>
          )}
          {this.state.currentTabIndex === 1 && (
            <View>
              <GoogleMaps style={{ marginTop: -20 }} />
            </View>
          )}
        </View>
      </CoverBackgroundImageWrapper>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eventNameContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  eventNameColorBar: {
    backgroundColor: colors.primary,
    width: 4,
    marginRight: 10,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  eventNameText: {
    fontFamily: 'MontserratBold',
    color: colors.text,
    fontSize: moderateScale(19),
    paddingVertical: 6,
  },
  menu: {
    marginTop: 70,
    marginBottom: 20,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  dcLeftWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: moderateScale(15),
  },
  eventAvatar: {
    width: viewportWidth * 0.37 - moderateScale(15) - 2,
    height: viewportWidth * 0.37 - moderateScale(15) - 2,
    borderRadius: viewportWidth * 0.37 * 2,
  },
  ppInterationsButton: {
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ppInterationsButtonText: {
    width: '100%',
    color: colors.darkText,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  ppInteractionsButtonWarn: {
    marginTop: 6,
    color: colors.secondary_text,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  eventDescriptionTitleText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    fontFamily: 'MontserratBold',
  },
  eventDescriptionText: {
    color: colors.text,
    fontSize: moderateScale(12),
  },
  eventInfoTitleText: {
    marginTop: 6,
    color: colors.text,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    fontFamily: 'MontserratBold',
  },
  eventInfoText: {
    color: colors.text,
    fontSize: moderateScale(12),
  },
  tasksRow: {
    marginTop: 22,
  },
  taskCard: {
    marginBottom: 7,
  },
});

const getEventQuery = gql`
  query GetEventById($id: ID!) {
    event(id: $id) {
      id
      type
      name
      shortDescription
      description
      info
      iconImage
      coverImage
      isGroup
      totalGroupReward
      startTime
      finishTime
      tasks {
        id
        name
        value
        scope
      }
    }
  }
`;

export default graphql(getEventQuery, {
  options: ({ navigation }) => {
    const { eventId } =
      (navigation && navigation.state && navigation.state.params) || {};

    return {
      variables: {
        id: eventId,
      },
    };
  },
  props: ({ data: { event, loading, refetch } }) => ({
    event,
    loading,
    refetch,
  }),
})(EventScreen);
