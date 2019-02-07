import gql from 'graphql-tag';

const cpfHasAccount = gql`
  query cpfHasAccount($cpf: String!) {
    cpfHasAccount(cpf: $cpf)
  }
`;

const partnersStartingWith = gql`
  query PartnersStartingWith($startingWith: String!) {
    partnersStartingWith(startingWith: $startingWith) {
      id
      user {
        name
      }
    }
  }
`;

const recoverPassaword = gql`
  query emailRetrievePassword($cpf: String!) {
    emailRetrievePassword(cpf: $cpf) {
      success
      email
    }
  }
`;

const stepByStep = gql`
  query clientStepApp($cpf: String!) {
    clientStepApp(cpf: $cpf)
  }
`;

const registrationStep = gql`
  query clientsRegistrationStep {
    clientsRegistrationStep {
      name
    }
  }
`;

export {
  cpfHasAccount,
  partnersStartingWith,
  recoverPassaword,
  stepByStep,
  registrationStep,
};
