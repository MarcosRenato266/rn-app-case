import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Picker, Input, Item, Header, List, ListItem } from 'native-base';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { withApollo, compose, graphql } from 'react-apollo';
import VMasker from 'vanilla-masker';
import Modal from 'react-native-modalbox';
import Button from './Button';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import { CREATE_SUITABILITY_QUESTIONARY } from '../graphql/mutations';
import {
  investmentTime,
  resourcesNecessity,
  investmentParcelNeedsLiquidity,
  investmentMainGoal,
  tenPercentLossAction,
  education,
  investmentExperience,
  investmentGroup,
} from '../utils/Suitability';

class SuitabilitySurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investmentTime: '',
      investmentTimeTitle: '',
      resourcesNecessity: '',
      resourcesNecessityTitle: '',
      investmentParcelNeedsLiquidity: '',
      investmentParcelNeedsLiquidityTitle: '',
      investmentMainGoal: '',
      investmentMainGoalTitle: '',
      tenPercentLossAction: '',
      tenPercentLossActionTitle: '',
      education: '',
      educationTitle: '',
      investmentExperience: '',
      investmentExperienceTitle: '',
      investmentGroup: '',
      investmentGroupTitle: '',
      investedInLastFiveYears: '',
      incomeInvestmentPercent: '',
      patrimonialSituation: '',
      monthlyPay: '',
      idxActive: 0,

      // modal
      isVisible: false,

      //options array
      options: [],
    };
    this.reRender = this.props.navigation.addListener('willFocus', () => {
      this.setState({ idxActive: 0 });
    });
  }

  componentWillMount() {
    if (this.props.navigation.state.params) {
      this._swiper.scrollBy(-1, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const idx = nextProps.navigation.getParam('idx');
    this.setState({ idxActive: idx });
  }

  unMask(value) {
    const regex = /[^a-zA-Z0-9]/g;
    return (value || '').toString().replace(regex, '');
  }

  moneyMask = (value, key) => {
    const regex = /^[\d,.?!a-zA-Z]+$/g;
    this.setState[key] = value;
    const inputMasked = VMasker.toMoney(value);
    this.setState({ [key]: inputMasked, borderBottomColor: colors.primary });
    if (regex.test(this.state[key])) {
      this.setState({ blankField: false });
    }
  };

  createPerfilSuitability = () => {
    // let suitabilityInput = {
    //   investmentTime: this.state.investmentTime,
    //   resourcesNecessity: this.state.resourcesNecessity,
    //   investmentParcelNeedsLiquidity: this.state.investmentParcelNeedsLiquidity,
    //   investmentMainGoal: this.state.investmentMainGoal,
    //   tenPercentLossAction: this.state.tenPercentLossAction,
    //   education: this.state.education,
    //   investmentExperience: this.state.investmentExperience,
    //   investmentGroup: this.state.investmentGroup,
    //   investedInLastFiveYears: this.state.investedInLastFiveYears,
    //   incomeInvestmentPercent: this.state.incomeInvestmentPercent,
    //   patrimonialSituation: this.state.patrimonialSituation,
    //   monthlyPay: this.state.monthlyPay,
    // };
    this.props.client
      .mutate({
        mutation: CREATE_SUITABILITY_QUESTIONARY,
        variables: {
          input: {
            investmentTime: this.state.investmentTime,
            resourcesNecessity: this.state.resourcesNecessity,
            investmentParcelNeedsLiquidity: this.state
              .investmentParcelNeedsLiquidity,
            investmentMainGoal: this.state.investmentMainGoal,
            tenPercentLossAction: this.state.tenPercentLossAction,
            education: this.state.education,
            investmentExperience: this.state.investmentExperience,
            investmentGroup: this.state.investmentGroup,
            investedInLastFiveYears: this.state.investedInLastFiveYears,
            incomeInvestmentPercent: this.state.incomeInvestmentPercent,
            patrimonialSituation: this.state.patrimonialSituation,
            monthlyPay: this.state.monthlyPay,
          },
        },
      })
      .then(data => {
        // let test = data.data.createSuitabilityQuestionary.investorProfile;
        this.props.navigation.navigate('InvestorResult', {
          investor: data.data.createSuitabilityQuestionary.investorProfile,
        });
      })
      .catch(error => {
        console.log('error salvando dados', error);
        alert(error);
        // this.props.navigation.navigate('InvestorResult');
      });
  };

  onIndexChanged = index => {
    this.setState({
      idxActive: index,
    });
  };

  openModal = (param, array) => {
    console.log('parametros da abertura de modal', param, array);
    this.setState({ isVisible: true, key: param, options: array });
  };

  renderModalContent = param => {
    const { options } = this.state;
    console.log('options', options);
    return (
      <View style={styles.modalContainer}>
        <Header style={{ backgroundColor: colors.primary }} />
        <List>
          {options.map(options => {
            console.log('dentro do map do array', options);
            return (
              <ListItem
                onPress={() =>
                  this.setState({
                    [param]: options.value,
                    [`${param}Title`]: options.title,
                    isVisible: false,
                  })
                }
              >
                <Text>{options.title}</Text>
              </ListItem>
            );
          })}
        </List>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal isOpen={this.state.isVisible} ref={'modal1'}>
          {this.renderModalContent(this.state.key)}
        </Modal>
        <View style={{ flex: 0 }}>
          <Image source={require('../assets/i/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Perfil de Investidor</Text>
          {this.state.idxActive === 0 && (
            <Text style={styles.description}>
              Responda o questionário a seguir para identificarmos o seu perfil
              de investidor e os melhores negócios para você.
            </Text>
          )}
        </View>
        {/* <View style={{ flex: 1 }}>
         
        </View> */}
        <View style={{ flex: 4, marginTop: moderateScale(50) }}>
          <Swiper
            style={styles.wrapper}
            loop={false}
            showsPagination={false}
            scrollEnabled={false}
            height="100%"
            index={this.state.idxActive}
            onIndexChanged={this.onIndexChanged.bind(this)}
            ref={swiper => (this._swiper = swiper)}
          >
            {/* TEMPO DE INVESTIMENTO */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Tempo desejado de investimento{' '}
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() =>
                    this.openModal('investmentTime', investmentTime)
                  }
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.investmentTimeTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* FUTURO DO INVESTIMENTO */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Em relação aos seus investimentos, qual a necessidade futura dos
                recursos aplicados?{' '}
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() =>
                    this.openModal('resourcesNecessity', resourcesNecessity)
                  }
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.resourcesNecessityTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* PARCELA DE INVESTIMENTO */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Qual parcela dos seus investimentos precisará de liquidez nos
                próximos 12 (doze) meses?{' '}
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() =>
                    this.openModal(
                      'investmentParcelNeedsLiquidity',
                      investmentParcelNeedsLiquidity
                    )
                  }
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.investmentParcelNeedsLiquidityTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* APLICACOES FINANCEIRAS */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Qual o principal objetivo das suas aplicações financeiras?{' '}
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() =>
                    this.openModal('investmentMainGoal', investmentMainGoal)
                  }
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.investmentMainGoalTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* PERCA DE 10% */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Considere que seus investimentos percam 10% do valor aplicado.
                Neste caso, o que você faria?{' '}
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() =>
                    this.openModal('tenPercentLossAction', tenPercentLossAction)
                  }
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.tenPercentLossActionTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* FORMACAO ACADEMICA */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Considere que seus investimentos percam 10% do valor aplicado.
                Neste caso, o que você faria?{' '}
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() => this.openModal('education', education)}
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.educationTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* EXPERIENCIA COM INVESTIMENTO */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Como classificaria sua experiência de investimentos?{' '}
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() =>
                    this.openModal('investmentExperience', investmentExperience)
                  }
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.investmentExperienceTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* JA INVESTIU */}

            <View style={{ paddingHorizontal: moderateScale(25) }}>
              <Text style={styles.question}>
                {' '}
                Assinale a alternativa que melhor demonstra quais instrumentos
                você já investiu nos últimos 5 (cinco) anos ou tem conhecimento
                devido a sua formação ou experiência profissional{' '}
              </Text>
              <Text style={styles.questionTwo}>
                (I) Poupança, fundos DI, CDB, Fundos RF
              </Text>
              <Text style={styles.questionTwo}>
                (II) Fundos Multimercados, Títulos Públicos, LCI, LCA.
              </Text>
              <Text style={styles.questionTwo}>
                (III) Fundos de Ações, Ações, Fundos Imobiliários, Debêntures,
                Fundos Cambiais.
              </Text>
              <Text style={styles.questionTwo}>
                (IV) Fundos de Investimento em participação, Derivativos
                (futuros, opções, swaps).
              </Text>
              <View style={styles.pickerInput}>
                <Item
                  style={{ borderBottomColor: 'transparent' }}
                  onPress={() =>
                    this.openModal('investmentGroup', investmentGroup)
                  }
                >
                  <Input
                    style={styles.pickerInputText}
                    value={this.state.investmentGroupTitle}
                    disabled
                    multiline
                    bordered
                    placeholder="Selecione"
                    placeholderTextColor={colors.primary}
                    placeholderStyle={{ fontSize: 18, color: colors.primary }}
                  />
                  <Icon name="angle-down" size={30} color={colors.primary} />
                </Item>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* MERCADO DE VALORES */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Você investiu no mercado de valores mobiliários nos últimos 5
                  (cinco) anos?{' '}
                </Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.itemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  onValueChange={e =>
                    this.setState({
                      investedInLastFiveYears: e,
                    })
                  }
                  selectedValue={this.state.investedInLastFiveYears}
                >
                  <Picker.Item label="Não" value="a" style={styles.picker} />
                  <Picker.Item
                    label="Sim, raramente"
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Sim, frequentemente"
                    value="c"
                    style={styles.picker}
                  />
                </Picker>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* PERCENTUAL DE VALOR */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Qual percentual de sua renda é investido no mercado de valores
                  mobiliários regularmente?{' '}
                </Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.itemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  onValueChange={e =>
                    this.setState({
                      incomeInvestmentPercent: e,
                    })
                  }
                  selectedValue={this.state.incomeInvestmentPercent}
                >
                  <Picker.Item
                    label="Até 10%"
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Entre 11% e 20%"
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Entre 21% e 30%"
                    value="c"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Acima de 30%."
                    value="d"
                    style={styles.picker}
                  />
                </Picker>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* SITUAÇAO PATRIMONIAL */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Informe a sua situação patrimonial{' '}
                </Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.itemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  onValueChange={e =>
                    this.setState({
                      patrimonialSituation: e,
                    })
                  }
                  selectedValue={this.state.patrimonialSituation}
                >
                  <Picker.Item
                    label="Até R$ 100.000,00."
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="De R$ 100.001,00 a R$ 1.000.000,00."
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="De R$ 1.000.001,00 a R$ 10.000.000,00."
                    value="c"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Acima de R$ 10.000.000,00"
                    value="d"
                    style={styles.picker}
                  />
                </Picker>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                onPress={() => this._swiper.scrollBy(1, true)}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Próximo
                </Text>
              </Button>
            </View>

            {/* REMUNERACAO MENSAL */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Qual a sua remuneração mensal?{' '}
                </Text>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon name="arrow-down" style={{ color: colors.primary }} />
                  }
                  style={[styles.itemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  onValueChange={e =>
                    this.setState({
                      monthlyPay: e,
                    })
                  }
                  selectedValue={this.state.monthlyPay}
                >
                  <Picker.Item
                    label="Até R$ 5.000,00"
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="De R$ 5.001,00 a R$ 10.000,00"
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="De R$ 10.001,00 a R$ 30.000,00"
                    value="c"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Acima de R$ 30.000,00."
                    value="d"
                    style={styles.picker}
                  />
                </Picker>
              </View>
              <Button
                standard
                primary
                style={styles.proceedButton}
                // onPress={() => this._swiper.scrollBy(-11, true)}
                onPress={() => this.createPerfilSuitability()}
              >
                <Text style={[styles.proceedButtonText]} uppercase={false}>
                  Finalizar
                </Text>
              </Button>
            </View>
          </Swiper>
        </View>
        <View style={{ flex: 1.0 }} />
      </View>
    );
  }
}

// export default withNavigation(SuitabilitySurveyForm);
export default compose(
  withApollo,
  graphql(CREATE_SUITABILITY_QUESTIONARY, {
    name: 'CREATE_SUITABILITY_QUESTIONARY',
  })
)(withNavigation(SuitabilitySurveyForm));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    // justifyContent: 'space-around',
  },
  modalContainer: {
    flex: 1.0,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: moderateScale(200, 0.5),
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(20),
    alignSelf: 'center',
  },
  wrapper: {
    // flex: 1,
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    marginBottom: 8,
  },
  description: {
    color: colors.secondary_text,
    fontSize: moderateScale(15),
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(10),
  },
  question: {
    color: colors.secondary_text,
    fontSize: moderateScale(18),
    marginBottom: moderateScale(10),
    fontFamily: 'Rubik-Light',
    textAlign: 'center',
    paddingVertical: 8,
  },
  questionTwo: {
    color: colors.secondary_text,
    fontSize: moderateScale(10),
    marginBottom: moderateScale(10),
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    paddingVertical: 8,
  },
  itemInput: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(22),
    color: colors.primary,
  },
  maskedInput: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(22),
  },
  proceedButton: {
    justifyContent: 'center',
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
    alignSelf: 'center',
    width: '65%',
  },
  backButton: {
    color: colors.button_text,
    fontFamily: 'Rubik-Light',
    fontSize: moderateScale(18),
  },
  picker: {
    fontSize: moderateScale(16),
    color: colors.primary,
    fontFamily: 'Rubik-Light',
  },
  pickerContainer: {
    width: '100%',
    // alignSelf: 'center',
    borderRadius: 10,
  },
  proceedButtonText: {
    color: '#fff',
  },
  mainPicker: {
    paddingHorizontal: moderateScale(35),
  },
  pickerInput: {
    //   width: '50%',
    // height: '40%',
    backgroundColor: '#e6e6e6',
  },
  pickerInputText: {
    // height: '100%',
    fontSize: 12.5,
    borderBottomColor: 'transparent',
    color: colors.primary,
  },
  // proceedButton: {
  //   width: Dimensions.get('window').width / 2,
  //   alignSelf: 'center'
  // },
});
