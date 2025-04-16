import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Al } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumberPasswordItem from '../../components/NumberPasswordItem';
import {setUseFingerPrintYn} from '../../common/JwtProcess'

// 간편 비밀번호 확인을 위해 한번 더 입력해주세요

export default function CheckLoginPasswordScreen ({ navigation, route }) {
  const [checkPassword, setCheckPassword] = useState('');  // 재입력한 비밀번호
  const { password } = route.params || '';  // setLoginPasswordScreen에서 전달받은 비밀번호
  const textInputRef = useRef(null);


  // 로컬스토리지에 비밀번호 저장
  const savePasswordToStorage = async (checkPassword) => {
    try {
      await AsyncStorage.setItem('numberPassword', checkPassword);
    } catch (error) {
      console.error('Error saving password to AsyncStorage:', error);
    }
  };

  // 이전 페이지의 비밀번호와 일치하는지 확인
  const handleCheckPassword = async () => {
    if (checkPassword === password) {
      await savePasswordToStorage(checkPassword);
      await setUseFingerPrintYn('false');
      navigation.navigate('TabNavigator', { screen: 'HomeMainscreen' });  // 간편 비밀번호 재확인 후, TabNavigator(메인 페이지) 로 이동   
    } else {
      Alert.alert(
        '비밀번호 오류',
        '비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
        [
          { text: '확인' }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
      <Text style={styles.text}>간편 비밀번호 확인을 위해{'\n'}한번 더 입력해주세요</Text>
      </View>
      <View style={styles.inputArea}>

        <NumberPasswordItem
          password={checkPassword}
          setPassword={setCheckPassword}
          textInputRef={textInputRef}
        />

        <TouchableOpacity onPress={handleCheckPassword} style={styles.buttonArea}>
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>

      </View>
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
    fontSize: 27,
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
    width: '100%',
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
