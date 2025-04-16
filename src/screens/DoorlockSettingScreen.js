import React, {useEffect} from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import DoorlockSettingItem from '../components/settingItem/DoorlockSettingItem';

// 비밀번호 설정 (O) / 출입기록 보기 (O) / 멤버 관리 (O) / AI 설정 (O) / 초대코드 생성 (O) / 카드키 삭제 (O)
export default function DoorlockSettingScreen({ route, navigation }) {
    const { data } = route.params || '';
    console.log("DoorlockSettingScreen :: ", data);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 하드웨어 뒤로 가기 버튼 이벤트 리스너 추가
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);
    

    const handleBackPress = () => {
        navigation.goBack();
        return true;
      };

    return ( 
		<View style={styles.container}>

            <View style={styles.settingListArea}>
                <DoorlockSettingItem data={{"rdlSeq":data.rdlSeq, "doorLockSeq":data.doorLockSeq}} navigation={navigation} screenName="SetResetPassScreen" text="비밀번호 설정" />
                <DoorlockSettingItem data={{"doorLockSeq":data.doorLockSeq}} navigation={navigation} screenName="SetLogScreen" text="출입기록 보기" />
                <DoorlockSettingItem data={{"rdlSeq":data.rdlSeq, "rdlName":data.rdlName}} navigation={navigation} screenName="SetAuthScreen" text="멤버 관리" />
                <DoorlockSettingItem data={{"rdlSeq":data.rdlSeq}} navigation={navigation} screenName="SetAIScreen" text="AI 설정" />
                <DoorlockSettingItem data={{"rdlSeq":data.rdlSeq}} navigation={navigation} screenName="TopBarNavigation" text="초대코드 생성"/>
                <DoorlockSettingItem data={{"rdlSeq":data.rdlSeq}} navigation={navigation} screenName="DeleteKeyScreen" text="카드키 삭제" textColor="red" />
            </View>

            <View style={styles.emptyArea}></View>
		</View>
	);
}


// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: 'white'
	},
    settingListArea: {
        flex: 1,
    },
    emptyArea: {
        flex: 1,
    },
});