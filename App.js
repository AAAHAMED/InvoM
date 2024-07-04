import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './components/LoadingScreen.js';
import WelcomePage from './components/pages/login/WelcomePage';
import LoginPage from './components/pages/login/LoginPage';
import BottomNav from './components/BottomNav';
import CameraPage from './components/pages/add/CameraPage';
import CalculatorPage from './components/pages/home/CalculatorPage';
import GalleryPage from './components/pages/gallery/GalleryPage';
import LogoutPage from './components/pages/LogoutPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={BottomNav} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="CalculatorPage" component={CalculatorPage} />
        <Stack.Screen name="GalleryPage" component={GalleryPage} />
        <Stack.Screen name="Logout" component={LogoutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
