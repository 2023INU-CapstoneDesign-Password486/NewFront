import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SomethingScreen() {
	return (  // return 안에 있는 컴포넌트들이 엔더링됨.
		<View style={styles.container}>
			<Text style={styles.text}>앱 설정 페이지</Text>
		</View>
	);
}



// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
	container: {
		flex: 1,  // 화면 1비율로 채우기
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		border: "1px green dashed",
	},
	text: {
		fontSize: 28,
	},
});