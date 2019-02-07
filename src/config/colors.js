/* ----------------------------------------
 * Theme (light | dark)
 * --------------------------------------*/

const theme = 'light';

/* ----------------------------------------
 * Brand Colors
 * --------------------------------------*/

const colorSettings = {
  primary: '#a18037',
  accent: '#ac9c77',
  secondary: '#79797d',
  warning: '#cc0000',
  atention: '#ffff00',
};

/* ----------------------------------------
 * Theme Colors
 * --------------------------------------*/

const light = {
  background: '#f8f8f8',
  statusBar: 'rgba(0,0,0,1)',
  text: '#6b6e7e',
  secondary_text: '#a5a6ac',
  light_gray: '#c1c2c5',
  button_text: '#ffffff',
  disabledText: 'rgba(0, 0, 0, 0.38)',
  divider: 'rgba(0, 0, 0, 0.12)',
  border: 'rgba(0, 0, 0, 0.12)',
  cardBackground: '#fff',
  secondaryCardBackground: '#f2f2f2',
  error: '#cb2431',
};

const dark = {
  background: '#FFFFFF',
  statusBar: '#171717',
  text: 'rgba(155, 155, 155, 0.7)',
  secondary_text: 'rgba(0, 0, 0, 0.54)',
  disabledText: 'rgba(255, 255, 255, 0.38)',
  divider: 'rgba(255, 255, 255, 0.12)',
  border: 'rgba(0, 0, 0, 0.12)',
  cardBackground: '#2D2D2D',
  secondaryCardBackground: '#232323',
  error: '#cb2431',
};

/* ----------------------------------------
 * General
 * --------------------------------------*/

const colors = {
  test: '#1abc9c',
  darkText: 'rgba(0, 0, 0, 0.87)',
  ghost: 'rgba(255, 255, 255, 0.6)',
  white02: 'rgba(255, 255, 255, 0.2)',
};

/* ----------------------------------------
 * Don't touch
 * --------------------------------------*/

export default {
  theme,
  ...colorSettings,
  ...(theme === 'light' ? light : dark),
  ...colors,
};
