import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 메인 페이지 > member 권한 카드키 삭제

const DeleteKeyNoAuthModalItem = ({ isAuthModalVisible, setIsAuthModalVisible }) => {
  async function delNfc(data, setIsAuthModalVisible, navigation) {
    await AuthAxios.post('/api/pw486/main/delNfcOther', data)
      .then(async (response) => {
        const res = response.data;
        if(res.code === 201){
            setIsAuthModalVisible(false);
        } else console.log(">>> DeleteKeyScreen delNfc ::", res.message);
      })
      .catch(error => {
        setIsAuthModalVisible(false);
        if (error.response?.status === 401) navigation.navigate('LoginScreen');
        else console.log("DeleteKeyScreen delNfc 에러 메시지 ::", error); 
      });
  }

  return (
    <Modal
      visible={isAuthModalVisible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.modalTextStyle}>카드키를 제거하시겠습니까?</Text>
            <Text style={styles.modalBottomTextStyle}>본 행위는 되돌릴 수 없으며, 재등록이 필요합니다.</Text>
          </View>
          <View style={styles.modalInButtonArea}>
            <TouchableOpacity style={styles.button} onPress={() => setIsAuthModalVisible(false)}>
              <Text style={styles.cancel}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={delNfc}>
              <Text style={styles.ok}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
  
export default DeleteKeyNoAuthModalItem;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center', // 수직 방향으로 가운데 정렬
    alignItems: 'center', // 수평 방향으로 가운데 정렬
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalView: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    marginTop: 230,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    color: 'black',
    //fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 17,
    padding: 10,
  },
  modalInButtonArea: {
    flexDirection: 'row',
    borderTopColor: '#CDCDD8',
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  button: {
    margin: 15,
    marginHorizontal: 60,
  },
  cancel: {
    color: '#0E66F2',
    fontSize: 17,
  },
  ok: {
    color: '#0E66F2',
    fontWeight: 'bold',
    fontSize: 17,
  },
  modalBottomTextStyle: {
    fontSize: 15,
    color: 'red',
    marginBottom: 30,
    textAlign: 'center'
  },
})