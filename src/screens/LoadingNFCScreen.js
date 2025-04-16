import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackHandler } from "react-native";

export default function LoadingNFCScreen({ navigation }) {
    const bounceRef = useRef(null);
    const [timer, setTimer] = useState(50);

    // NFC 아이콘 애니메이션
    useEffect(() => {
        if (bounceRef.current) {
            bounceRef.current.bounce(1500); // 애니메이션 속도 조절
        }
    }, []);

    // 1초마다 타이머 감소
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    return prevTimer; // 타이머 값이 0인 경우 유지
                }
            });
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);


    // 뒤로 가기 동작 시, 이전 화면으로 돌아가기
    const handleBackPress = () => {
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 하드웨어 뒤로 가기 버튼 이벤트 리스너 추가
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.circleArea}>
                <Animatable.View
                    ref={bounceRef}
                    style={{ alignItems: 'center' }}
                    animation="bounce"
                    iterationCount="infinite" // 무한 반복
                >
                    <Icon name="nfc" size={90} color="white" />
                </Animatable.View>
            </View>
            <View style={styles.timerArea}>
                <Text style={styles.timer}>{timer}</Text>
            </View>
            <Text style={styles.text}>휴대전화의 뒷면을 도어락의 NFC 리더기에 대세요.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    circleArea: {
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        padding: 30,
        marginTop: 20,
    },
    timerArea: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    timer: {
        fontSize: 15,
        color: 'white',
    },
    text: {
        marginTop: 40,
        color: 'white',
        fontSize: 15,
    },
    
})
