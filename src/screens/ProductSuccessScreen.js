import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { StyleSheet, Image, Text, View } from 'react-native';
import { moderateScale } from '../config/scaling';
import Button from '../components/Button';
import colors from '../config/colors';

class ProductSuccessScreen extends React.Component {
  static navigationOptions = {
    title: 'Product Success',
  };

  componentDidMount() {
    // Refetch the user and product from the server so
    // when he come back to the product screen it
    // will be updated with the new state from server
    this.props.refetchUser();
    this.props.refetchProduct();
  }

  handleContinueButtonPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const { productData } =
      (navigation && navigation.state && navigation.state.params) || {};

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/i/success.png')}
            style={styles.successImage}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Compra efetuada com sucesso!</Text>
          <View style={styles.newProductContainer}>
            <Text style={styles.newProductText}>Produto obtido: </Text>
            <Text style={styles.newProductNameText}>{productData.name}</Text>
          </View>
          <Button
            style={styles.actionButton}
            primary
            onPress={this.handleContinueButtonPress}
          >
            <Text style={styles.actionButtonText}>Continuar</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'flex-end',
    width: '100%',
    height: '40%',
  },
  successImage: {
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    width: '75%',
    height: '75%',
  },
  content: {
    marginTop: 20,
  },
  text: {
    fontFamily: 'MontserratBold',
    color: colors.text,
    fontSize: moderateScale(24),
    textAlign: 'center',
    paddingTop: moderateScale(8),
  },
  newProductContainer: {
    paddingVertical: moderateScale(25),
  },
  newProductText: {
    fontFamily: 'MontserratBold',
    color: colors.text,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  newProductNameText: {
    fontFamily: 'MontserratBold',
    color: colors.primary,
    fontSize: moderateScale(22),
    textAlign: 'center',
  },
  actionButton: {
    height: moderateScale(46),
    borderRadius: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(12),
  },
  actionButtonText: {
    color: colors.button,
    fontSize: moderateScale(14),
    paddingHorizontal: moderateScale(8),
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'MontserratBold',
  },
});

const getProductQuery = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      userCanBuy {
        canBuy
        reason
      }
    }
  }
`;

const getUserQuery = gql`
  query GetMe {
    me {
      id
      points
    }
  }
`;

export default compose(
  graphql(getProductQuery, {
    options: ({ navigation }) => {
      const { productData } =
        (navigation && navigation.state && navigation.state.params) || {};

      return { variables: { id: productData.id } };
    },
    props: ({ data: { refetch } }) => ({
      refetchProduct: refetch,
    }),
  }),
  graphql(getUserQuery, {
    props: ({ data: { refetch } }) => ({
      refetchUser: refetch,
    }),
  })
)(ProductSuccessScreen);
