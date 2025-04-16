import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeMainStack, AppSettingStack } from './Stack';
import HomeIcon from 'react-native-vector-icons/Foundation';
import SettingIcon from 'react-native-vector-icons/Ionicons';


// Tab 네비게이션

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#0E66F2',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    display: 'flex',
                },
            }}
        >
            <Tab.Screen
                name='Home' 
                component={HomeMainStack} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <HomeIcon name="home" color={focused ? '#0E66F2' : 'black'} size={25} />
                    ),
                }}
            />
            <Tab.Screen 
                name='Setting' 
                component={AppSettingStack} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <SettingIcon name="settings-sharp" color={focused ? '#0E66F2' : 'black'} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
    
};

export default TabNavigator;
