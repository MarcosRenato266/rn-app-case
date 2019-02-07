import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import Modal from 'react-native-modal';
import { moderateScale } from '../config/scaling';
import colors from '../config/colors';

import Button from './Button';

export default ({
  visible,
  style,
  productName,
  currentCoins,
  productCoins,
  newCoins,
  onConfirmPress,
  onCancelPress,
}) => (
  <Modal
    isVisible={visible}
    style={styles.modalWrapper}
    hideModalContentWhileAnimating
    useNativeDriver
  >
    <View style={[styles.container, style]}>
      <View>
        <Text style={styles.headerContainer}>
          <Text style={styles.headerText}>Deseja comprar o produto </Text>
          <Text style={[styles.headerText, styles.productNameText]}>
            {productName}
          </Text>
          <Text style={styles.headerText}>?</Text>
        </Text>
        <View style={styles.rowsContainer}>
          <View style={styles.dataRow}>
            <Text style={styles.dataText}>Saldo atual</Text>
            <Text style={styles.dataNumberText}>{currentCoins}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataText}>Preço</Text>
            <Text style={styles.dataNumberText}>- {productCoins}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.dataRow}>
            <Text style={styles.dataText}>Novo saldo</Text>
            <Text style={styles.dataNumberText}>{newCoins}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.actionButton}
            transparent
            onPress={onCancelPress}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Button>
          <Button
            style={styles.actionButton}
            transparent
            onPress={onConfirmPress}
          >
            <Text style={styles.confirmButtonText}>Comprar</Text>
          </Button>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalWrapper: {},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: moderateScale(15),
    borderRadius: 7,
    elevation: 4,
  },
  headerContainer: {
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
  },
  headerText: {
    color: colors.text,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  productNameText: {
    color: colors.primary,
    margin: 5,
  },
  rowsContainer: {
    padding: moderateScale(20),
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataText: {
    color: colors.text,
    fontFamily: 'MontserratBold',
    fontSize: moderateScale(16),
  },
  dataNumberText: {
    color: colors.text,
    fontFamily: 'MontserratBold',
    fontSize: moderateScale(19),
  },
  divider: {
    marginVertical: 5,
    height: 2,
    width: '100%',
    backgroundColor: colors.divider,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: moderateScale(10),
  },
  cancelButtonText: {
    color: colors.secondary_text,
  },
  confirmButtonText: {
    color: colors.primary,
  },
});
