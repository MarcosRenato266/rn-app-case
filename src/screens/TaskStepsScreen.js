import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { moderateScale } from '../config/scaling';
import Button from '../components/Button';
import TextButton from '../components/TextButton';
import colors from '../config/colors';
import TaskStepsSlide from '../components/TaskStepsSlide';

const stepsData = {
  qrcode: [
    {
      id: 0,
      imagePath: require('../assets/i/step1.png'),
      title: 'Leitura QR Code',
      description:
        'Para validar seu desafio você precisa direcionar a câmera do seu celular para o código QR que se encontra com um dos responsáveis no local onde será realizado seu desafio.',
    },
    {
      id: 1,
      imagePath: require('../assets/i/step2.png'),
      title: 'Dificuldade na Leitura',
      description:
        'Caso enfrente dificuldades na leitura do QR Code você pode utilizas as opções de iluminação na câmera do aplicativo ou aproximar mais o código da câmera do seu celular.',
    },
  ],
  facebook: [
    {
      id: 0,
      imagePath: require('../assets/i/facebookLike.png'),
      title: 'Curta a Página da Odin',
      description:
        'Para validar seu desafio, você será direcionado à página da Odin no Facebook e precisará clicar no botão de Curtir.',
    },
  ],
  facebookShare: [
    {
      id: 0,
      imagePath: require('../assets/i/facebook.png'),
      title: 'Compartilhe nossa Página',
      description:
        'Ajude a Odin a expandir a comunidade Viking! Seu desafio será validado quando você compartilhar o link da Página da Odin no Facebook.',
    },
  ],
  instagram: [
    {
      id: 0,
      imagePath: require('../assets/i/instagram.png'),
      title: 'Seja um seguidor de Odin',
      description: 'Valide seu desafio seguindo a Odin no Instagram.',
    },
  ],
};

export default class TaskStepsScreen extends React.Component {
  forcedSend = false;

  handleActionButtonOnPress = () => {
    const { navigation } = this.props;
    const { taskId, taskValue, taskScope } =
      (navigation && navigation.state && navigation.state.params) || {};
    let screenName = '';
    switch (taskScope) {
      case 'qrcode':
        screenName = 'QRScan';
        break;
      case 'facebook':
      case 'facebookShare':
      case 'instagram':
        screenName = 'SocialPageLikeTask';
        break;
    }
    if (!screenName) return;
    navigation.replace(screenName, { taskId, taskValue });
  };

  handleBackButtonOnPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  get taskScope() {
    const { navigation } = this.props;
    const { taskScope } =
      (navigation && navigation.state && navigation.state.params) || {};
    return taskScope;
  }

  renderSwipeStep = (step, index, maxIndex) => {
    if (index === maxIndex) {
      return (
        <TaskStepsSlide
          image={require('../assets/i/step3.png')}
          key="last_step"
        >
          <Text style={styles.title}>Nos vemos em Valhalla!</Text>
          <Text style={styles.description}>
            Pronto! Agora é só realizar o desafio e receber sua pontuação!
          </Text>
          <Button
            style={styles.actionButton}
            primary
            onPress={this.handleActionButtonOnPress}
          >
            <Text style={styles.actionButtonText}>Realizar desafio</Text>
          </Button>
        </TaskStepsSlide>
      );
    }
    return (
      <TaskStepsSlide image={step.imagePath} key={step.id}>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>
      </TaskStepsSlide>
    );
  };

  render() {
    const taskScope = this.taskScope;
    if (!taskScope && !this.forcedSend) {
      // Send directly to the task action screen
      this.handleActionButtonOnPress();
      this.forcedSend = true;
      return <View style={styles.container} />;
    }

    const steps = stepsData[taskScope];
    const stepViews = [...new Array(steps.length + 1)].map((_, index) => {
      return this.renderSwipeStep(steps[index], index, steps.length);
    });

    return (
      <View style={styles.container}>
        <Swiper
          dotColor="#4d4d4d"
          activeDotColor="#fff"
          loop={false}
          paginationStyle={{ bottom: moderateScale(8) }}
          height={Dimensions.get('window').height}
        >
          {stepViews}
        </Swiper>
        <View style={styles.backButtonContainer}>
          <TextButton
            style={styles.backButton}
            textStyle={styles.backButtonText}
            color={colors.text}
            text="Voltar"
            onPress={this.handleBackButtonOnPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#171717',
    paddingHorizontal: moderateScale(10),
  },
  title: {
    color: '#fff',
    fontSize: moderateScale(26),
    textAlign: 'center',
    fontFamily: 'MontserratBold',
  },
  description: {
    color: '#fff',
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingTop: moderateScale(8),
  },
  actionButton: {
    height: moderateScale(46),
    borderRadius: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(12),
    marginTop: moderateScale(10),
  },
  actionButtonText: {
    color: colors.cardBackground,
    fontSize: moderateScale(14),
    paddingHorizontal: moderateScale(8),
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'MontserratBold',
  },
  backButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: moderateScale(12),
  },
  backButton: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  backButtonText: {
    fontFamily: 'MontserratBold',
    fontSize: moderateScale(14),
  },
};
