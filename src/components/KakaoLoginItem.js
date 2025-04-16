import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import messaging from '@react-native-firebase/messaging';
import {setToken}  from '../common/JwtProcess.js';
import AuthAxios from '../common/AuthAxios.js';


// 카카오 로그인 Item
const KakaoLoginItem = ({ navigation }) => {
    const login = () => {
        KakaoLogin.login().then((result) => {
            console.log("Login Success", JSON.stringify(result));
            getProfile();
        }).catch((error) => {
            if (error.code === 'E_CANCELLED_OPERATION') {
                console.log("Login Cancel", error.message);
            } else {
                console.log(`Login Fail(code:${error.code})`, error.message);
            }
        });
    };
    
    const getProfile = () => {
        KakaoLogin.getProfile().then( async (result) => {
            console.log("로그인 성공", JSON.stringify(result));
    
            // id, 닉네임, 이메일, fcmToken 파라미터 생성
            let params = {
                "kakaoId":result.id,
                "nickname":result.nickname,
                "email":result.email,
                "fcmToken":await messaging().getToken()
            };
            
            // console.log(params);
            // console.log("==============================================================");
            joinUser(params);
        }).catch((error) => {
            console.log(`GetProfile Fail(code:${error.code})`, error.message);
        });
    };

    const joinUser = async (params) => {
        await AuthAxios.post('/pw486/user/firstLogin', params)
        .then(async (response) => {
            const data = response.data.data;
            await setToken(data);
            navigation.navigate('SetLoginPasswordScreen');
        })
        .catch(error => {
            console.log("에러 메시지 ::", error);
        });
    }

    return (
        <TouchableOpacity style={styles.kakaoLoginButton} onPress={() => login()}>

            <View style={styles.kakaoLogoArea}>
                <Image
                style={styles.kakaoLogo}
                source={require('../images/kakaoLogo.png')} />
            </View>

            <Text style={styles.kakaoText}>카카오 로그인</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    kakaoLoginButton: {
        width: 330,
        height: 70,
        borderRadius: 12,
        backgroundColor: '#FEE500',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
      kakaoLogoArea: {
        flex: 1,
        marginLeft: 20,
    },
      kakaoLogo: {
        width: 25,
        height: 25,
    },
      kakaoText: {
        flex: 2.3,
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',
    },
})


export default KakaoLoginItem;