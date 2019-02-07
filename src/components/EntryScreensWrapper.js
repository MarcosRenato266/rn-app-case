import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Content } from 'native-base';
import colors from '../config/colors';
import { moderateScale, width as viewportWidth } from '../config/scaling';

export default ({ children, content, showHeader = true }) => (
  <Container style={styles.container}>
    <Content style={styles.content} behavior="padding">
      {showHeader && (
        <View style={styles.logoContainer}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
        </View>
      )}
      {content && <View style={styles.contentContainer}>{content}</View>}

      {children}
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.background,
  },
  screenCover: {
    position: 'absolute',
    width: viewportWidth,
    height: '20%',
  },
  screenCoverImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverColorOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(30),
    marginBottom: moderateScale(15),
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: moderateScale(15),
    marginHorizontal: moderateScale(15),
  },
});
