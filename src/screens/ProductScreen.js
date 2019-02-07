import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Content, Spinner, Text, Icon } from 'native-base';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import colors from '../config/colors';
import { moderateScale } from '../config/scaling';

import Button from '../components/Button';
import ConfirmBuyProductModal from '../components/ConfirmBuyProductModal';

class ProductScreen extends React.Component {
  static navigationOptions = {
    title: 'Produto',
    drawerLabel: () => null,
  };

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleBuyButtonClick = () => {
    this.setModalVisible(true);
  };

  handleModalConfirmButtonClick = () => {
    this.setModalVisible(false);

    const { navigation, product } = this.props;
    if (!product) return;
    this.setState({ loadingBuy: true });

    navigation.navigate('ProductQRScan', {
      productData: {
        id: product.id,
        name: product.name,
      },
    });
  };

  getCantBuyReason = (newCoins, product) => {
    if (newCoins < 0) {
      return 'Pontos insuficientes para comprar o produto';
    }

    const {
      userCanBuy: { canBuy, reason },
    } = product;
    if (canBuy) return null;
    switch (reason) {
      case 'PRODUCT_LIMIT_INDV_REACHED':
        return 'Você não pode comprar esse produto novamente porque já atingiu o limite máximo individual';
      case 'PRODUCT_LIMIT_GLOBAL_REACHED':
        return 'Você não pode comprar esse produto porque o limite máximo global foi atingido';
      default:
        return null;
    }
  };

  render() {
    const { loading, product, userPoints } = this.props;

    if (loading) {
      return (
        <View style={styles.mainContainer}>
          <Spinner style={{ marginTop: 30 }} color={colors.primary} />
        </View>
      );
    }

    if (!product) {
      return (
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.errorBox}>
              <Icon
                style={styles.errorText}
                type="MaterialIcons"
                name="error-outline"
              />
              <Text style={styles.errorText}>
                Error interno! Por favor, tente novamente.
              </Text>
            </View>
          </View>
        </View>
      );
    }

    if (!product.active) {
      return (
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.errorBox}>
              <Icon
                style={styles.errorText}
                type="MaterialIcons"
                name="error-outline"
              />
              <Text style={styles.errorText}>
                O produto não está disponível no momento
              </Text>
            </View>
          </View>
        </View>
      );
    }

    const currentCoins = parseInt(userPoints, 10) || 0;
    const productCoins = parseInt(product.price, 10);
    const newCoins = currentCoins - productCoins;
    const cantBuyReason = this.getCantBuyReason(newCoins, product);
    const buyButtonDisabled = newCoins < 0 || !product.userCanBuy.canBuy;

    return (
      <View style={styles.mainContainer}>
        <Content>
          <ConfirmBuyProductModal
            visible={this.state.modalVisible}
            productName={product.name}
            currentCoins={currentCoins}
            productCoins={productCoins}
            newCoins={newCoins}
            onConfirmPress={this.handleModalConfirmButtonClick}
            onCancelPress={() => this.setModalVisible(!this.state.modalVisible)}
          />

          <View style={styles.mainImageWrapper}>
            <Image
              style={styles.mainImage}
              resizeMode="cover"
              source={{ uri: product.picture }}
            />
            <View style={styles.mainImageColorOverlay} />
          </View>

          <View style={styles.buyButtonContainer}>
            <Button
              primary
              style={styles.buyButton}
              pointerEvents="box-only"
              disabled={buyButtonDisabled}
              onPress={this.handleBuyButtonClick}
            >
              <Icon
                type="MaterialIcons"
                name="shopping-cart"
                style={[
                  styles.buyButtonIcon,
                  buyButtonDisabled && { color: colors.disabledText },
                ]}
              />
            </Button>
          </View>

          <View style={styles.content}>
            <View style={styles.headerRow}>
              <View style={styles.headerColorBar} />
              <View style={styles.headerTextWrapper}>
                <Text style={styles.categoryText}>{product.category}</Text>
                <Text style={styles.titleText}>{product.name}</Text>
                <View style={styles.coinsWrapper}>
                  <Text style={styles.coinsValueText}>{product.price}</Text>
                  <Text style={styles.coinsNameText}>Coins</Text>
                </View>
              </View>
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          </View>
        </Content>
        {cantBuyReason && (
          <View style={styles.cantBuyReasonContainer}>
            <Text style={styles.cantBuyReasonText}>{cantBuyReason}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingBottom: moderateScale(20),
  },
  mainImage: {
    height: moderateScale(320, 0.5, true),
    width: '100%',
  },
  mainImageColorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  buyButtonContainer: {
    height: 70,
    width: 70,
    marginTop: -35,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    overflow: 'hidden',
  },
  buyButton: {
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonIcon: {
    color: colors.darkText,
    fontSize: moderateScale(27),
  },
  content: {
    marginTop: -20,
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerColorBar: {
    backgroundColor: colors.primary,
    width: 7,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    marginRight: 10,
  },
  headerTextWrapper: {
    paddingVertical: 10,
  },
  categoryText: {
    color: colors.secondary_text,
    fontSize: moderateScale(16),
  },
  titleText: {
    color: colors.text,
    fontSize: moderateScale(24),
    fontFamily: 'MontserratBold',
    paddingRight: moderateScale(25),
  },
  coinsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 2,
  },
  coinsPriceLabelText: {
    color: colors.text,
    fontSize: moderateScale(20),
    marginRight: 10,
  },
  coinsValueText: {
    color: colors.text,
    fontSize: moderateScale(20),
    fontFamily: 'MontserratBold',
    marginBottom: moderateScale(-5),
  },
  coinsNameText: {
    color: colors.secondary_text,
    fontSize: moderateScale(11),
    marginLeft: moderateScale(3),
    marginBottom: moderateScale(-1),
  },
  descriptionWrapper: {
    marginTop: 15,
    paddingHorizontal: moderateScale(20),
  },
  descriptionText: {
    color: colors.secondary_text,
    marginBottom: moderateScale(25),
  },
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  errorText: {
    marginTop: 7,
    color: colors.text,
    textAlign: 'center',
  },
  cantBuyReasonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cantBuyReasonText: {
    color: colors.text,
    textAlign: 'center',
  },
});

const getProductQuery = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      category
      price
      picture
      active
      maxQuantityGlobal
      maxQuantityIndividual
      userCanBuy {
        canBuy
        reason
      }
    }
    me {
      id
      points
    }
  }
`;

export default graphql(getProductQuery, {
  options: ({ navigation }) => {
    const { productId } =
      (navigation && navigation.state && navigation.state.params) || {};

    return {
      variables: {
        id: productId,
      },
    };
  },
  props: ({ data: { product, me, loading } }) => ({
    product,
    userPoints: me && me.points,
    loading,
  }),
})(ProductScreen);
