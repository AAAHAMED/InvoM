import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomePage from './components/pages/WelcomePage';
import LoginPage from './components/pages/LoginPage';
import BottomNav from './components/BottomNav';
import CameraPage from './components/pages/CameraPage';
import CalculatorPage from './components/pages/CalculatorPage';
import GalleryPage from './components/pages/GalleryPage';
import ImageNamePage from './components/pages/ImageNamePage';
import SuccessPage from './components/pages/SuccessPage';
import LogoutPage from './components/pages/LogoutPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={BottomNav} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="CalculatorPage" component={CalculatorPage} />
        <Stack.Screen name="GalleryPage" component={GalleryPage} />
        <Stack.Screen name="ImageName" component={ImageNamePage} />
        <Stack.Screen name="Success" component={SuccessPage} />
        <Stack.Screen name="Logout" component={LogoutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
