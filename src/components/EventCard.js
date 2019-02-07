import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

class EventCard extends React.Component {
  handleOnPress = () => {
    const { id, onViewEventPress } = this.props;
    onViewEventPress && onViewEventPress(id);
  };

  render() {
    const { style, duration, imageSource, title, description } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.card}>
          <View style={styles.cardColorBar} />
          <View style={styles.contentWrapper}>
            {duration && (
              <View style={styles.eventDuration}>
                <Text style={styles.eventDurationText}>{duration}</Text>
              </View>
            )}
            <View style={styles.content}>
              <Image style={styles.eventImage} source={imageSource} />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.descriptionText}>{description}</Text>
                <View style={styles.buttonWrapper}>
                  <Button
                    style={styles.buttonContainer}
                    onPress={this.handleOnPress}
                    bordered
                    light
                  >
                    <Text>Ver mais</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    minHeight: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardColorBar: {
    backgroundColor: colors.primary,
    width: 6,
  },
  contentWrapper: {
    flex: 1,
  },
  eventDuration: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    marginRight: 10,
    paddingVertical: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    alignSelf: 'flex-end',
  },
  eventDurationText: {
    color: colors.secondary_text,
    fontSize: moderateScale(14),
  },
  content: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  eventImage: {
    marginHorizontal: 10,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: moderateScale(16),
    color: colors.text,
    fontFamily: 'MontserratBold',
  },
  descriptionText: {
    fontSize: moderateScale(12),
    color: colors.text,
    paddingRight: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginTop: 10,
    paddingRight: 15,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default EventCard;
