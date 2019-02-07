import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { Text } from 'native-base';
import Checkbox from 'react-native-custom-checkbox';

import TextButton from '../components/TextButton';
import Button from '../components/Button';

import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

export default class MembershipTermsScreen extends React.Component {
  state = {
    confirmChecked: false,
  };

  setConfirmationChecked = checked => {
    this.setState({ confirmChecked: checked });
  };

  toggleConfirmationChecked = () => {
    this.setState(state => ({ confirmChecked: !state.confirmChecked }));
  };

  handleConfirmButtonPress = () => {
    if (this.state.confirmChecked) {
      this.props.navigation.navigate('SuccessfullRegistration');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.readTerms}>
          <Text style={styles.infoText}>Leia e confirme nossos</Text>
          <Text style={styles.title}>Termos de adesão</Text>
        </View>

        <ScrollView
          style={styles.termsContainer}
          showsHorizontalScrollIndicator
        >
          <Text style={styles.termsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non
            nisl efficitur, scelerisque ex vitae, malesuada dui. Integer non
            tortor lacinia, iaculis lectus id, facilisis turpis. Nam non aliquet
            felis. Morbi tincidunt ipsum nunc. Nullam non sem viverra, posuere
            turpis nec, pulvinar ligula. Suspendisse potenti. Ut vestibulum
            accumsan nisi vel ornare. Cras id ipsum ultricies, varius risus
            eget, suscipit ante. Etiam semper ligula diam, ut bibendum enim
            molestie fermentum. Praesent ac lacinia tellus. Vestibulum et urna
            non eros hendrerit iaculis a eget tellus. Vivamus imperdiet, sem
            quis bibendum pharetra, orci libero feugiat tellus, id placerat
            felis sapien id purus. Aenean dui nisi, aliquam id lorem non,
            viverra viverra massa. Nulla facilisi. Ut vulputate tortor ac
            malesuada laoreet. Nullam tempus magna at nibh laoreet, eget
            interdum tellus posuere. Praesent aliquet sapien sit amet tincidunt
            eleifend. Etiam pharetra lacus nec dolor ullamcorper scelerisque.
            Vestibulum vitae ullamcorper est, vitae consequat ex. Etiam ac
            imperdiet eros. Etiam convallis dapibus scelerisque. Etiam ut elit
            cursus, vulputate orci nec, accumsan dui. Suspendisse tempus risus
            turpis, vel accumsan tellus euismod nec. In efficitur massa eget
            justo posuere vestibulum. Aliquam faucibus ut nisi vel tincidunt.
            Nam molestie malesuada libero, eget interdum risus consequat et.
            Suspendisse eget tempor nisi, ac imperdiet velit. Cras consequat
            nisi a justo volutpat, sed imperdiet nisi convallis. Phasellus
            lectus nisi, tempus et gravida ut, ultrices nec odio. Pellentesque
            id malesuada dolor, ut dictum sapien. Ut id finibus magna. In hac
            habitasse platea dictumst. Mauris ac dui elit. Aenean sagittis mi a
            urna tempor, vitae scelerisque sapien bibendum. Sed lobortis tellus
            ultricies rhoncus auctor. Nunc rhoncus in nisl ut rutrum.
            Pellentesque at dictum enim. Sed facilisis mauris ut urna viverra,
            sed condimentum nisl volutpat. Aenean porta non velit id dapibus.
            Morbi metus velit, tincidunt at porta ut, viverra a leo. Ut ultrices
            enim finibus, vestibulum turpis vel, blandit turpis. Donec ex
            libero, laoreet eu ex ac, pharetra sodales turpis. Quisque
            condimentum justo risus, non vulputate neque vehicula ac. Etiam at
            sapien lectus. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Fusce viverra vel mauris
            ac vestibulum. Aliquam porttitor sapien in sem dictum, nec convallis
            velit blandit. Maecenas luctus tellus neque, vitae aliquam lacus
            accumsan at. Maecenas facilisis mollis tellus. Etiam fringilla, nibh
            ac efficitur aliquam, nunc nunc tincidunt lorem, sed vestibulum
            neque nisi vel arcu. In sollicitudin velit eget magna placerat
            convallis. Nam molestie iaculis erat, ut congue libero venenatis at.
          </Text>
        </ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <View style={styles.confirmWrapper}>
            <Checkbox
              style={styles.checkbox}
              onChange={(name, checked) => this.setConfirmationChecked(checked)}
              checked={this.state.confirmChecked}
            />
            <TextButton
              style={styles.confirmText}
              onPress={this.toggleConfirmationChecked}
              text="Li e aceito os termos de adesão"
            />
          </View>
          <Button
            style={styles.confirmButton}
            primary
            standard
            onPress={this.handleConfirmButtonPress}
          >
            <Text uppercase={false} style={styles.buttonText}>
              Continuar
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  readTerms: {
    marginTop: 60,
  },
  title: {
    fontSize: moderateScale(25),
    marginBottom: moderateScale(15),
    fontFamily: 'Rubik-Regular',
    color: colors.secondary,
  },
  infoText: {
    textAlign: 'center',
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
    color: colors.secondary,
  },
  termsContainer: {
    //backgroundColor: 'rgba(1, 1, 1, 0.3)', //TODO: CHANGE TO COLOR INTO COLORS FILE
    height: moderateScale(200),
    marginVertical: moderateScale(10),
  },
  termsText: {
    color: colors.text,
    textAlign: 'justify',
    paddingHorizontal: moderateScale(30),
    fontFamily: 'Rubik-Light',
  },
  confirmWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: '#ccc',
    color: '#a18037',
    borderColor: 'transparent',
  },
  confirmText: {
    marginLeft: moderateScale(15),
  },
  confirmButton: {
    alignSelf: 'center',
    marginVertical: moderateScale(15),
  },
  buttonText: {
    fontSize: moderateScale(20),
    fontFamily: 'Rubik-Light',
  },
};
