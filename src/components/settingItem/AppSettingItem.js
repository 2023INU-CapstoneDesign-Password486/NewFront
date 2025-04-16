import React,{useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Switch } from "react-native";
import {logout} from "../../common/JwtProcess"

export const AppSettingItemFingerPrint = ({ text, finger, toggleFingerPrintUseYn }) => { 
  
  return (
    <View style={styles.settingList}>
      <Text style={styles.nullSettingText}>{text}</Text>
      <Switch
          trackColor={{false: '#767577', true: '#00B83F'}}
          thumbColor={finger ? '#f4f3f4' : '#D9D9D9'}
          onValueChange={toggleFingerPrintUseYn}
          value={finger}
          style={styles.switch}
      />
    </View>
  );
};

export const AppSettingItemLogout = ({ navigation, text }) => {
  const logoutFc = ()=>{
    Alert.alert(
      "LOGOUT", // 제목
      "로그아웃하시겠습니까?", // 내용
      [
        {
          text: '확인', // 버튼 텍스트
          onPress: async () => {
            await logout()
            navigation.navigate('LoginScreen');
          }
        },
        { text: '취소' }
      ],
      { cancelable: false } // 뒤로가기 버튼으로 알림창을 닫을 수 있는지 여부
    );
  }
  
  return (
    <View style={styles.settingList}>

      <TouchableOpacity onPress={logoutFc}>
        <Text style={styles.settingText}>{text}</Text>
      </TouchableOpacity>

    </View>
  );
};


export const AppNullSettingItem = ({ text }) => {
  return (
    <View style={styles.settingList}>

      <TouchableOpacity>
        <Text style={styles.nullSettingText}>{text}</Text>
      </TouchableOpacity>

    </View>
  );
};


// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    settingList: {
        flex: 1,
        // justifyContent: "center",
        // margin: 5,
        // marginHorizontal: 20,
        // borderBottomColor: "black",
        // borderBottomWidth: 1,
        justifyContent: "center",
        margin: 5,
        marginHorizontal: 25,
        borderBottomColor: "#B6B6B6",
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        padding: 10,
    },
    settingText: {
        color: "red",
        fontSize: 20,
    },
    nullSettingText: {
      color: "black",
        fontSize: 20,
    },
    switch: {
      transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
    },
});