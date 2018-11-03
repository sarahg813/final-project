import React from 'react';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator({
  
  AuthLoading: AuthLoadingScreen,
  
  Auth: AuthStack,

  Main: MainTabNavigator,
},
{
  initialRouteName: "AuthLoading"
}


);