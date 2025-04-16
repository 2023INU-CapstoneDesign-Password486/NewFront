import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NumberPasswordItem from '../../components/NumberPasswordItem';

// 비밀번호를 설정해주세요.

export default function SetLoginPasswordScreen ({ navigation }) {
  const [password, setPassword] = useState('');
  const textInputRef = useRef(null);

  // 다음 버튼 클릭 시 실행
  const handleNext = () => {
    navigation.navigate('CheckLoginPasswordScreen', { password });  // 간편 비밀번호 설정 후, CheckLoginPasswordScreen(비밀번호 재확인 페이지) 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text style={styles.text}>간편 비밀번호를{'\n'}설정해주세요</Text>
      </View>
      <View style={styles.inputArea}>
        
        <NumberPasswordItem
          password={password}
          setPassword={setPassword}
          textInputRef={textInputRef}
        />
        <TouchableOpacity onPress={handleNext} style={styles.buttonArea}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
