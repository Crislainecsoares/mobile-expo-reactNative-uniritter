
import { createStackNavigator, createAppContainer } from 'react-navigation-stack';

import Main from './pages/Login';
import Campus from './pages/Campus';
import Menu from './pages/Menu';
import Checkin from './pages/Checkin';
import Checkout from './pages/Checkout';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Home'
            },
        },
        Campus: {
            screen: Campus,
            navigationOptions: {
                title: 'Campus'
            },
        },
        Menu: {
            screen: Menu,
            navigationOptions: {
                title: 'Menu'
            },
        },
        Checkin: {
            screen: Checkin,
            navigationOptions: {
                title: 'Checkin'
            },
        },
        Checkout: {
            screen: Checkout,
            navigationOptions: {
                title: 'Checkout'
            },
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#363636', //color nome da pagina 
            headerStyle: {
                backgroundColor: '#FF4040' // color do topo da pagina

            },
        },

    })
);

export default Routes; 