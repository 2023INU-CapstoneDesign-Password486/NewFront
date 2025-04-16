import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SetAIScreenTimeList = ({ data }) => {

    const setTime = (time) => {
        const timeSepPoint = time.indexOf(".");
        if (timeSepPoint !== -1) {
            let hour = parseInt(time.substring(0, timeSepPoint));
            console.log("toggleDataCollectionSwitch 에러 메시지 ::", error);
            let min = parseInt(time.substring(timeSepPoint+1, time.length));
            if (time.includes('-')) { hour = 23; min = 100 - min; }
            min = (min/100)*60;      
            let finHour = (hour + 3)%24;
            return `${fillZero(hour)}시 ${fillZero(min)}분 - ${fillZero(finHour)}시 ${fillZero(min)}분`;
        } else {
            let hour = parseInt(time);
            let finHour = (hour + 3)%24;
//            console.log('hour :: {}', hour);
//            console.log('finHour :: {}', finHour);
            return `${fillZero(time)}시 00분 - ${fillZero(finHour)}시 00분`;
        }
    }

    const fillZero = (time) => {
        return String(time).padStart(2, "0");
    }

    return (
        <><View style={styles.inSettingList}>
            <Text style={styles.settingText}>월</Text>
            <Text style={styles.settingText2}>
                {data.monTime === undefined || data.monTime === null ? "" : setTime(data.monTime)}
            </Text>
        </View>
        
        <View style={styles.inSettingList}>
            <Text style={styles.settingText}>화</Text>
            <Text style={styles.settingText2}>
                {data.tueTime === undefined || data.tueTime === null ? "" : setTime(data.tueTime)}
            </Text>
        </View>
        <View style={styles.inSettingList}>
            <Text style={styles.settingText}>수</Text>
            <Text style={styles.settingText2}>
                {data.wedTime === undefined || data.wedTime === null ? "" : setTime(data.wedTime)}
            </Text>
        </View>
        <View style={styles.inSettingList}>
            <Text style={styles.settingText}>목</Text>
            <Text style={styles.settingText2}>
                {data.thuTime === undefined || data.thuTime === null ? "" : setTime(data.thuTime)}
            </Text>
        </View>
        <View style={styles.inSettingList}>
            <Text style={styles.settingText}>금</Text>
            <Text style={styles.settingText2}>
                {data.friTime === undefined || data.friTime === null ? "" : setTime(data.friTime)}
            </Text>
        </View>
        <View style={styles.inSettingList}>
            <Text style={styles.settingText}>토</Text>
            <Text style={styles.settingText2}>
                {data.satTime === undefined || data.satTime === null ? "" : setTime(data.satTime)}
            </Text>
        </View>
        <View style={styles.inSettingList}>
            <Text style={styles.settingText}>일</Text>
            <Text style={styles.settingText2}>
                {data.sunTime === undefined || data.sunTime === null ? "" : setTime(data.sunTime)}
            </Text>
        </View></>
    );
};

export default SetAIScreenTimeList;

// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    inSettingList: {
        height: 40,
        justifyContent: "center",
        margin: 5,
        marginHorizontal: 30,
        borderBottomColor: "#B6B6B6",
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 5,
        paddingLeft: 30,
        borderStyle:'dashed',
    },
    settingText: {
        color: "#717178",
        fontSize: 20,
    },
    settingText2: {
        color: "#717178",
        fontSize: 18,
    },
})

