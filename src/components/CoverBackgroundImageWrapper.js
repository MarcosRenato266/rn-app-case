import React from 'react';
import { StyleSheet, View, Image, RefreshControl } from 'react-native';
import { Container, Content } from 'native-base';
import colors from '../config/colors';
import { moderateScale, width as viewportWidth } from '../config/scaling';

const CoverBackgroundImageWrapper = ({
  style,
  children,
  height,
  scrollViewRefreshing,
  scrollViewOnRefresh,
  scrollViewEnabled,
  coverImage,
}) => {
  const wrapperHeight = height || moderateScale(250, 0.5, true);
  const imageSource = coverImage || require('../assets/i/dashboard_cover.jpg');
  const refreshEnabled =
    scrollViewEnabled !== undefined ? scrollViewEnabled : true;
  return (
    <Container style={styles.container}>
      <Content
        style={styles.content}
        refreshControl={
          scrollViewOnRefresh && (
            <RefreshControl
              refreshing={scrollViewRefreshing}
              onRefresh={scrollViewOnRefresh}
              enabled={refreshEnabled}
            />
          )
        }
      >
        <View
          style={[styles.backgroundCoverWrapper, { height: wrapperHeight }]}
        >
          <Image source={imageSource} style={styles.backgroundCoverImg} />
          <View style={styles.backgroundCoverOverlay} />
        </View>

        <View
          style={[styles.aboveContent, { minHeight: wrapperHeight }, style]}
        >
          {children}
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.background,
    flex: 1,
  },
  backgroundCoverWrapper: {
    width: viewportWidth,
    height: moderateScale(250, 0.5, true),
    position: 'absolute',
  },
  backgroundCoverOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(23, 23, 23, 0.8)',
  },
  backgroundCoverImg: {
    width: '100%',
    height: '100%',
  },
  aboveContent: {
    position: 'relative',
    minHeight: moderateScale(250, 0.5, true),
  },
});

export default CoverBackgroundImageWrapper;
