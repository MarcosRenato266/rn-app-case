import yup from 'yup';

/*
 * sameAs
 * Usage: sameAs(yup.ref('other_field'), 'Message')
 */

yup.addMethod(yup.mixed, 'sameAs', function(ref, message) {
  return this.test('sameAs', message, function(value) {
    let other = this.resolve(ref);
    return !other || !value || value === other;
  });
});

/*
 * cpf
 * Usage: cpf('Message')
 */
yup.addMethod(yup.mixed, 'cpf', function(message) {
  return this.test('cpf', message, function(value) {
    /*
     * Code from
     * https://github.com/tiagoporto/gerador-validador-cpf/blob/master/src/scripts/CPF_SEPARATE.js#L95
     */
    const cleanCPF = value && value.replace(/\.|-|\s/g, '');
    if (!cleanCPF) {
      return false;
    }
    const firstNineDigits = cleanCPF.substring(0, 9);
    const checker = cleanCPF.substring(9, 11);

    if (cleanCPF.length !== 11) {
      return false;
    }

    // Checking if all digits are equal
    for (let i = 0; i < 10; i++) {
      if (`${firstNineDigits}${checker}` === Array(12).join(i)) {
        return false;
      }
    }

    const checker1 = calcChecker1(firstNineDigits);
    const checker2 = calcChecker2(`${firstNineDigits}${checker1}`);

    if (checker.toString() === checker1.toString() + checker2.toString()) {
      return true;
    } else {
      return false;
    }
  });
});

/*
 * Helper functions
 */
function calcChecker1(firstNineDigits) {
  let sum = null;

  for (let j = 0; j < 9; ++j) {
    sum += firstNineDigits.toString().charAt(j) * (10 - j);
  }

  const lastSumChecker1 = sum % 11;
  const checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;

  return checker1;
}

function calcChecker2(cpfWithChecker1) {
  let sum = null;

  for (let k = 0; k < 10; ++k) {
    sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
  }

  const lastSumChecker2 = sum % 11;
  const checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;

  return checker2;
}

export default yup;
