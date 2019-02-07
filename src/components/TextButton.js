import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

const TextButton = ({ containerStyle, textStyle, color, text, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[textStyle, { color }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default TextButton;
