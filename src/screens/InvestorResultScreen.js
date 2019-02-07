import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Content, Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import Button from '../components/Button';

export default class InvestorResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      investorProfile: '',
    };
  }
  handleOkButtonPress = () => {
    this.props.navigation.navigate('MembershipTerms');
  };

  handleRedoButtonPress = () => {
    this.props.navigation.navigate('SuitabilitySurvey', { tryAgain: 'marcos' });
  };
  renderInvestorData = () => {
    switch (this.props.navigation.getParam('investor')) {
      case 'Arrojado':
        return (
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <View style={styles.titleSubtitle}>
              <Text style={styles.titleText}>SEU PERFIL É</Text>
              <Text style={styles.subtitleText}>Arrojado</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/result.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.infoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </Text>
            <View>
              <Button
                primary
                style={styles.continueButton}
                onPress={this.handleOkButtonPress}
              >
                <Text uppercase={false} style={styles.textButton}>
                  Ótimo
                </Text>
              </Button>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.handleRedoButtonPress}>
                  <Text style={styles.footerText}>
                    <Text style={styles.footerTitle}>
                      O resultado não reflete seu perfil?{' '}
                    </Text>
                    <Text style={styles.footerSubtitle}>
                      Refazer Questionário
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'Conservador':
        return (
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <View style={styles.titleSubtitle}>
              <Text style={styles.titleText}>SEU PERFIL É</Text>
              <Text style={styles.subtitleText}>Conservador</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/result.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.infoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </Text>
            <View>
              <Button
                primary
                style={styles.continueButton}
                onPress={this.handleOkButtonPress}
              >
                <Text uppercase={false} style={styles.textButton}>
                  Ótimo
                </Text>
              </Button>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.handleRedoButtonPress}>
                  <Text style={styles.footerText}>
                    <Text style={styles.footerTitle}>
                      O resultado não reflete seu perfil?{' '}
                    </Text>
                    <Text style={styles.footerSubtitle}>
                      Refazer Questionário
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'Moderado':
        return (
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <View style={styles.titleSubtitle}>
              <Text style={styles.titleText}>SEU PERFIL É</Text>
              <Text style={styles.subtitleText}>Moderado</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/result.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.infoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </Text>
            <View>
              <Button
                primary
                style={styles.continueButton}
                onPress={this.handleOkButtonPress}
              >
                <Text uppercase={false} style={styles.textButton}>
                  Ótimo
                </Text>
              </Button>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.handleRedoButtonPress}>
                  <Text style={styles.footerText}>
                    <Text style={styles.footerTitle}>
                      O resultado não reflete seu perfil?{' '}
                    </Text>
                    <Text style={styles.footerSubtitle}>
                      Refazer Questionário
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'Agressivo':
        return (
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <View style={styles.titleSubtitle}>
              <Text style={styles.titleText}>SEU PERFIL É</Text>
              <Text style={styles.subtitleText}>Agressivo</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/result.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.infoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </Text>
            <View>
              <Button
                primary
                style={styles.continueButton}
                onPress={this.handleOkButtonPress}
              >
                <Text uppercase={false} style={styles.textButton}>
                  Ótimo
                </Text>
              </Button>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.handleRedoButtonPress}>
                  <Text style={styles.footerText}>
                    <Text style={styles.footerTitle}>
                      O resultado não reflete seu perfil?{' '}
                    </Text>
                    <Text style={styles.footerSubtitle}>
                      Refazer Questionário
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'Balanceado':
        return (
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <View style={styles.titleSubtitle}>
              <Text style={styles.titleText}>SEU PERFIL É</Text>
              <Text style={styles.subtitleText}>Balanceado</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/result.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.infoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </Text>
            <View>
              <Button
                primary
                style={styles.continueButton}
                onPress={this.handleOkButtonPress}
              >
                <Text uppercase={false} style={styles.textButton}>
                  Ótimo
                </Text>
              </Button>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.handleRedoButtonPress}>
                  <Text style={styles.footerText}>
                    <Text style={styles.footerTitle}>
                      O resultado não reflete seu perfil?{' '}
                    </Text>
                    <Text style={styles.footerSubtitle}>
                      Refazer Questionário
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      default:
        return (
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <View style={styles.titleSubtitle}>
              <Text style={styles.titleText}>SEU PERFIL É</Text>
              <Text style={styles.subtitleText}>Conservador</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Image
                source={require('../assets/i/result.png')}
                style={styles.shield}
              />
            </View>
            <Text style={styles.infoText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </Text>
            <View>
              <Button
                primary
                style={styles.continueButton}
                onPress={this.handleOkButtonPress}
              >
                <Text uppercase={false} style={styles.textButton}>
                  Ótimo
                </Text>
              </Button>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.handleRedoButtonPress}>
                  <Text style={styles.footerText}>
                    <Text style={styles.footerTitle}>
                      O resultado não reflete seu perfil?{' '}
                    </Text>
                    <Text style={styles.footerSubtitle}>
                      Refazer Questionário
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  };
  render() {
    return (
      <Content style={styles.container}>{this.renderInvestorData()}</Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 26,
    paddingVertical: 10,
  },
  shield: {
    width: 180,
    height: 185,
  },
  titleText: {
    fontSize: moderateScale(16),
    paddingHorizontal: moderateScale(25),
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Rubik-Light',
  },
  subtitleText: {
    fontSize: moderateScale(25),
    paddingHorizontal: moderateScale(25),
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Rubik-Medium',
  },
  titleSubtitle: {
    marginTop: 20,
    paddingVertical: 25,
  },
  infoText: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(20),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(5),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    color: colors.secondary_text,
  },
  continueButton: {
    marginTop: moderateScale(50),
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
  },
  textButton: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  footerTitle: {
    color: colors.secondary,
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Light',
  },
  footerSubtitle: {
    color: colors.secondary,
    fontSize: moderateScale(14),
    fontFamily: 'Rubik-Medium',
    textDecorationLine: 'underline',
  },
});
