import gql from 'graphql-tag';

const SUBMIT_INITIAL_CONTACT = gql`
  mutation SubmitInitialContact($input: SubmitInitialContactInput!) {
    submitInitialContact(input: $input)
  }
`;

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      cpf
    }
  }
`;

const SET_PATTERN_PASSWORD = gql`
  mutation SetPatternPassword($input: SetPatternPasswordInput!) {
    setPatternPassword(input: $input)
  }
`;

const SECURITY_QUESTION = gql`
  mutation CreateSecurityQuestion($input: SecurityQuestionInput!) {
    createSecurityQuestion(input: $input)
  }
`;

const CREATE_SUITABILITY_QUESTIONARY = gql`
  mutation CreateSuitabilityQuestionary(
    $input: CreateSuitabilityQuestionaryInput!
  ) {
    createSuitabilityQuestionary(input: $input)
  }
`;

const PHOTO_DOCUMENTS_UPLOAD = gql`
  mutation uploadClientDocument($input: UploadClientDocumentInput!) {
    uploadClientDocument(input: $input)
  }
`;
const USER_CLIENT = gql`
  mutation createClient {
    createClient {
      id
    }
  }
`;

const PARTNER_FOR_CLIENT = gql`
  mutation ClientRequestPartner($input: SelectRequestPartnerInput!) {
    clientRequestPartner(input: $input)
  }
`;

const SET_INVESTOR_DATA = gql`
  mutation createInvestorData(
    $input: CreateInvestorDataInput!
    $inputProfessional: CreateProfessionalInput!
    $inputBankAccountOne: CreateBankingDataInput!
    $inputBankAccountTwo: CreateBankingDataInput!
  ) {
    createInvestorData(
      input: $input,
      inputProfessional: $inputProfessional,
      inputBankAccountOne: $inputBankAccountOne,
      inputBankAccountTwo: $inputBankAccountTwo
    ) {
      id
    }
  }
`;

const POLITICALLY_EXPOSED_PERSON = gql`
  mutation createRelevantPublicFunction(
    $input: CreateRelevantPublicFunctionInput!
  ) {
    createRelevantPublicFunction(input: $input) {
      id
    }
  }
`;

const LINK_WITH_PUBLIC_AGENT = gql`
  mutation createLinkWithPublicAgent($input: CreateLinkWithPublicAgentInput!) {
    createLinkWithPublicAgent(input: $input) {
      id
    }
  }
`;

const TAX_INFORMATION = gql`
  mutation createNationalityTaxOrVisa(
    $input: CreateNationalityTaxOrVisaInput!
  ) {
    createNationalityTaxOrVisa(input: $input) {
      id
    }
  }
`;

export {
  REGISTER_USER,
  SET_PATTERN_PASSWORD,
  SUBMIT_INITIAL_CONTACT,
  SECURITY_QUESTION,
  CREATE_SUITABILITY_QUESTIONARY,
  PHOTO_DOCUMENTS_UPLOAD,
  USER_CLIENT,
  PARTNER_FOR_CLIENT,
  SET_INVESTOR_DATA,
  POLITICALLY_EXPOSED_PERSON,
  TAX_INFORMATION,
  LINK_WITH_PUBLIC_AGENT,
};
