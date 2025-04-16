import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {getToken, logout}  from '../common/JwtProcess.js';
import messaging from '@react-native-firebase/messaging';



export default function InitScreen({ navigation }) {

    useEffect(() => {
        const loginCheck = async () => {
            // await logout(); // 강제 로그아웃 필요시
            const token = await getToken();
      
            if (token !== null) navigation.navigate('LoginPasswordScreen'); // 토큰값이 존재하는 경우, LoginPasswordScreen
            else navigation.navigate('LoginScreen'); // 토큰값이 존재하지 않는 경우, LoginScreen
        }
        loginCheck();
    }, []);

    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // 알림 수신 시 처리할 작업
        console.log('remoteMessage ::', remoteMessage)
        const notification = remoteMessage.notification;
        console.log('data ::', notification)
        const title = remoteMessage.notification?.title;
        const body = remoteMessage.notification?.body;
        console.log('title::', title);
        console.log('body::', body);
      });
  
      return unsubscribe;
    }, []);

	return (
        <SafeAreaView style={styles.container}>

            <View style={styles.logoArea}>
              <Image
                  style={styles.logoIcon}
                  source={require('../images/logoIcon.png')} />
            </View>
        </SafeAreaView>
	);
}

// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
	container: {
		flex: 1,
  },
  logoArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  logoIcon: {
    width: 408,
    height: 408,
    borderRadius:200,
  },
  loginArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});