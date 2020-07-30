import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from './screens/home/HomeScreen'
import MessageScreen from "./screens/MessageScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostScreen from "./screens/PostScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { enableScreens } from "react-native-screens";
import globalStorage from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FlappyRocket from './game_screens/FlappyRocket'
import BoxDropping from './game_screens/BoxDropping'
enableScreens();
const AppBottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
        ),
      },
    },
    Message: {
      screen: MessageScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-chatboxes"
            size={24}
            color={tintColor}
          ></Ionicons>
        ),
      },
    },
    Post: {
      screen: PostScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-add-circle"
            size={24}
            color={"#E9446A"}
            style={{
              shadowColor: "#E9446A",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 10,
              shadowOpacity: 0.3,
            }}
          ></Ionicons>
        ),
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-notifications"
            size={24}
            color={tintColor}
          ></Ionicons>
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-person"
            size={24}
            color={tintColor}
          ></Ionicons>
        ),
      },
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Home",
  }
)
const GameStack = createStackNavigator(
  {
    FlappyRocket: FlappyRocket,
    BoxDropping: BoxDropping
  },
  {
    headerMode: 'none'
  }
)
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: "none",
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppBottomNavigator,
      Auth: AuthStack,
      Game: GameStack
    },
    {
      initialRouteName: "Loading",
    }
  )
);
export default function App() {
  return (
    <Provider store={globalStorage.store}>
      <PersistGate loading={null} persistor={globalStorage.persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
