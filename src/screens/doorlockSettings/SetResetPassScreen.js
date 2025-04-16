import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import InputPassItem from '../../components/InputPassItem';
import AuthAxios from '../../common/AuthAxios.js';
import {getNickname} from '../../common/JwtProcess.js';

// 비밀번호 입력 시 디자인 이쁘게
// 서버에서 최근 출입시간 받아오기 (userLog) ( O )
// 비밀번호 입력 3가지 모두 안 했을 때 확인버튼 눌러도 안 넘어가게 수정 & 비밀번호 확인 일치하지 않을 시 경고창 ( O )
export default function SetResetPassScreen({route, navigation}) {
    const { data } = route.params || '';
    const [userName, setUserName] = useState('');
    const [logTime, setLogTime] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const regex = /[^0-9]/g;    // 숫자가 아닌 문자열을 매칭하는 정규식

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          // 화면이 포커스될 때 실행될 코드
          await getLastLog();
        });
    
        const getLastLog = async () => {
            const params = {"rdlSeq" : data.rdlSeq};
            await AuthAxios.post('/api/pw486/settings/last/log', params)
              .then(async (response) => {
                console.log(response.data);
                const res = response.data;
                if (res.code === 201) {
                    const resData = res.data;
                    setUserName(resData.userName);  // 사용자 이름 매핑
                    if (resData.dataYn !== 1) setLogTime('출입정보 없음');
                    else {
                        let lastTime = resData.lastTime.split('T');
                        let time = lastTime[1].split(':');
                        console.log('lastTime :: ', lastTime);
                        setLogTime(`최근 출입시간\n${lastTime[0]} ${time[0]}시 ${time[1]}분`);
                    }
                } else console.log(">>> HomeMainScreen getLastLog ::", res.message); 
              })
              .catch(error => {
                if (error.response?.status === 401) navigation.navigate('LoginScreen');
                else console.log("HomeMainScreen 에러 메시지 ::", error); 
              });
        }
    
        return unsubscribe;
    }, [navigation]);

    // 비밀번호 입력 값 update 및 숫자가 아닌 문자열 제거
    const currentPasswordChange = (value) => setCurrentPassword(value.replace(regex, ""));
    const newPasswordChange = (value) => setNewPassword(value.replace(regex, ""));
    const confirmPasswordChange = (value) => setConfirmPassword(value.replace(regex, ""));

    // 비밀번호 변경 axios 통신
    const handleSubmit = () => {
        if (currentPassword == "") {
            useAlert("입력값 확인", "현재 비밀번호를 입력해주세요.", 0);
            return;
        }

        if (newPassword == "") { 
            useAlert("입력값 확인", "새 비밀번호를 입력해주세요.", 0);
            return;
        }

        if (confirmPassword == "") {
            useAlert("입력값 확인", "새 비밀번호 확인을 입력해주세요", 0);
            return;
        }

        if (newPassword !== confirmPassword) {
            useAlert("입력값 확인", "새 비밀번호와 확인 값이 다릅니다.", 0);
            return;
        }

        data["dlSecretNo"]=currentPassword;
        data["newSecretNo"]=newPassword;
        data["checkSecretNo"]=confirmPassword;

        AuthAxios.post('/api/pw486/settings/pw/change', data)
            .then(async (response) => {
                const data = response.data;
                if(data.code === 201) useAlert("비밀번호 변경", data.message, 1);
                else useAlert("비밀번호 변경", data.message, 0);
            })
            .catch(error => {
                useAlert("비밀번호 변경", "비밀번호 변경에 실패했습니다.", 0);
                console.log("에러 메시지 ::", error);
            });
    };

    const useAlert = (title, content, sep) => {
        Alert.alert(
            title, // 제목
            content, // 내용
            [
                {
                    text: '확인', // 버튼 텍스트
                    onPress: () => {
                        if (sep == 1)
                            navigation.goBack();
                    }
                }
            ],
            { cancelable: false } // 뒤로가기 버튼으로 알림창을 닫을 수 있는지 여부
        );
    }

	return (  
		<SafeAreaView style={styles.container}>

            <View style={styles.userArea}>
                <View style={styles.userInfoArea}>

                    <Image
                        style={styles.userInfoProfile}
                        source={require('../../images/exampleProfile.png')} />
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.userLog}>{logTime}</Text>
                    </View>

                </View>
            </View>
        
        
            <View style={styles.resetArea}>
                <View style={styles.inputArea}>

                    <InputPassItem text="현재 비밀번호" value={currentPassword} onChangeText={currentPasswordChange} />
                    <InputPassItem text="새 비밀번호" value={newPassword} onChangeText={newPasswordChange} />
                    <InputPassItem text="새 비밀번호 확인" value={confirmPassword} onChangeText={confirmPasswordChange} />

                </View>
            </View>


            <View style={styles.buttonArea}>
                <TouchableOpacity onPress={handleSubmit} style={styles.pressButton}>
                    <Text style={styles.buttonText}>변경하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// =============================== 컴포넌트 스타일 =================================


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    userArea: {
        flex: 1,
    },
    userInfoArea: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0E66F2',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userInfoProfile: {
        borderRadius: 200,
        width: 80,
        height: 80,
        marginLeft: 20,  
    },
    userInfoText: {
        margin: 20,
    },
    userName: {
        fontSize: 28,
        marginBottom: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    userLog: {
        color: '#717178',
    },


    resetArea: {
        flex: 1.5,
    },
    inputArea: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
    },

    /**
     * 버튼
     */

    buttonArea: {
        flex: 1,
        //backgroundColor: 'red',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    pressButton: {
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