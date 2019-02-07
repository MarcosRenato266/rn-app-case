import VMasker from 'vanilla-masker';

const cpfRegex = value => {
  return (value || '').toString().replace(/[^\d]/g, '');
};

const fieldsMask = (value, key) => {
  let inputMasked = value;
  if (key === 'cpf' || key.includes('Cpf')) {
    inputMasked = VMasker.toPattern(value, '999.999.999-99');
  } else if (key.includes('date') || key.includes('day')) {
    inputMasked = VMasker.toPattern(value, '99/99/9999');
  } else if (key === 'mobilePhone') {
    inputMasked = VMasker.toPattern(value, '(99) 99999-9999');
  } else if (key.includes('phone')) {
    inputMasked = VMasker.toPattern(value, '(99) 99999-9999');
  } else if (key.includes('money') || key.includes('state')) {
    inputMasked = VMasker.toMoney(value);
  } else if (key.includes('Number') || key === 'identification') {
    inputMasked = VMasker.toNumber(value);
  } else if (key === 'zipCode') {
    inputMasked = VMasker.toPattern(value, '99999-999');
  } else if (key.includes('time')) {
    inputMasked = VMasker.toPattern(value, '99:99');
  }
  return inputMasked;
};

const unMask = value => {
  const regex = /[^a-zA-Z0-9]/g;
  return (value || '').toString().replace(regex, '');
};

export { cpfRegex, fieldsMask, unMask };
