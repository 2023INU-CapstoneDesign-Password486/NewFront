import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import InviteCodeSuccessResultModalItem from '../../components/modalItem/InviteCodeSuccessItem.js';
import AuthAxios from '../../common/AuthAxios.js';

export default function RegistInviteCodeScreen({ route, navigation }) {

  const { inviteSeq } = route.params || '';  // SearchCameraScreen 에서 전달받은 초대코드
  const { doorLockSeq } = route.params || '';  // SearchCameraScreen 에서 전달받은 초대코드
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardName, setCardName] = useState('');

  const onPressModalOpen = async () => { // 버튼 클릭 시
    const params = {
                        "rdlName":cardName,
                        "doorLockSeq":doorLockSeq,
                        "inviteSeq":inviteSeq
                    };

    await AuthAxios.post('/api/pw486/regist/registNfcOther', params)
        .then(async (response) => {
            setIsModalVisible(true);
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
          <Text style={styles.text}>등록할 카드 이름을 입력해주세요</Text>
        </View>

        <View style={styles.inputArea}>
            <TextInput 
                style={styles.inputCardName}
                placeholder="롯데캐슬 302호"
                value={cardName}
                onChangeText={text => setCardName(text)} // 입력 값이 변경될 때마다 상태 업데이트
            />
            <TouchableOpacity onPress={onPressModalOpen} style={styles.buttonArea}>
              <Text style={styles.buttonText}>등록</Text>
            </TouchableOpacity>
        </View>

      <InviteCodeSuccessResultModalItem      // 등록 결과 Modal
        isVisible={isModalVisible}
        onClose={onPressModalClose}
        cardName={cardName}
        navigation={navigation}
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
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },

  inputArea: {
    flex: 3.5,
    paddingHorizontal: 30,
  },
  inputCardName: {
    backgroundColor: '#F4F5FC',
    height: 50,
    borderRadius: 7,
    fontSize: 17,
    padding: 7,
    marginBottom: 30,
    borderRadius: 5,
    borderWidth: 0.2,  // 테두리 두께
    borderColor: '#CDCDD8',  // 테두리 색상
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