import React, {useEffect, useState} from "react";
import { StyleSheet, View } from "react-native";
import { AppSettingItemLogout, AppSettingItemFingerPrint, AppNullSettingItem } from "../components/settingItem/AppSettingItem";
import {getUseFingerPrintYn, setUseFingerPrintYn}  from '../common/JwtProcess.js';

export default function AppSettingScreen({ navigation }) {
    const [finger, setFinger] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // 화면이 포커스될 때 실행될 코드
            const useFinger = await getUseFingerPrintYn();
            console.log(useFinger);
            setFinger(useFinger === 'true');
        });

        return unsubscribe;
    }, []);

    const  toggleFingerPrintUseYn = async () => {
        await setUseFingerPrintYn(finger ? 'false':'true');
        setFinger(previousState => !previousState);
    }


	return (
		<View style={styles.container}>

            <View style={styles.settingListArea}>
                <AppNullSettingItem text="계정 초기화" />
                <AppNullSettingItem text="고객센터 문의" />
                <AppSettingItemFingerPrint toggleFingerPrintUseYn={toggleFingerPrintUseYn} finger={finger} text="지문 로그인" />
                <AppSettingItemLogout navigation={navigation} screenName="SomethingScreen" text="로그아웃" />
            </View>

            <View style={styles.emptyArea}></View>
		</View>
	);
}

// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: 'white',
	},
    settingListArea: {
        flex: 1,
        marginTop: 30,
    },
    emptyArea: {
        flex: 1.3,
    },
});