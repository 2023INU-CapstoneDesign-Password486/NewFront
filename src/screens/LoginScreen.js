import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import KakaoLoginItem from "../components/KakaoLoginItem";


export default function LoginScreen({ navigation }) {
	return (
        <SafeAreaView style={styles.container}>

            <View style={styles.logoArea}>
              <Image
                  style={styles.logoIcon}
                  source={require('../images/logoIcon.png')} />
            </View>

            <View style={styles.loginArea}>
              <KakaoLoginItem navigation={navigation} />
            </View>

        </SafeAreaView>
	);
}

// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: 'white',
  },
  logoArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  logoIcon: {
    width: 300,
    height: 300,
    borderRadius:200,
  },
  loginArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});