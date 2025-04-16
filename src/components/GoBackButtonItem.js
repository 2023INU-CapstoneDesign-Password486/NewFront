import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Button } from "react-native";

// 뒤로 가기 버튼

const GoBackButtonItem = ({ buttonText, buttonColor, padding }) => {

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.oneButton, { padding }]}>
            <Button title={buttonText} onPress={handleGoBack} color={buttonColor} />
        </View>
    );
}


// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    oneButton: {
        width: 180,
    },
})

export default GoBackButtonItem;