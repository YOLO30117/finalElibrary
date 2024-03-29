import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Search from './screens/Search';
import Transaction from './screens/Transaction';
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return <AppContainer />;
}
const tabNavigator = createBottomTabNavigator(
  {
    Transaction: { screen: Transaction },
    Search: { screen: Search },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === 'Transaction') {
          return (
            <Image
              source={require('./assets/transactionImg.png')}
              style={{ width: 40, height: 40 }}
            />
          );
        }
         else if (routeName === 'Search') {
          return (
            <Image
              source={require('./assets/searchingbook.png')}
              style={{ width: 40, height: 40 }}
            />
          );
        }
      },
    }),
  }
);
const switchNavigtor = createSwitchNavigator({
  LoginScreen : {screen : LoginScreen},
  Screen2 : {screen : tabNavigator}
})
const AppContainer = createAppContainer(switchNavigtor);
