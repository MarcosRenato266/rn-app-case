import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withApollo, graphql, compose } from 'react-apollo';
import { Container, Text } from 'native-base';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';
import buyProductQuery from '../graphql/buyProduct';
import AlertContainer from '../components/AlertContainer';
import QRScannerVisor from '../components/QRScannerVisor';

class ProductQRScanScreen extends React.Component {
  static navigationOptions = {
    title: 'Product QR Scan',
  };

  state = {
    cameraAreaSize: 0,
    cameraVerticalMargin: 0,
    cameraHorizontalMargin: 0,
    hasCameraPermission: null,
    cameraReady: false,
    loadingQRCode: false,
  };

  blockQRReading = false;

  handleCameraContainerOnLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    const size = Math.min(width, height) * 0.8;
    const cameraVerticalMargin = (height - size) / 2;
    const cameraHorizontalMargin = (width - size) / 2;
    this.setState({
      cameraVerticalMargin,
      cameraHorizontalMargin,
      cameraAreaSize: size,
    });
  };

  handleOnBarCodeRead = value => {
    if (this.blockQRReading) return;
    this.blockQRReading = true;
    this.setState({ loadingQRCode: true });
    this.buyProduct(value);
  };

  extractErrorMessage = message => {
    if (message && message.indexOf('ER_INVALID_BUY_PASSWORD') >= 0) {
      return 'QR Code inválido';
    }
    if (message && message.indexOf('ER_NOT_ENOUGH_COINS') >= 0) {
      return 'Pontos insuficientes';
    }
    if (message && message.indexOf('ER_PRODUCT_LIMIT_INDV_REACHED') >= 0) {
      return 'O limite de compras individuais do produto foi atingido';
    }
    if (message && message.indexOf('ER_PRODUCT_LIMIT_GLOBAL_REACHED') >= 0) {
      return 'O limite de compras do produto foi atingido';
    }
    if (message && message.indexOf('Network error') >= 0) {
      return 'Erro de conexão';
    }
    return 'Erro interno';
  };

  handleBackButtonPress = () => {
    this.props.navigation.goBack();
  };

  buyProduct = code => {
    const { navigation, buyProduct } = this.props;

    const { productData } =
      (navigation && navigation.state && navigation.state.params) || {};

    if (!productData.id) {
      return AlertContainer.show({
        message: 'Tarefa inválida',
        buttonText: 'Fechar',
        onClose: () => navigation.goBack(),
      });
    }

    buyProduct({
      variables: {
        input: {
          productId: productData.id,
          code,
        },
      },
    })
      .then(res => {
        if (res && res.data && res.data.buyProduct === true) {
          navigation.replace('ProductSuccess', { productData });
        } else {
          this.setState({ loadingQRCode: false });
          this.blockQRReading = true;
          AlertContainer.show({
            message: 'QR Code inválido!',
            buttonText: 'Tentar novamente',
            onClose: () => (this.blockQRReading = false),
          });
        }
      })
      .catch(err => {
        const message = this.extractErrorMessage(err.message);
        this.setState({ loadingQRCode: false });
        this.blockQRReading = true;
        AlertContainer.show({
          message,
          buttonText: 'Tentar novamente',
          onClose: () => (this.blockQRReading = false),
        });
      });
  };

  get headerMessage() {
    const { navigation } = this.props;
    const { productData } =
      (navigation && navigation.state && navigation.state.params) || {};
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.confirmProductBuyText}>
          Confirme a compra do produto
        </Text>
        <Text style={styles.productNameText}>{productData.name}</Text>
      </View>
    );
  }

  render() {
    const { loadingQRCode } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Container style={styles.container}>
          <QRScannerVisor
            loading={loadingQRCode}
            onBarCodeRead={this.handleOnBarCodeRead}
            renderBackButton
            onBackButtonPress={this.handleBackButtonPress}
            renderMessage={this.headerMessage}
          />
        </Container>
      </View>
    );
  }
}

export default compose(graphql(buyProductQuery, { name: 'buyProduct' }))(
  withApollo(ProductQRScanScreen)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    justifyContent: 'center',
  },
  confirmProductBuyText: {
    color: colors.text,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  productNameText: {
    color: colors.primary,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
    fontSize: moderateScale(23),
  },
});
