import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, TouchableOpacity } from 'react-native';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          headerLeft: () => (
            <Image
              source={require('./assets/splash-icon.png')}
              style={{
                width: 80,
                height: 80,
                marginLeft: 15,
                borderRadius: 20,
              }}
            />
          ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.navigate('Search')}
              
          //     style={{ marginRight: 15 }}
          //   >
          //     <MaterialIcons name="search" size={24} color="#FFF" />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={24} color={color} />
          ),
          headerLeft: () => (
            <Image
              source={require('./assets/splash-icon.png')}
              style={{
                width: 80,
                height: 80,
                marginLeft: 15,
                borderRadius: 20,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
