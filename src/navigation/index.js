import {
  SafeAreaView,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import React from 'react';
import { Platform } from 'react-native';
//import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import screens from '../screens';
import AssociatedDashboardSidebar from '../screens/AssociatedDashboardSidebar';

// import { _getData } from '../lib/AsyncStorage';

// We already have a status bar from expo
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0);
}

const defaultStack = createStackNavigator(
  {
    AppInitial: {
      screen: screens.AppInitialScreen, // 0
    },
    Home: {
      screen: screens.CpfCheckScreen, // 0
    },
    Login: {
      screen: screens.LoginScreen,
    },
    SelectAssociate: {
      screen: screens.SelectAssociateScreen, // 2
    },
    EmailRegister: {
      screen: screens.EmailRegisterScreen,
    },
    AssociatedSelected: {
      screen: screens.AssociatedSelectedScreen,
    },
    Welcome: {
      screen: screens.WelcomeScreen, // 3
    },
    Survey: {
      screen: screens.SurveyScreen,
    },
    WaitingIndication: {
      screen: screens.WaitingIndicationScreen,
    },
    BindingSuccess: {
      screen: screens.BindingSuccessScreen,
    },
    SecuritySteps: {
      screen: screens.SecurityStepsScreen, // 5
    },
    ProcessingData: {
      screen: screens.ProcessingDataScreen,
    },
    SignaturePicture: {
      screen: screens.SignaturePictureScreen,
    },
    CpfPicture: {
      screen: screens.CpfPictureScreen,
    },
    RgPicture: {
      screen: screens.RgPictureScreen,
    },
    ConfirmData: {
      screen: screens.ConfirmDataScreen,
    },
    DataValidation: {
      screen: screens.DataValidationScreen, // 4
    },
    MembershipTerms: {
      screen: screens.MembershipTermsScreen,
    },
    SuccessfullRegistration: {
      screen: screens.SuccessfullRegistrationScreen,
    },
    ApprovedRegistration: {
      screen: screens.ApprovedRegistrationScreen,
    },
    FailedRegistration: {
      screen: screens.FailedRegistrationScreen,
    },
    SecurityQuestion: {
      screen: screens.SecurityQuestionScreen, // 6
    },
    RegisterPattern: {
      screen: screens.RegisterPatternScreen,
    },
    AssociatedAccepted: {
      screen: screens.AssociatedAcceptedScreen,
    },
    WaitingFetch: {
      screen: screens.WaitingFetchScreen,
    },
    AssociatedLogin: {
      screen: screens.AssociatedLoginScreen,
    },
    NewAssociateQuiz: {
      screen: screens.NewAssociateQuizScreen,
    },
    NewAssociateSuccess: {
      screen: screens.NewAssociateSuccessScreen,
    },
    AssociatedDashboard: {
      screen: screens.AssociatedDashboardScreen,
    },
    AssociatedCustomer: {
      screen: screens.AssociatedCustomerScreen,
    },
    CustomerDataValidation: {
      screen: screens.CustomerDataValidation,
    },
    AssociatedNotifications: {
      screen: screens.AssociatedNotificationsScreen,
    },
    SuitabilitySurvey: {
      screen: screens.SuitabilitySurveyScreen, // 7
    },
    InvestorResult: {
      screen: screens.InvestorResultScreen,
    },
    AddressProof: {
      screen: screens.AddressProofScreen,
      index: 7,
    },
    PasswordScreen: {
      screen: screens.CreatePasswordScreen, // 1
    },
    UploadDocAnalysis: {
      screen: screens.UploadDocAnalysis,
    },
    AndroidPhotoUpload: {
      screen: screens.AndroidPhotoUpload,
    },
    CredenciaisCad: {
      screen: screens.CredenciaisCad,
    },
    RecoverPassword: {
      screen: screens.RecoverPassword,
    },
    WebViewTools: {
      screen: screens.WebViewToolsScreen,
    },
    PoliticallyExposed: {
      screen: screens.politicallyExposedScreen,
    },
    TaxInformation: {
      screen: screens.TaxInformation,
    },
    WaitingPartner: {
      screen: screens.WaitingPartnerScreen,
    },
    SuitabilitySurveyAndroid: {
      screen: screens.SuitabilitySurveyAndroidScreen,
    },
  },
  {
    // initialRouteName: 'TaxInformation',
    initialRouteName: 'AppInitial',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const RootNavigator = createStackNavigator(
  {
    Main: defaultStack,
  },
  {
    headerMode: 'none',
  }
);

const HomeScreenRouter = createDrawerNavigator(
  {
    Main: RootNavigator,
    AssociatedDashboardSidebar: {
      screen: AssociatedDashboardSidebar,
    },
  },
  {
    contentComponent: props => <AssociatedDashboardSidebar {...props} />,
  }
);

export default () => <HomeScreenRouter />;
