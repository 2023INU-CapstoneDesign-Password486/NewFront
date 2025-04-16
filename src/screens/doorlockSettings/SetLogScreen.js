import React, {useEffect, useState} from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import OneLogItem from '../../components/logItem/OneLogItem';
import MyLogItem from "../../components/logItem/MyLogItem";
import AuthAxios from '../../common/AuthAxios.js';

// 서버에서 로그 사용자 및 시간 가져오기
export default function SetLogScreen({route, navigation}) {
  const { data } = route.params || '';
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // 화면이 포커스될 때 실행될 코드
      await getLogList();
    });

    const getLogList = async () => {
        await AuthAxios.post('/api/pw486/settings/view/log', data)
          .then(async (response) => {
            console.log(response.data);
            const res = response.data;
            if(res.code === 201){
              setLogList(res.data);
            }
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
      <ScrollView>
        <View style={styles.logArea}>
          { logList.map((item, index) => {
            if (item.isThisUser === 1) 
              return <MyLogItem key={index} userName={item.nickname} date={item.inpDate} time={item.inpTime} />;
            else 
              return <OneLogItem key={index} userName={item.nickname} date={item.inpDate} time={item.inpTime} />;
          })}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

// =============================== 컴포넌트 스타일 =================================

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logArea: {
    flex: 5,
    marginBottom: 120,
  },
});