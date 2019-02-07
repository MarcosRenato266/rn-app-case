import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

class FlatHorizontalMenu extends React.Component {
  static defaultProps = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    activeTextColor: colors.text,
    inactiveTextColor: colors.ghost,
    underlineColor: colors.primary,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  handleItemPress = (item, index) => {
    this.setState({ selectedIndex: index });
    this.props.onItemClick && this.props.onItemClick(item, index);
  };

  renderOption = (item, index, isActive) => {
    const { activeTextColor, inactiveTextColor, underlineColor } = this.props;
    const textColor = isActive ? activeTextColor : inactiveTextColor;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.handleItemPress(item, index)}
      >
        <View
          style={[
            styles.itemContainer,
            isActive && styles.selectedItem,
            { borderBottomColor: underlineColor },
          ]}
        >
          <Text style={[styles.itemText, { color: textColor }]}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { style, items } = this.props;
    const { selectedIndex } = this.state;
    return (
      <View style={[styles.container, style]}>
        {items.map((item, index) =>
          this.renderOption(item, index, selectedIndex === index)
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemContainer: {
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  itemText: {
    color: colors.text,
    fontSize: moderateScale(15),
    fontFamily: 'MontserratBold',
  },
  selectedItem: {
    borderBottomWidth: 3,
  },
});

export default FlatHorizontalMenu;
