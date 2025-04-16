import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

// SetResetPass.js에서 호출

const InputPassItem = ({text, onChangeText, value}) => {
    return (

        <View style={styles.oneInputArea}>
            <Text style={styles.explainText}>{text}</Text>
            <TextInput 
                style={styles.inputPass}
                value={value}
                keyboardType="number-pad"
                onChangeText={onChangeText} />
        </View>

    )
}

// =============================== 컴포넌트 스타일 =================================

export default InputPassItem;

const styles = StyleSheet.create({
    oneInputArea: {
        margin: 5,
    },
    explainText: {
        fontSize: 15,
        marginBottom: 3,
        color: '#717178',
    },
    inputPass: {
        backgroundColor: '#F4F5FC',
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: '#CDCDD8',
        padding: 10,
    },
})
