import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'

import Checkin from './pages/Checkin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Home from './pages/Home';


const MainNav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: 'Home'
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login'
      }
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        headerTitle: 'Menu',
        headerLeft: null
      }
    },
    Checkin: {
      screen: Checkin,
      navigationOptions: {
        headerTitle: 'Checkin'
      }
    },
    Checkout: {
      screen: Checkout,
      navigationOptions: {
        headerTitle: 'Checkout'
      }
    },
  },
  
)

const App = createAppContainer(MainNav);

export default App;

