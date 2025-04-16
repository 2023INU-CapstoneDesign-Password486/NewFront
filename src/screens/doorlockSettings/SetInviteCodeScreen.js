import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import AuthAxios from '../../common/AuthAxios.js';

export default function SetInviteCodeScreen({route}) {
    const { data } = route.params || '';
    const [inviteCode, setInviteCode] = useState(""); // 초대코드 상태 (예시 ABCDabcd)
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    // 초대코드를 클립보드에 복사하는 함수
    const copyToClipboard = () => {
        Clipboard.setString(inviteCode); // 초대코드를 클립보드에 복사
    };

    // 타이머 시작 함수
    const startTimer = async (auth) => {
        console.log(auth);
        const params = {
            "rdlSeq" : data.rdlSeq,
            "giveAuth" : auth
        }
        await AuthAxios.post('/api/pw486/regist/inviteCode', params)
            .then(async (response) => {
                console.log(response.data);
                const res = response.data;
                if (res.code === 201) {
                    const resData = res.data;
                    setIsTimerRunning(true);
                    setShowTimer(true);
                    setTimer(300); // 5분
                    setInviteCode(resData.inviteCode)
                } else console.log(">>> SetInviteCodeScreen startTimer :: ", res.message);
            })
            .catch(error => {
                if (error.response?.status === 401) navigation.navigate('LoginScreen');
                else console.log("SetInviteCodeScreen startTimer 에러 메시지 ::", error); 
            });
        
    };

    // 타이머 작동 여부에 따른 컴포넌트 활성화
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
        interval = setInterval(() => {
            setTimer(prevTimer => {
            if (prevTimer === 0) {
                clearInterval(interval);
                setIsTimerRunning(false);
                setShowTimer(false);
            }
            return prevTimer - 1;
            });
        }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);
    
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.textArea}>
                <Text style={styles.text}>가족 또는 친구와{'\n'}도어락을 공유하세요</Text>
            </View>
            {!showTimer && ( // showTimer가 false일 때
                <View style={styles.createButtonArea}>
                    <Button title="MEMBER 초대코드 생성하기" color="#424242" onPress={() => startTimer(2)} />
                    <Button title="GUEST 초대코드 생성하기" color="#424242" onPress={() => startTimer(3)} />
                </View>
            )}
            {showTimer && ( // showTimer가 true일 때
                <>
                    <View style={styles.timerArea}>
                        <Text style={styles.timerTopText}>초대코드 만료 남은 시간</Text>
                        <View style={styles.timerTextContainer}>

                            {/* 분 */}
                            <View style={styles.timerNumberContainer}>
                                <Text style={styles.timerNumber}>
                                    {Math.floor(timer / 60).toString().padStart(2, '0').charAt(0)}
                                </Text>
                                <Text style={styles.timerNumber}>
                                    {Math.floor(timer / 60).toString().padStart(2, '0').charAt(1)}
                                </Text>
                            </View>
                            <Text style={styles.timerSeparator}>:</Text>

                            {/* 초 */}
                            <View style={styles.timerNumberContainer}>
                                <Text style={styles.timerNumber}>
                                    {(timer % 60).toString().padStart(2, '0').charAt(0)}
                                </Text>
                                <Text style={styles.timerNumber}>
                                    {(timer % 60).toString().padStart(2, '0').charAt(1)}
                                </Text>
                            </View>

                        </View>

                    </View>
                    <View style={styles.createCodeArea}>
                        <Text style={styles.topText}>나의 초대코드</Text>
                        <View style={styles.codeViewArea}>
                            <Text style={styles.codeViewText}>{inviteCode}</Text>
                        </View>
                        <Button title="초대코드 복사하기" color="#424242" onPress={copyToClipboard} ></Button>
                    </View>
                </>
            )}

            <View style={{flex: 0.7}}></View>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textArea: {
        padding: 30,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },

    /**
     * 코드 보여주는 container
     */

    createCodeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    createButtonArea: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginStart: 30,
    },
    codeViewArea: {
        backgroundColor: '#D8D8D8',
        padding: 20,
        marginBottom: 20,
    },
    codeViewText: {
        fontWeight:'bold',
        fontSize: 35,
        color: 'black',
        letterSpacing: 3, // 자간 조절
    },

    /**
     * 타이머 디자인
     */

    timerArea:{
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    timerTopText: {
        color: 'red',
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold',
    },
    timerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },

    /**
     * 타이머 각 텍스트별 디자인
     */

    timerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerNumberContainer: {
        flexDirection: 'row',
    },
    timerNumber: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 5,
        padding: 7,
        backgroundColor: '#F8E0E0',
        borderRadius: 5,
    },
    timerSeparator: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 5,
    },
})