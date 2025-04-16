import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SetInviteCodeMemberScreen from '../setInviteCodeTabScreens/SetInviteCodeMemberScreen';
import SetInviteCodeGuestScreen from '../setInviteCodeTabScreens/SetInviteCodeGuestScreen';

const Tab = createMaterialTopTabNavigator();

export default function TopBarNavigation({route}) {
    const { data } = route.params || '';
  return (
    <Tab.Navigator
          initialRouteName="SetInviteCodeMemberScreen"
          screenOptions={{
              tabBarActiveTintColor: '#050953',
              tabBarLabelStyle: { fontSize: 14, color : '#050953' },
              tabBarStyle: { backgroundColor: 'white' },
          }}
      >
          <Tab.Screen
              name="SetInviteCodeMemberScreen"
              component={SetInviteCodeMemberScreen}
              options={{ tabBarLabel: 'MEMBER' }}
              initialParams={{ "rdlSeq" : data.rdlSeq }}
              />
              
          <Tab.Screen
              name="SetInviteCodeGuestScreen"
              component={SetInviteCodeGuestScreen}
              options={{ tabBarLabel: 'GUEST' }}
              initialParams={{ "rdlSeq" : data.rdlSeq }} />
      </Tab.Navigator>
  );
}