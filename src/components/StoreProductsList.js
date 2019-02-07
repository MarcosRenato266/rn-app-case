import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Spinner } from 'native-base';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';

class StoreProductsList extends React.Component {
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  handleProductOnPress = id => {
    const { navigation } = this.props;
    // TODO: change to ProductDetails
    setTimeout(() => navigation.navigate('Product', { productId: id }), 0);
  };

  refresh = () => {
    return this.props.refetch();
  };

  render() {
    const { loading, productsData } = this.props;
    const listData = productsData || [];

    return (
      <View>
        {loading && (
          <View>
            <Spinner color={colors.primary} />
          </View>
        )}
        {!loading && (
          <FlatList
            data={listData}
            keyExtractor={productData => productData.product.id}
            renderItem={({ item }) => (
              <ProductCard
                id={item.product.id}
                style={styles.productCard}
                name={item.product.name}
                category={item.product.category}
                price={item.product.price}
                available={item.availableToBuy}
                onPress={this.handleProductOnPress}
                image={{ uri: item.product.picture }}
              />
            )}
          />
        )}
        {!loading && listData.length === 0 && (
          <View style={styles.noProductsContainer}>
            <Text style={styles.noProductsText}>
              Não há nenhum produto disponível no momento, verifique novamente
              mais tarde.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productCard: {
    marginBottom: 10,
  },
  noProductsContainer: {
    backgroundColor: colors.cardBackground,
    padding: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProductsText: {
    color: colors.text,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});

const userStoreProductsQuery = gql`
  query GetUserStoreProducts {
    me {
      id
      storeProducts {
        product {
          id
          name
          category
          price
          picture
        }
        availableToBuy
      }
    }
  }
`;

export default graphql(userStoreProductsQuery, {
  props: ({ data: { me, loading, refetch } }) => ({
    productsData: me && me.storeProducts,
    loading,
    refetch,
  }),
})(withNavigation(StoreProductsList));
