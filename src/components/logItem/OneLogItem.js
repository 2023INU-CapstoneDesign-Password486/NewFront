import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";


// 사용자 외 다른 사람 출입 시 로그열람 아이템

const OneLogItem = ({userName, date, time}) => {

    // 시간 분에서 자르기
    const setTimes = (times) => {
      let reTimes = times;
      const sepTimes = times.indexOf("분");
      if (sepTimes !== -1)
        reTimes = times.substring(0,sepTimes+1);
      return reTimes;
    }

    // 이름 정리
    const setUserNames = (names) => {
      let reName = names;
      if (names.length > 4) {
        const sepNames = names.indexOf("(");
        if (sepNames !== -1) {
          if (sepNames > 3) reName = names.substring(0,3)+".."
          else reName = names.substring(0,sepNames)
          reName = `${reName}\n${names.substring(sepNames, names.length)}`;
        } else {
          reName = reName.substring(0,3)+"..";
        }
      }
      return reName;
    }
    return (
        <View style={styles.oneLogArea}>
            <View style={styles.userInfo}>
                <Image
                    style={styles.otherUserProfile}
                    source={require('../../images/unknownUser.png')} />
                <Text style={styles.userName}>{setUserNames(userName)}</Text>
            </View>
            <View style={styles.userLog}>
                <Text style={styles.userLogText}>{date}  {setTimes(time)}</Text>
            </View>
        </View>
    )
}

export default OneLogItem;

// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    oneLogArea: {
        height: 80,
        alignItems: 'center',
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
      },
      userInfo: {
        marginHorizontal: 10,
        alignItems: 'center'
      },
      otherUserProfile: {
        height: 50,
        width: 50,
        borderRadius:200,
        borderColor: 'black',
        borderWidth: 1,
      },
      userName: {
        fontSize: 12,
        color: 'black',
        textAlign:'center',
      },
      userLog: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: "#F4F5FC",
        padding: 10,
        borderWidth: 0.2,
        borderColor: '#CDCDD8',
      },
      userLogText: {
        fontSize: 17,
        color: 'black',
      },
})