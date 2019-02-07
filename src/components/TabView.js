import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Button from '../components/Button';

import { moderateScale } from '../config/scaling';
import colors from '../config/colors';

export default class TabView extends React.Component {
  static navigationOptions = {
    title: 'Test',
    drawerIcon: () => (
      <Image
        source={{ uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1` }}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          style={styles.tabBar}
          tabBarUnderlineStyle={{ backgroundColor: colors.primary, height: 3 }}
          tabBarTextStyle={
            ({ fontFamily: 'MontserratBold' }, { fontSize: moderateScale(16) })
          }
          tabBarActiveTextColor={colors.text}
          tabBarInactiveTextColor={colors.secondary_text}
          tabBarBackgroundColor={colors.backgroundColor}
        >
          <View tabLabel="Missões">
            <Text>Open up App.js to start working on your app!</Text>
          </View>
          <View tabLabel="Atividades">
            <Text>Changes you make will automatically reload.</Text>
          </View>
          <View tabLabel="Resgatar">
            <Text>Shake your phone to open the developer menu.</Text>
          </View>
        </ScrollableTabView>

        <View>
          <Button />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {},
});
