import React from 'react';
import { StyleSheet } from 'react-native';

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import {
  SigninScreen,
  LoginScreen,
  ForgotPassScreen,
  CreateAccountScreen,
  CreateAccountTwoScreen,
  CreateAccountThreeScreen,
  CreateAccountFourScreen,
  CreateAccountReviewScreen,
  HomeScreen,
  DashboardScreen,
  PropertyScreen,
  SplashScreen,
  EventScreen,
  LeadManagement,
  OpenHouseScreen,
  CreatePropertyScreen,
  ProfileScreen,
  MortgageScreen,
  StartOpenHouseOneScreen,
  StartOpenHouseTwoScreen,
  StartOpenHouseThreeScreen,
  BuyerActivity,
  BuyerYesActivity,
  BuyerYesOneActivity,
  ThankPropertyScreen,
  BuyerNoActivity,
  BuyerNoOneActivity,
  MyBoardScreen,
  Detail_AttendeeScreen,
  Detail_BrokerScreen,
  SelectMLSScreen,
  StartEventScreen,
  StartEventScreentwo,
  ThankEventScreen,
  EventViewAttendeesScreen,
  PropertyViewAttendeesScreen,
  Question10Screen,
  Question11Screen,
  Question12Screen,
  Question1Screen,
  Question2Screen,
  Question3Screen,
  Question4Screen,
  Question5Screen,
  Question6Screen,
  Question7Screen,
  Question8Screen,
  Question9Screen,
  BrokerFinalScreen,
  BrokerFiveScreen,
  BrokerOneScreen,
  BrokerThreeScreen,
  BrokerTwoScreen,
  BrokerFourScreen,
  AgentScreen,
  AddAddressScreen,
  WebsitesScreen,
  NewspaperScreen,
  BankScreen,
  SignFormScreen,
  CreateEventScreen,
  PDFViewScreen,
  SignFormScreenTwo,
  Question12ScreenTow,
  ContainerdScreen,
  SigninScreenPad,
  TermsScreen,
} from './screens';
// import AddAddressScreen from './screens/HomeScreens/PropertyItemScreens/AddAddressScreen';
// import WebsitesScreen from './screens/HomeScreens/PropertyItemScreens/WebsitesScreen';
// import NewspaperScreen from './screens/HomeScreens/PropertyItemScreens/NewspaperScreen';
// import BankScreen from './screens/HomeScreens/PropertyItemScreens/BankScreen';

const SplashStack = createStackNavigator(
  {
    // signinScreen: SigninScreen,
    signinScreen: {
      screen: SigninScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // splashScreen: SplashScreen,
    splashScreen: {
      screen: SplashScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },
  },
  {
    initialRouteName: 'splashScreen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
// const styles = StyleSheet.create({
//     navigationBarTitleStyle: {
//         // centering for Android
//         flex: 1,
//         textAlign: 'center',
//     }
// });
const NonHeaderStack = createStackNavigator(
  {
    startOpenHouseOneScreen: StartOpenHouseOneScreen,
    startOpenHouseTwoScreen: StartOpenHouseTwoScreen,
    startOpenHouseThreeScreen: StartOpenHouseThreeScreen,
    buyerActivity: BuyerActivity,
    buyerYesActivity: BuyerYesActivity,
    buyerYesOneActivity: BuyerYesOneActivity,
    thankPropertyScreen: ThankPropertyScreen,
    buyerNoActivity: BuyerNoActivity,
    buyerNoOneActivity: BuyerNoOneActivity,
    startEventScreen: StartEventScreen,
    startEventScreentwo: StartEventScreentwo,
    thankEventScreen: ThankEventScreen,
    question10Screen: Question10Screen,
    question11Screen: Question11Screen,
    question12Screen: Question12Screen,
    question1Screen: Question1Screen,
    question2Screen: Question2Screen,
    question3Screen: Question3Screen,
    question4Screen: Question4Screen,
    question5Screen: Question5Screen,
    question6Screen: Question6Screen,
    question7Screen: Question7Screen,
    question8Screen: Question8Screen,
    question9Screen: Question9Screen,
    brokerFinalScreen: BrokerFinalScreen,
    brokerFiveScreen: BrokerFiveScreen,
    brokerOneScreen: BrokerOneScreen,
    brokerThreeScreen: BrokerThreeScreen,
    brokerTwoScreen: BrokerTwoScreen,
    brokerFourScreen: BrokerFourScreen,
    agentScreen: AgentScreen,
    addAddressScreen: AddAddressScreen,
    websitesScreen: WebsitesScreen,
    newspaperScreen: NewspaperScreen,
    bankScreen: BankScreen,
    signFormScreen: SignFormScreen,
    signFormScreenTwo: SignFormScreenTwo,
    question12ScreenTow: Question12ScreenTow,
    containerdScreen: ContainerdScreen
  },
  {
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
);
const AuthStack = createStackNavigator(
  {
    // signin: SigninScreen,
    signin: {
      screen: SigninScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },
    signinScreenPad: SigninScreenPad,
    // login: LoginScreen,
    login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },
    resetpass: ForgotPassScreen,
    creataccount: CreateAccountScreen,
    creataccounttwo: CreateAccountTwoScreen,
    CreateAccountthreeScreen: CreateAccountThreeScreen,
    CreateAccountfourScreen: CreateAccountFourScreen,
    CreateAccountreviewScreen: CreateAccountReviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        gesturesEnabled: false,
      },
    },
  },
);

const HomeStack = createStackNavigator(
  {
    // home: SigninScreen,
    home: {
      screen: SigninScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // homescreen: HomeScreen,
    homescreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },
    // dashboard: DashboardScreen,
    dashboard: {
      screen: DashboardScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },
    // propertyScreen: PropertyScreen,
    propertyScreen: {
      screen: PropertyScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // createPropertyScreen: CreatePropertyScreen,
    createPropertyScreen: {
      screen: CreatePropertyScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // event: EventScreen,
    event: {
      screen: EventScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // leadScreen: LeadManagement,
    leadScreen: {
      screen: LeadManagement,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // openhouseScreen: OpenHouseScreen,
    openhouseScreen: {
      screen: OpenHouseScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // myBoardScreen: MyBoardScreen,
    myBoardScreen: {
      screen: MyBoardScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // profileScreen: ProfileScreen,
    profileScreen: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // mortgageScreen: MortgageScreen,
    mortgageScreen: {
      screen: MortgageScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // detailattendee: Detail_AttendeeScreen,
    detailattendee: {
      screen: Detail_AttendeeScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // detailbroker: Detail_BrokerScreen,
    detailbroker: {
      screen: Detail_BrokerScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // selectmls: SelectMLSScreen,
    selectmls: {
      screen: SelectMLSScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // eventViewAttendeesScreen: EventViewAttendeesScreen,
    eventViewAttendeesScreen: {
      screen: EventViewAttendeesScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // propertyViewAttendeesScreen: PropertyViewAttendeesScreen,
    propertyViewAttendeesScreen: {
      screen: PropertyViewAttendeesScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // createEventScreen: CreateEventScreen,
    createEventScreen: {
      screen: CreateEventScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // pdfViewScreen: PDFViewScreen,
    pdfViewScreen: {
      screen: PDFViewScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

    // termsScreen: TermsScreen,
    termsScreen: {
      screen: TermsScreen,
      navigationOptions: () => ({
        gestureResponseDistance: {
          horizontal: -1,
          vertical: -1,
        },
      }),
    },

  },
  {
    // defaultNavigationOptions:{
    //     headerStyle: {
    //         // backgroundColor: '#3C4252',
    //     },
    //     headerTitleStyle: {
    //         // color: 'black',
    //         // fontFamily: Fonts.primaryRegular,
    //         flex: 1,
    //         textAlign: 'center',
    //     },
    //     headerTintColor: '#000000',
    // }
    defaultNavigationOptions: {
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        gesturesEnabled: false,
      },
    },
  },
);

// const NavStacker = createDrawerNavigator(
//     {
//         HomeStack: {
//             screen: SigninScreen,
//         },
//         // AuthStack: {
//         //     screen: AuthStack,
//         // },
//     },
//     // {
//     //     // contentComponent: DrawerMenu
//     // }
// );

const AppContainer = createAppContainer(
  createSwitchNavigator({ SplashStack, HomeStack, AuthStack, NonHeaderStack }),
);

export default AppContainer;
