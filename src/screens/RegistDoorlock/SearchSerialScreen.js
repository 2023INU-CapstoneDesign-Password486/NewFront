import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SerialNumFailResultModalItem from '../../components/modalItem/SerialNumFailItem';
import AuthAxios from '../../common/AuthAxios';
import { useNavigation } from "@react-navigation/native";

export default function SearchSerialScreen({ route }) {

  const navigation = useNavigation();
  const { serialNumber } = route.params || '';  // SearchCameraScreen 에서 전달받은 serialNumber
  const [isModalVisible, setIsModalVisible] = useState(false);  // 모달 상태
  const [inputSerialNum, setinputSerialNum] = useState(serialNumber); // TextInput의 값을 관리하는 state

  const onPressModalOpen = async () => {
    await AuthAxios.get('/api/pw486/regist/'+inputSerialNum+'/search')
        .then(async (response) => {
          const data = response.data.data;
          navigation.navigate("RegistDoorlockNameScreen", { doorLockSeq:data.doorLockSeq });
        }).catch(error => {
          console.log("에러 메세지 ::", error);
          console.log(inputSerialNum)
          setIsModalVisible(true);
        });
  }

  const onPressModalClose = () => {
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textArea}>
        <Text style={styles.text}>제품의 시리얼 번호를 입력해주세요</Text>
      </View>

      <View style={styles.inputArea}>
        <TextInput 
          style={styles.inputSerial} 
          value={inputSerialNum}    // serialNumber 미리 입력
          onChangeText={(text) => setinputSerialNum(text)}
        />
        <TouchableOpacity onPress={onPressModalOpen} style={styles.buttonArea}>
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      </View>

      <SerialNumFailResultModalItem
        isVisible={isModalVisible}
        onClose={onPressModalClose}
        inputSerialNum={inputSerialNum}
      />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textArea: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputSerial: {
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

  /**
   * Modal
   */

  centeredView: {
    flex: 1,
    justifyContent: 'center', // 수직 방향으로 가운데 정렬
    alignItems: 'center', // 수평 방향으로 가운데 정렬
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalView: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 30,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center', // 수평 방향으로 가운데 정렬
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalComponents: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  modalSearchResultText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 15,
  },
  doorlockIconBackground: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: '#252525',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSerialNumText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 15,
  },
  modalInButton: {
    width: 100,
    margin: 10,
  },
})