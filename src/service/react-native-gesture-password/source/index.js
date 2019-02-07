import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import * as helper from './helper';
import { moderateScale } from '../../../config/scaling';
import Line from './line';
import Circle from './circle';
import colors from '../../../config/colors';
import { LowScreen } from '../../../utils/LowScreen';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height * 1.2;
const isVertical = Height > Width;
const lowBoard = LowScreen ? 1 : 2.2;
const lowMarginTop = LowScreen ? 20 : 50;
const lowTop = LowScreen ? 80 : 100;
const Top = isVertical ? ((Height - Width) / lowBoard) * (LowScreen ? 0.4 : 0.77) : 10;
const Radius = isVertical ? Width / 10 : Width / 25;

export default class GesturePassword extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.lastIndex = -1;
    this.sequence = '';
    this.isMoving = false;

    // getInitialState
    let circles = [];
    let Margin = Radius;
    for (let i = 0; i < 9; i++) {
      let p = i % 3;
      let q = parseInt(i / 3);
      circles.push({
        isActive: false,
        x: p * (Radius * 2 + Margin) + Margin + Radius,
        y: q * (Radius * 2 + Margin) + Margin + Radius,
      });
    }

    this.state = {
      circles,
      lines: [],
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        this.onStart(event, gestureState);
      },

      onPanResponderMove: (event, gestureState) => {
        this.onMove(event, gestureState);
      },

      onPanResponderRelease: (event, gestureState) => {
        this.onEnd(event, gestureState);
      },
    });
  }

  render() {
    console.log(
      Dimensions.get('window').height,
      Dimensions.get('window').width
    );
    let color =
      this.props.status === 'wrong'
        ? this.props.wrongColor
        : this.props.rightColor;

    return (
      <View style={[styles.frame, this.props.style, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('../../../assets/i/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.textStyle}> Padrão de Segurança </Text>
        </View>
        <View style={styles.board} {...this._panResponder.panHandlers}>
          {this.renderCircles()}
          {this.renderLines()}
          <Line ref="line" color={color} />
        </View>
        <View style={styles.message}>
          <Text style={[styles.msgText, this.props.textStyle, { color }]}>
            {this.state.message || this.props.message}
          </Text>
        </View>
      </View>
    );
  }

  renderCircles() {
    let array = [],
      fill,
      color,
      inner,
      outer;
    let {
      status,
      normalColor,
      wrongColor,
      rightColor,
      innerCircle,
      outerCircle,
    } = this.props;

    this.state.circles.forEach(function (c, i) {
      fill = c.isActive;
      color = status === 'wrong' ? wrongColor : rightColor;
      inner = !!innerCircle;
      outer = !!outerCircle;

      array.push(
        <Circle
          key={'c_' + i}
          fill={fill}
          normalColor={normalColor}
          color={color}
          x={c.x}
          y={c.y}
          r={Radius}
          inner={inner}
          outer={outer}
        />
      );
    });

    return array;
  }

  renderLines() {
    let array = [],
      color;
    let { status, wrongColor, rightColor } = this.props;

    this.state.lines.forEach(function (l, i) {
      color = status === 'wrong' ? wrongColor : rightColor;

      array.push(
        <Line key={'l_' + i} color={color} start={l.start} end={l.end} />
      );
    });

    return array;
  }

  setActive(index) {
    this.state.circles[index].isActive = true;

    let circles = this.state.circles;
    this.setState({ circles });
  }

  resetActive() {
    this.state.lines = [];
    for (let i = 0; i < 9; i++) {
      this.state.circles[i].isActive = false;
    }

    let circles = this.state.circles;
    this.setState({ circles });
    this.props.onReset && this.props.onReset();
  }

  getTouchChar(touch) {
    let x = touch.x;
    let y = touch.y;

    for (let i = 0; i < 9; i++) {
      if (helper.isPointInCircle({ x, y }, this.state.circles[i], Radius)) {
        return String(i);
      }
    }

    return false;
  }

  getCrossChar(char) {
    let middles = '13457',
      last = String(this.lastIndex);

    if (middles.indexOf(char) > -1 || middles.indexOf(last) > -1) return false;

    let point = helper.getMiddlePoint(
      this.state.circles[last],
      this.state.circles[char]
    );

    for (let i = 0; i < middles.length; i++) {
      let index = middles[i];
      if (helper.isEquals(point, this.state.circles[index])) {
        return String(index);
      }
    }

    return false;
  }

  onStart(e, g) {
    let x = isVertical
      ? e.nativeEvent.pageX
      : e.nativeEvent.pageX - Width / 3.4;
    let y = isVertical
      ? e.nativeEvent.pageY - Top / 1.25
      : e.nativeEvent.pageY - 30;

    let lastChar = this.getTouchChar({ x, y });
    if (lastChar) {
      this.isMoving = true;
      this.lastIndex = Number(lastChar);
      this.sequence = lastChar;
      this.resetActive();
      this.setActive(this.lastIndex);

      let point = {
        x: this.state.circles[this.lastIndex].x,
        y: this.state.circles[this.lastIndex].y,
      };

      this.refs.line.setNativeProps({ start: point, end: point });

      this.props.onStart && this.props.onStart();

      if (this.props.interval > 0) {
        clearTimeout(this.timer);
      }
    }
  }

  onMove(e, g) {
    let x = isVertical
      ? e.nativeEvent.pageX
      : e.nativeEvent.pageX - Width / 3.4;
    let y = isVertical
      ? e.nativeEvent.pageY - Top / 1.25
      : e.nativeEvent.pageY - 30;

    if (this.isMoving) {
      this.refs.line.setNativeProps({ end: { x, y } });

      let lastChar = null;

      if (
        !helper.isPointInCircle(
          { x, y },
          this.state.circles[this.lastIndex],
          Radius
        )
      ) {
        lastChar = this.getTouchChar({ x, y });
      }

      if (lastChar && this.sequence.indexOf(lastChar) === -1) {
        if (!this.props.allowCross) {
          let crossChar = this.getCrossChar(lastChar);

          if (crossChar && this.sequence.indexOf(crossChar) === -1) {
            this.sequence += crossChar;
            this.setActive(Number(crossChar));
          }
        }

        let lastIndex = this.lastIndex;
        let thisIndex = Number(lastChar);

        this.state.lines.push({
          start: {
            x: this.state.circles[lastIndex].x,
            y: this.state.circles[lastIndex].y,
          },
          end: {
            x: this.state.circles[thisIndex].x,
            y: this.state.circles[thisIndex].y,
          },
        });

        this.lastIndex = Number(lastChar);
        this.sequence += lastChar;

        this.setActive(this.lastIndex);

        let point = {
          x: this.state.circles[this.lastIndex].x,
          y: this.state.circles[this.lastIndex].y,
        };

        this.refs.line.setNativeProps({ start: point });
      }
    }

    if (this.sequence.length === 9) this.onEnd();
  }

  onEnd(e, g) {
    if (this.isMoving) {
      let password = helper.getRealPassword(this.sequence);
      this.sequence = '';
      this.lastIndex = -1;
      this.isMoving = false;

      let origin = { x: 0, y: 0 };
      this.refs.line.setNativeProps({ start: origin, end: origin });

      this.props.onEnd && this.props.onEnd(password);

      if (this.props.interval > 0) {
        this.timer = setTimeout(() => this.resetActive(), this.props.interval);
      }
    }
    this.resetActive();
  }
}

GesturePassword.propTypes = {
  message: PropTypes.string,
  normalColor: PropTypes.string,
  rightColor: PropTypes.string,
  wrongColor: PropTypes.string,
  status: PropTypes.oneOf(['right', 'wrong', 'normal']),
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  onReset: PropTypes.func,
  interval: PropTypes.number,
  allowCross: PropTypes.bool,
  innerCircle: PropTypes.bool,
  outerCircle: PropTypes.bool,
};

GesturePassword.defaultProps = {
  message: '',
  normalColor: '#ccc',
  rightColor: '#5FA8FC',
  wrongColor: '#D93609',
  status: 'normal',
  interval: 0,
  allowCross: false,
  innerCircle: true,
  outerCircle: true,
};

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  board: {
    flex: 1,
    position: 'absolute',
    // left: isVertical ? 0 : Width / 3.4,
    top: isVertical ? Top : 30,
    width: Width,
    height: Height,
  },
  message: {
    // position: 'absolute',
    // left: 0,
    // top: 85,
    // width: Width,
    // height: Top,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 5,
  },
  msgText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    marginTop: moderateScale(LowScreen ? 15 : 40),
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    // paddingBottom: moderateScale(5),
  },
  textStyle: {
    fontSize: moderateScale(18),
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    color: colors.secondary,
  },
});

module.exports = GesturePassword;
