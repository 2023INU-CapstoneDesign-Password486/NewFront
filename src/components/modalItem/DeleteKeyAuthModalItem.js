import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 도어락 세부설정 페이지 > 카드키 삭제 페이지

const DeleteKeyAuthModalItem = ({ isAuthModalVisible, modalMessage, tossAuth, setIsAuthModalVisible }) => {
    return (
      <Modal
        visible={isAuthModalVisible}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalTextStyle}>{modalMessage}에게 권한 양도 후,{'\n'}카드키를 제거하시겠습니까?</Text>
              <Text style={styles.modalBottomTextStyle}>본 행위는 되돌릴 수 없으며,{'\n'}재등록이 필요합니다.</Text>
            </View>
            <View style={styles.modalInButtonArea}>
              <TouchableOpacity style={styles.button} onPress={() => setIsAuthModalVisible(false)}>
                <Text style={styles.cancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={tossAuth}>
                <Text style={styles.ok}>양도</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    );
  };
  
export default DeleteKeyAuthModalItem;

const styles = StyleSheet.create({
    /**
   * 권한 부여 모달
   */
    centeredView: {
    flex: 1,
    alignContent: "center",
    textAlignVertical: 'center',
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