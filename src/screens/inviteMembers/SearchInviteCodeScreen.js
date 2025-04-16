import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InviteCodeFailResultModalItem from "../../components/modalItem/InviteCodeFailItem";
import { useNavigation } from '@react-navigation/native';
import AuthAxios from '../../common/AuthAxios.js';

/**
 * 초대코드 입력 및 검색 결과 출력 페이지
 */

export default function SearchInviteCodeScreen() {

  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  /**
   * 검색 결과 출력
   */

  const onPressModalOpen = async () => {
    await AuthAxios.get('/api/pw486/regist/inviteCode/'+inviteCode+'/search')
        .then(async (response) => {
            const data = response.data.data;
            navigation.navigate("RegistInviteCodeScreen", { doorLockSeq:data.doorLockSeq, inviteSeq: data.inviteSeq });
        }).catch(error => {
            console.log("에러 메시지 ::", error);
            setIsModalVisible(true);
        });
  }

  const onPressModalClose = () => {
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textArea}>
        <Text style={styles.text}>초대 코드를 입력해주세요</Text>
      </View>

      <View style={styles.inputArea}>
        <TextInput 
          style={styles.inputInviteCode}
          placeholder="8자리 대소문자 입력"
          keyboardType="default"  // 영어 키보드
          value={inviteCode}
          onChangeText={(text) => setInviteCode(text)}
        />
        <TouchableOpacity onPress={onPressModalOpen} style={styles.buttonArea}>
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      </View>

      <InviteCodeFailResultModalItem // 존재하지 않는 초대코드일 시 출력하는 Modal
        isVisible={isModalVisible}
        onClose={onPressModalClose}
        inviteCode={inviteCode}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textArea: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  inputArea: {
    flex: 3.5,
    paddingHorizontal: 30,
  },
  inputInviteCode: {
    backgroundColor: '#F4F5FC',
    height: 50,
    borderRadius: 7,
    fontSize: 17,
    padding: 7,
    marginBottom: 30,
    borderRadius: 5,
    borderWidth: 0.2,  // 테두리 두께
    borderColor: '#CDCDD8',  // 테두리 색상
    fontWeight: 'bold'
  },
  buttonArea: {
    alignItems: 'center',
    width: 300,
    height: 45,
    backgroundColor: '#0E66F2',
    marginVertical: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avoid: {
    flex: 1,
  },
})