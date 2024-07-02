import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraPage from './pages/CameraPage';
import RecentUploadsPage from './pages/RecentUploadsPage';
import LogoutPage from './pages/LogoutPage';
import GalleryPage from './pages/GalleryPage';
import styles from '../styles/BottomNavStyles';
import CalculatorPage from './pages/CalculatorPage';
import { openGallery, openCamera } from './uploading';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let iconStyle = styles.icon;
          if (route.name === 'Calculator') {
            iconName = 'calculator';
          } else if (route.name === 'Gallery') {
            iconName = 'images';
          } else if (route.name === 'RecentUploads') {
            iconName = 'time';
          } else if (route.name === 'Logout') {
            iconName = 'log-out';
          } else if (route.name === 'Add') {
            iconName = 'add-circle';
            iconStyle = styles.addIcon;
            return <Ionicons name={iconName} size={80} color="#ffa500" style={iconStyle} />;
          }
          return <Ionicons name={iconName} size={size} color={color} style={iconStyle} />;
        },
        tabBarActiveTintColor: '#ffa500',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Calculator" component={CalculatorPage} />
      <Tab.Screen
        name="Gallery"
        component={GalleryPage}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            openGallery(navigation);
          },
        })}
      />
      <Tab.Screen
        name="Add"
        component={CameraPage}
        options={{
          tabBarLabel: () => null,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            openCamera(navigation);
          },
        })}
      />
      <Tab.Screen name="RecentUploads" component={RecentUploadsPage} />
      <Tab.Screen name="Logout" component={LogoutPage} />
    </Tab.Navigator>
  );
};

export default BottomNav;
