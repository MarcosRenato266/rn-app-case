import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  Icon,
  Picker,
  Input,
  Form,
  Textarea,
  Item,
  Content,
} from 'native-base';
import Button from './Button';
import VMasker from 'vanilla-masker';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CREATE_SUITABILITY_QUESTIONARY } from '../graphql/mutations';
import Swiper from 'react-native-swiper';
import { withApollo, compose, graphql } from 'react-apollo';
import { _storeData, _getData } from '../lib/AsyncStorage';

class SuitabilitySurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investmentTime: 'a',
      resourcesNecessity: 'a',
      investmentParcelNeedsLiquidity: 'a',
      investmentMainGoal: 'a',
      tenPercentLossAction: 'a',
      education: 'a',
      investmentExperience: 'a',
      investmentGroup: 'a',
      investedInLastFiveYears: 'a',
      incomeInvestmentPercent: 'a',
      patrimonialSituation: 'a',
      monthlyPay: 'a',
      idxActive: 0,
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
    this.state[key] = value;
    const inputMasked = VMasker.toMoney(value);
    this.setState({ [key]: inputMasked, borderBottomColor: colors.primary });
    if (regex.test(this.state[key])) {
      this.setState({ blankField: false });
    }
  };

  createPerfilSuitability = () => {
    let suitabilityInput = {
      investmentTime: this.state.investmentTime,
      resourcesNecessity: this.state.resourcesNecessity,
      investmentParcelNeedsLiquidity: this.state.investmentParcelNeedsLiquidity,
      investmentMainGoal: this.state.investmentMainGoal,
      tenPercentLossAction: this.state.tenPercentLossAction,
      education: this.state.education,
      investmentExperience: this.state.investmentExperience,
      investmentGroup: this.state.investmentGroup,
      investedInLastFiveYears: this.state.investedInLastFiveYears,
      incomeInvestmentPercent: this.state.incomeInvestmentPercent,
      patrimonialSituation: this.state.patrimonialSituation,
      monthlyPay: this.state.monthlyPay,
    };
    console.log('### dados do suitabilty ####', suitabilityInput);
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
        console.log('## data ## ', data);
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

  render() {
    console.log(this.state.idxActive);
    return (
      <View style={styles.mainContainer}>
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

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Tempo desejado de investimento{' '}
                </Text>
                <View style={styles.pickerInput}>
                  <TouchableWithoutFeedback>
                    <Item>
                      <Input
                        style={styles.pickerInputText}
                        value="Sinto-me seguro em tomar minhas decisões de investimento e estou apto a entender e ponderar os riscos associados."
                        disabled
                        multiline={true}
                        bordered
                        placeholder="Textarea"
                      />
                      <Icon active name="home" />
                    </Item>
                  </TouchableWithoutFeedback>
                </View>
                {/* <Picker
                  mode="dropdown"
                  iosIcon={
                    <Icon
                      name="arrow-down"
                      style={{ color: colors.primary }}
                    />
                  }
                  style={[styles.itemInput, styles.pickerContainer]}
                  placeholder="Selecione"
                  placeholderStyle={{ color: colors.primary }}
                  placeholderIconColor={colors.primary}
                  onValueChange={e =>
                    this.setState({
                      investmentTime: e,
                    })
                  }
                  selectedValue={this.state.investmentTime}
                >
                  <Picker.Item
                    label="Até 1 ano"
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="De 1 a 5 anos"
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Mais de 5 anos"
                    value="c"
                    style={styles.picker}
                  />
                </Picker> */}
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

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Em relação aos seus investimentos, qual a necessidade futura
                  dos recursos aplicados?{' '}
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
                      resourcesNecessity: e,
                    })
                  }
                  selectedValue={this.state.resourcesNecessity}
                >
                  <Picker.Item
                    label="Precisarei deste dinheiro como complemento de renda."
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Eventualmente posso precisar utilizar uma parte dos recursos investidos."
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Não tenho necessidade imediata deste dinheiro."
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

            {/* PARCELA DE INVESTIMENTO */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Qual parcela dos seus investimentos precisará de liquidez nos
                  próximos 12 (doze) meses?{' '}
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
                      investmentParcelNeedsLiquidity: e,
                    })
                  }
                  selectedValue={this.state.investmentParcelNeedsLiquidity}
                >
                  <Picker.Item
                    label="81% a 100%"
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="51% a 80%"
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="31% a 50%"
                    value="c"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="0% a 30%"
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

            {/* APLICACOES FINANCEIRAS */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Qual o principal objetivo das suas aplicações financeiras?{' '}
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
                      investmentMainGoal: e,
                    })
                  }
                  selectedValue={this.state.investmentMainGoal}
                >
                  <Picker.Item
                    label="Preservação do patrimônio assumindo um menor risco."
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Uma combinação entre preservação do patrimônio e sua valorização."
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Maximização do potencial de ganho assumindo um maior risco."
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

            {/* PERCA DE 10% */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Considere que seus investimentos percam 10% do valor aplicado.
                  Neste caso, o que você faria?{' '}
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
                      tenPercentLossAction: e,
                    })
                  }
                  selectedValue={this.state.tenPercentLossAction}
                >
                  <Picker.Item
                    label="Venderia toda a posição."
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Manteria a posição."
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Aumentaria a posição."
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

            {/* FORMACAO ACADEMICA */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Qual a sua formação acadêmica?{' '}
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
                      education: e,
                    })
                  }
                  selectedValue={this.state.education}
                >
                  <Picker.Item
                    label="Ensino Fundamental"
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Ensino Médio"
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Ensino Superior"
                    value="c"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Pós-Graduação,Mestrado,Doutorado."
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

            {/* EXPERIENCIA COM INVESTIMENTO */}

            <View>
              <View style={styles.mainPicker}>
                <Text style={styles.question}>
                  {' '}
                  Como classificaria sua experiência de investimentos?{' '}
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
                      investmentExperience: e,
                    })
                  }
                  selectedValue={this.state.investmentExperience}
                >
                  <Picker.Item
                    label="Não possuo experiência"
                    value="a"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Tenho experiência com investimentos com pouca probabilidade de perda."
                    value="b"
                    style={styles.picker}
                  />
                  <Picker.Item
                    label="Sinto-me seguro em tomar minhas decisões de investimento e estou apto a entender e ponderar os riscos associados."
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

            {/* JA INVESTIL */}

            <View>
              <KeyboardAwareScrollView>
                <View style={styles.mainPicker}>
                  <Text style={styles.question}>
                    {' '}
                    Assinale a alternativa que melhor demonstra quais
                    instrumentos você já investiu nos últimos 5 (cinco) anos ou
                    tem conhecimento devido a sua formação ou experiência
                    profissional{' '}
                  </Text>
                  <Text style={styles.questionTwo}>
                    (I) Poupança, fundos DI, CDB, Fundos RF
                  </Text>
                  <Text style={styles.questionTwo}>
                    (II) Fundos Multimercados, Títulos Públicos, LCI, LCA.
                  </Text>
                  <Text style={styles.questionTwo}>
                    (III) Fundos de Ações, Ações, Fundos Imobiliários,
                    Debêntures, Fundos Cambiais.
                  </Text>
                  <Text style={styles.questionTwo}>
                    (IV) Fundos de Investimento em participação, Derivativos
                    (futuros, opções, swaps).
                  </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        name="arrow-down"
                        style={{ color: colors.primary }}
                      />
                    }
                    style={[styles.itemInput, styles.pickerContainer]}
                    placeholder="Selecione"
                    placeholderStyle={{ color: colors.primary }}
                    placeholderIconColor={colors.primary}
                    onValueChange={e =>
                      this.setState({
                        investmentGroup: e,
                      })
                    }
                    selectedValue={this.state.investmentGroup}
                  >
                    <Picker.Item
                      label="Grupo (I)."
                      value="a"
                      style={styles.picker}
                    />
                    <Picker.Item
                      label="Grupos (I) e (II)."
                      value="b"
                      style={styles.picker}
                    />
                    <Picker.Item
                      label="Grupos (I), (II) e (III)."
                      value="c"
                      style={styles.picker}
                    />
                    <Picker.Item
                      label="Grupos (I), (II), (III) e (IV)."
                      value="d"
                      style={styles.picker}
                    />
                    <Picker.Item
                      label="Nenhum destes."
                      value="e"
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
              </KeyboardAwareScrollView>
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
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    paddingVertical: moderateScale(10),
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
  itemInput: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
    color: '#808281',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eae6e5',
    paddingHorizontal: moderateScale(20),
  },
  proceedButtonText: {
    color: '#fff',
  },
  mainPicker: {
    paddingHorizontal: moderateScale(35),
  },
  pickerInput: {
    //   width: '50%',
    height: '40%',
    backgroundColor: '#e6e6e6',
    padding: 5,
  },
  pickerInputText: {
    height: '100%',
    fontSize: 10,
  },
  // proceedButton: {
  //   width: Dimensions.get('window').width / 2,
  //   alignSelf: 'center'
  // },
});
