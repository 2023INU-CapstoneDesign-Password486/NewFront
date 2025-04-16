import { StyleSheet, Text, View, Image } from "react-native";
import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackHandler } from 'react-native';  // 뒤로가기 시 종료

import AddHomeCardItem from '../components/homeCardItem/AddHomeCardItem';
import RegistHomeCardItem from '../components/homeCardItem/RegistHomeCardItem';
import AuthAxios from '../common/AuthAxios.js';
import { getNickname, logout }  from '../common/JwtProcess.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeMainScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // 화면이 포커스될 때 실행될 코드
      await getList();
    });

    const getList = async () => {
      await AuthAxios.post('/api/pw486/main/getMyNfcList')
          .then(async (response) => {
            setNickname(await getNickname()); // 사용자 이름 셋팅
            setData(response.data.data);      // nfc 리스트
            console.log(response.data.data);
          })
          .catch(error => {
            if (error.response?.status === 401) navigation.navigate('LoginScreen');
            else console.log("HomeMainScreen 에러 메시지 ::", error); 
          });
    }

    return unsubscribe;
  }, [navigation]);


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.user}>
        <Image
          style={styles.userProfile}
          source={require('../images/exampleProfile.png')} />
        <Text style={styles.userName}>{nickname}</Text> 
      </View>

      <View style={styles.homeCardList}>
        <RegistHomeCardItem data={data} navigation={navigation} />
        <AddHomeCardItem navigation={navigation} />
      </View>

    </SafeAreaView>
  );
}

export default HomeMainScreen;

// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 20,
    },
    user: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      margin: 20,
    },
    userProfile: {
      width: 75,
      height: 75,
      borderRadius: 50,  // 이미지 원형으로 변경
    },
    userName: {
      fontSize: 27,
      fontWeight: 'bold',
      paddingLeft: 10,
      color: 'black',
    },
    homeCardList: {
      flex: 6,
      alignItems: 'center',
    },
});