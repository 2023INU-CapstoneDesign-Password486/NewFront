import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import SetAIScreenTimeList from './SetAIScreenTimeList';
import AuthAxios from '../../common/AuthAxios.js';

export default function SetAIScreen({route, navigation}) {
    const { data } = route.params || '';
    const [timeList, setTimeList] = useState({});

    /* ================================================
     *   토글
     * ================================================ */
    // 데이터 수집 동의 State
    const [isDataCollectionUsed, setIsDataCollectionUsed] = useState(false);
    // AI 서비스 동의 State
    const [isAIServiceUsed, setIsAIServiceUsed] = useState(false);

    const toggleDataCollectionSwitch = async () => {
        await AuthAxios.post('/api/pw486/settings/data/toggle', data)
            .then(async (response) => {
                const res = response.data;
                if (res.code === 201) setIsDataCollectionUsed(res.data == 1);
                else console.log(">>> SetAIScreen toggleDataCollectionSwitch ::", res.message); 
            })
            .catch(error => {
                if (error.response?.status === 401) navigation.navigate('LoginScreen');
                else console.log("toggleDataCollectionSwitch 에러 메시지 ::", error); 
            });
    }
    const toggleAIServiceSwitch = async () => {
        await AuthAxios.post('/api/pw486/settings/aiService/toggle', data)
            .then(async (response) => {
                const res = response.data;
                if (res.code === 201) {
                    const resData = res.data;
                    setIsAIServiceUsed(resData.aiYn == 1);
                } else console.log(">>> SetAIScreen toggleAIServiceSwitch ::", res.message); 
            })
            .catch(error => {
                if (error.response?.status === 401) navigation.navigate('LoginScreen');
                else console.log("toggleDataCollectionSwitch 에러 메시지 ::", error); 
            });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          // 화면이 포커스될 때 실행될 코드
          await getToggleData();
        });
    
        const getToggleData = async () => {
            await AuthAxios.post('/api/pw486/settings/select/privateYn', data)
              .then(async (response) => {
                const res = response.data;

                if (res.code === 201){
                    const resData = res.data;
                    setIsDataCollectionUsed(resData.dataYn === 1);
                    setIsAIServiceUsed(resData.aiYn === 1);
                    if (resData.aiYn === 1) setTimeList(resData.time);
                } else console.log(">>> SetAIScreen getToggleData ::", res.message); 
              })
              .catch(error => {
                if (error.response?.status === 401) navigation.navigate('LoginScreen');
                else console.log("SetAIScreen 에러 메시지 ::", error); 
              });
        }
    
        return unsubscribe;
    }, [navigation]);

    return ( 
		<SafeAreaView style={styles.container}>

            <View style={styles.settingList}>
                <Text style={styles.settingText}>데이터 수집 동의</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#00B83F'}}
                    thumbColor={isDataCollectionUsed ? '#f4f3f4' : '#D9D9D9'}
                    onValueChange={toggleDataCollectionSwitch}
                    value={isDataCollectionUsed}
                    style={styles.switch}
                />
            </View>

            <View style={styles.settingList}>
                <Text style={styles.settingText}>AI 서비스 동의</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#00B83F'}}
                    thumbColor={isAIServiceUsed ? '#f4f3f4' : '#D9D9D9'}
                    onValueChange={toggleAIServiceSwitch}
                    value={isAIServiceUsed}
                    style={styles.switch}
                />
            </View>

            {isAIServiceUsed && (  // AI 서비스 동의일 때
                <SetAIScreenTimeList data={timeList} />
            )}

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: 'white'
	},
    settingListArea: {
        flex: 1,
    },

    /*
     * AISettingItem
    */ 
    settingList: {
        justifyContent: "center",
        margin: 5,
        marginHorizontal: 25,
        borderBottomColor: "#B6B6B6",
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    settingText: {
        color: "black",
        fontSize: 20,
    },
    switch: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
    },
});