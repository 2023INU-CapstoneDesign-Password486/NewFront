import React, {useLayoutEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InitScreen from '../InitScreen';
import LoginScreen from '../LoginScreen';
import HomeMainScreen from '../HomeMainScreen';
import AppSettingScreen from '../AppSettingScreen';
import SomethingScreen from '../appSettings/SomethingScreen';
import DoorlockSettingScreen from '../DoorlockSettingScreen';
import LoadingNFCScreen from '../LoadingNFCScreen';
import TopBarNavigation from '../navigations/TopTab';

// 간편 비밀번호 페이지
import LoginPasswordScreen from '../loginPassword/LoginPasswordScreen';
import SetLoginPasswordScreen from '../loginPassword/SetLoginPasswordScreen';
import CheckLoginPasswordScreen from '../loginPassword/CheckLoginPasswordScreen';

import TabNavigator from './Tab';

// 도어락 세부설정 페이지 import
import SetResetPassScreen from "../doorlockSettings/SetResetPassScreen";
import SetLogScreen from "../doorlockSettings/SetLogScreen";
import SetAuthScreen from "../doorlockSettings/SetAuthScreen";
import SetAIScreen from "../doorlockSettings/SetAIScreen";
import DeleteKeyScreen from "../doorlockSettings/DeleteKeyScreen";
import SetInviteCodeScreen from "../doorlockSettings/SetInviteCodeScreen";

// 도어락 검색 페이지 import
import SearchCameraScreen from '../RegistDoorlock/SearchCameraScreen';
import SearchSerialScreen from '../RegistDoorlock/SearchSerialScreen';
import RegistDoorlockNameScreen from '../RegistDoorlock/RegistDoorlockNameScreen';

// 초대코드 검색 및 등록 페이지 import
import SearchInviteCodeScreen from '../inviteMembers/SearchInviteCodeScreen';
import RegistInviteCodeScreen from '../inviteMembers/RegistInviteCodeScreen';


const Stack = createStackNavigator();


/**
 * 도어락 검색 및 등록
 */

export const HomeMainStack = () => (
    <Stack.Navigator initialRouteName="HomeMainScreen">
        <Stack.Screen 
            name="HomeMainScreen" 
            component={HomeMainScreen}
            options={{ headerShown: false }}  // 뒤로가기 헤더 감추기
        />
    </Stack.Navigator>
);


/**
 * AppSettingScreen -> 앱 세부설정 screen (뒤로가기)
 */

export const AppSettingStack = () => (
    <Stack.Navigator initialRouteName="AppSettingScreen">
        <Stack.Screen 
            name="AppSettingScreen" 
            component={AppSettingScreen}
            options={{ title: 'AppSetting', headerShown: false }} // 뒤로가기 헤더 감추기
        />
        <Stack.Screen 
            name="SomethingScreen" 
            component={SomethingScreen}
        />
    </Stack.Navigator>
);


/*
 * DoorlockSettingScreen -> 각 도어락 세부설정 screen (뒤로가기)
*/

export const DoorlockSettingStack = ({ route, navigation }) => {
    const { data } = route.params || '';
    // console.log("DoorlockSettingStack :: ",data);

    // DoorlockSettingStack(302호) 등록된 nfc 이름으로 셋팅
    useLayoutEffect(() => {
        navigation.setOptions({
          title: data.rdlName
        });
    });

    return (
        <Stack.Navigator initialRouteName="DoorlockSettingScreen">
            <Stack.Screen 
                name="DoorlockSettingScreen" 
                component={DoorlockSettingScreen}
                options={{ title: 'DoorlockSetting', headerShown: false }} // 뒤로가기 헤더 감추기
                initialParams={{ data: data }} 
            />
            <Stack.Screen 
                name="SetResetPassScreen" 
                component={SetResetPassScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="SetLogScreen" 
                component={SetLogScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SetAuthScreen"
                component={SetAuthScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SetAIScreen"
                component={SetAIScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DeleteKeyScreen"
                component={DeleteKeyScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SetInviteCodeScreen"
                component={SetInviteCodeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="TopBarNavigation"
                component={TopBarNavigation}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};


/*
 * 도어락 검색 및 NFC 등록 Stack
*/

export const RegistDoorlockStack = () => (
    <Stack.Navigator initialRouteName="SearchCameraScreen">
        <Stack.Screen
            name="SearchCameraScreen"
            component={SearchCameraScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SearchSerialScreen"
            component={SearchSerialScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="RegistDoorlockNameScreen"
            component={RegistDoorlockNameScreen}
            options={{ headerShown: false }}
        />

    </Stack.Navigator>
)

/**
 * 초대 코드 검색 및 NFC 등록 Stack
 */

export const RegistIntviteCodeStack = () => (
    <Stack.Navigator initialRouteName="SearchInviteCodeScreen">
        <Stack.Screen
            name="SearchInviteCodeScreen"
            component={SearchInviteCodeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="RegistInviteCodeScreen"
            component={RegistInviteCodeScreen}
            options={{ headerShown: false }}
        />

    </Stack.Navigator>
)


/*
 * LoginScreen -> TabScreen (전체 navigation)
 * navigator 및 screen 생성 시 반드시 여기에 추가
*/

// initialRouteName='InitScreen'

const AppStack = () => {    
    return (
        <Stack.Navigator initialRouteName='InitScreen'>
            <Stack.Screen name='InitScreen' component={InitScreen} options={{ headerShown: false }} />
            <Stack.Screen name='SetLoginPasswordScreen' component={SetLoginPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name='CheckLoginPasswordScreen' component={CheckLoginPasswordScreen} options={{ title: '' }} />
            <Stack.Screen name="LoginPasswordScreen" component={LoginPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="DoorlockSettingStack" component={DoorlockSettingStack} options={{ title: '302호' }} />
            <Stack.Screen name="RegistDoorlockStack" component={RegistDoorlockStack} options={{ title: '도어락 검색하기' }} />
            <Stack.Screen name="RegistIntviteCodeStack" component={RegistIntviteCodeStack} options={{ title: '초대코드 검색하기 '}} />
            <Stack.Screen name='LoadingNFCScreen' component={LoadingNFCScreen} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    );
}

export default AppStack;