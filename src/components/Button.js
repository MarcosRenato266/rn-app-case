import React from 'react';
import { Button, Spinner } from 'native-base';
import colors from '../config/colors';

import { moderateScale } from '../config/scaling';

export default props => {
  const {
    style,
    primary,
    secondary,
    children,
    disabled,
    loading,
    loadingIconColor,
    hideChildrenWhileLoading,
    standard,
    ...otherProps
  } = props;

  let backgroundColor;
  let width;

  if (!disabled && primary) {
    backgroundColor = {
      backgroundColor: colors.primary,
    };
    if (standard) {
      width = {
        width: moderateScale(250),
      };
    } else {
      width = {
        width: '100%',
      };
    }
  } else if (!disabled && secondary) {
    backgroundColor = { backgroundColor: colors.secondary };
  }

  return (
    <Button
      style={[
        this.iconButton ? styles.none : styles.default,
        backgroundColor,
        width,
        style,
      ]}
      disabled={disabled}
      {...otherProps}
    >
      {loading && (
        <Spinner style={styles.defaultSpinner} color={loadingIconColor} />
      )}
      {loading ? !hideChildrenWhileLoading && children : children}
    </Button>
  );
};

const styles = {
  default: {
    height: moderateScale(40),
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultSpinner: {
    width: moderateScale(14),
    height: moderateScale(14),
  },
  none: {},
};
