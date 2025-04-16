import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// DoorlockSetting 페이지로 넘어가는 item

const DoorlockSettingItem = ({ navigation, screenName, text, textColor, data }) => {
    return (
      <View style={styles.settingList}>

        <TouchableOpacity onPress={() => navigation.navigate(screenName, {data:data})}>
          <Text style={[styles.settingText, textColor && {color: textColor}]}>{text}</Text>
        </TouchableOpacity>

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
        fontSize: 20,
    }
});

export default DoorlockSettingItem;