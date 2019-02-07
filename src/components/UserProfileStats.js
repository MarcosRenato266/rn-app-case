import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

const UserProfileStats = ({
  style,
  completeTasks,
  completeEvents,
  userPoints,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.statBox}>
        <Text style={styles.statsValueText}>{completeTasks}</Text>
        <Text style={styles.statsLabelText}>Tarefas</Text>
        <Text style={styles.statsLabelText}>Realizadas</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={[styles.statsValueText, styles.statsMainValueText]}>
          {userPoints}
        </Text>
        <Text style={styles.statsLabelText}>Pontos</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statsValueText}>{completeEvents}</Text>
        <Text style={styles.statsLabelText}>Eventos</Text>
        <Text style={styles.statsLabelText}>Concluídos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statsValueText: {
    color: colors.text,
    fontSize: moderateScale(22),
    fontFamily: 'MontserratBold',
  },
  statsMainValueText: {
    fontSize: moderateScale(24),
    textAlign: 'center',
  },
  statsLabelText: {
    textAlign: 'center',
    color: colors.secondary_text,
    fontSize: moderateScale(12),
  },
});

export default UserProfileStats;
