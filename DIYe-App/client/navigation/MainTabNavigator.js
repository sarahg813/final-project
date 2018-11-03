import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ShopsScreen from "../screens/ShopScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UploadScreen from "../screens/UploadPicScreen";
import DetailScreen from "../screens/Details";
import CreatePost from "../screens/CreatePostScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const ShopStack = createStackNavigator({
  Shop: ShopsScreen
});

ShopStack.navigationOptions = {
  tabBarLabel: "Shop",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

const UploadStack = createStackNavigator({
  Upload: UploadScreen
});

UploadStack.navigationOptions = {
  tabBarLabel: "Upload",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

const CreatePostStack = createStackNavigator({
  CreatePost: CreatePost
});

CreatePostStack.navigationOptions = {
  tabBarLabel: "Create Post",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ShopStack,
  SettingsStack,
  UploadStack,
  CreatePostStack
});
