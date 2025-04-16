import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';

const NumberPasswordItem = ({ password, setPassword, textInputRef }) => {
    const renderPasswordBoxes = () => {
        const passwordBoxes = [];
        for (let i = 0; i < 6; i++) {
        if (i < password.length) {
            passwordBoxes.push(
            <View key={i} style={styles.filledPasswordDot}>
                {/** 아랫 줄 지우면 숫자 off */}
                {/**<Text style={styles.boxText}>{password[i]}</Text>*/}
            </View>
            );
        } else {
            passwordBoxes.push(
            <View key={i} style={styles.passwordDot} />
            );
        }
        }
        return passwordBoxes;
    };

    // 클릭하면 TextInput으로 포커스 이동
    const handlePasswordPress = () => {
        textInputRef.current.focus();
    };

    // 비밀번호가 6자리가 되면 키패드 숨김
    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text.length === 6) {
            Keyboard.dismiss();
        }
    };

  return (
    <>
        <TouchableOpacity style={styles.hiddenInput} onPress={handlePasswordPress}>
            {renderPasswordBoxes()}
        </TouchableOpacity>
        <TextInput
                ref={textInputRef}
                style={styles.textInput}
                maxLength={6} // 최대 6자리
                onChangeText={handlePasswordChange}
                value={password}
                keyboardType="numeric" // 안드로이드 숫자 키패드 사용
        />
    </>
  );
}

const styles = StyleSheet.create({
    hiddenInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginBottom: 30,
    },
    passwordDot: {
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: '#D4D4D4',
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filledPasswordDot: {
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: '#A7A7A7',
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxText: {
      fontSize: 20,
    },
    textInput: {
      position: 'absolute',
      opacity: 0, // 투명도를 0으로 설정하여 화면에는 보이지 않도록 함
      height: 0,
      width: 0,
    },
  });

export default NumberPasswordItem;