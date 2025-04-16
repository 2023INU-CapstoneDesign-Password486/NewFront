import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumberPasswordItem from '../../components/NumberPasswordItem';
import messaging from '@react-native-firebase/messaging';
import AuthAxios from '../../common/AuthAxios.js';
import {setNickname}  from '../../common/JwtProcess.js';
import { checkBiometricsAndAuthenticate } from '../../components/AuthenticationItem.js';
import { getUseFingerPrintYn, logout }  from '../../common/JwtProcess.js';
import ShutDownGoBackItem from '../../components/ShutDownGoBackItem.js';

// 비밀번호를 입력해주세요.

export default function LoginPasswordScreen ({ navigation }) {
  const [password, setPassword] = useState('');
  const textInputRef = useRef(null);

  // 이미 저장된 비밀번호가 없는 경우 초기 비밀번호를 저장하는 함수
  const checkAndSaveInitialPassword = async () => {
    try {
      const savedPassword = await AsyncStorage.getItem('numberPassword');
      if (!savedPassword) {
        // 이미 저장된 비밀번호가 없는 경우 초기 비밀번호를 저장
        await AsyncStorage.setItem('numberPassword', '123456');
        //console.log('초기 비밀번호가 로컬 스토리지에 저장되었습니다.');
      } else {
        //console.log('이미 저장된 비밀번호가 있습니다.');
      }
    } catch (error) {
      //console.error('로컬 스토리지에서 비밀번호를 확인하고 초기 비밀번호를 저장하는 중 오류가 발생했습니다:', error);
    }
  };

  // // 비밀번호 저장 함수 호출
  // useEffect(async () => {
  //   await logout()
  //   checkAndSaveInitialPassword(); // 컴포넌트가 마운트될 때 호출하여 초기 비밀번호를 저장함
  // }, []);

  // 비밀번호 저장 함수 호출
  useEffect(() => {
    checkAndSaveInitialPassword(); // 컴포넌트가 마운트될 때 호출하여 초기 비밀번호를 저장함
  }, []);

  // 로컬스토리지에 저장된 비밀번호와 입력한 비밀번호 비교
  const handleSubmit = async () => {
      const savedPassword = await AsyncStorage.getItem('numberPassword');  // 로컬 스토리지에 저장된 비밀번호 가져오기
      
      if (password === savedPassword) await accessLogin();
      else Alert.alert(
        '비밀번호 오류',
        '비밀번호가 일치하지 않습니다.',
        [
          { text: '확인' }
        ],
        { cancelable: false }
      );
  };

  // 카카오 정보 없이 토큰만으로 로그인
  const accessLogin = async () => {
    let params = { "fcmToken":await messaging().getToken() };
    await AuthAxios.post('/pw486/user/accessLogin', params)
      .then(async (response) => {
          const res = response.data;
          if (res.code === 201){
            await setNickname(res.data.nickname);
            navigation.navigate('TabNavigator', { screen: 'HomeMainscreen' });
          } else Alert.alert(">>> LoginPasswordScreen accessLogin ::", res.message);        
      })
      .catch(error => {
        Alert.alert(
          '전송오류',
          '로그인 버튼을 다시 눌러주세요.',
          [
            { text: '확인' }
          ],
          { cancelable: false }
        );
      });
  }

  // 지문 인식
  const [biometricsVerified, setBiometricsVerified] = useState(false);  // 인증 상태
  const [biometricsError, setBiometricsError] = useState('');

  useEffect(() => {
    // 컴포넌트가 마운트될 때 자동으로 지문인식 실행
    const handleAuthenticateBiometrics = async () => {
      const fingerPrintUseYn = await getUseFingerPrintYn();
      console.log(fingerPrintUseYn);
      if (fingerPrintUseYn === 'true') {
        try {
          const bioSuccess = await checkBiometricsAndAuthenticate();
          if (bioSuccess) {
            // 인증 성공 시 accessLogin 실행
            setBiometricsVerified(true);
            await accessLogin();
          } else {
            // 인증 실패 시 처리
            setBiometricsError('지문 인식 실패');
            setBiometricsVerified(false);
          }
        } catch (error) {
          Alert.alert("지문 인식 실패", error.message);
          setBiometricsVerified(false);
        }
      } else setBiometricsVerified(false);
    };

    if (!biometricsVerified && !biometricsError) {
      handleAuthenticateBiometrics();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text style={styles.text}>간편 비밀번호를{'\n'}입력해주세요</Text>
      </View>
      <View style={styles.inputArea}>

        <NumberPasswordItem
          password={password}
          setPassword={setPassword}
          textInputRef={textInputRef}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonArea}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

      </View>
      
      <ShutDownGoBackItem />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textArea: {
    flex: 1.5,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },

  /**
   * 비밀번호 입력창 + 버튼
   */

  inputArea: {
    flex: 3,
    paddingHorizontal: 30,
  },

  /**
   * 버튼
   */

  buttonArea: {
    alignItems: 'center',
    width: 300,
    height: 45,
    backgroundColor: '#0E66F2',
    marginVertical: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
