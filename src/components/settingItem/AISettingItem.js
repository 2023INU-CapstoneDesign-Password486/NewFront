import React from "react";
import { StyleSheet, Text, View } from "react-native";

// DoorlockSetting 페이지로 넘어가는 item

const AISettingItem = ({ text }) => {
    return (
      <View style={styles.settingList}>
        <Text style={styles.settingText}>{text}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  };


// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    settingList: {
        flex: 1,
        justifyContent: "center",
        margin: 5,
        marginHorizontal: 25,
        borderBottomColor: "#B6B6B6",
        borderBottomWidth: 1,
    },
    settingText: {
        color: "black",
        fontSize: 15,
    }
});

export default AISettingItem;