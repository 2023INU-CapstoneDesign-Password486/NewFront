import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

export default function SerialNumSuccessResultModalItem({ isVisible, onClose, cardName, navigation }) {

    const changePage = (page) => {
        onClose();
        navigation.navigate(page);
    }

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalComponents}>
                        <Text style={styles.modalTitleText}>검색결과</Text>
                        <Text style={styles.modalSearchResultText}>등록이 완료 되었습니다!</Text>
                        <View style={styles.doorlockIconBackground}>
                            <Icon name="check" size={40} color="green" />
                        </View>
                        <Text style={styles.modalCardNameText}>{cardName}</Text>
                    </View>
                    <View style={styles.modalInButtonArea}>
                      <TouchableOpacity style={styles.button} onPress={() => changePage("HomeMainScreen")}>
                        <Text style={styles.cancel}>확인</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
      backgroundColor: 'white',
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
      color: 'green',
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
    modalCardNameText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      fontSize: 15,
    },
    modalSerialNumText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      fontSize: 13,
    },
    modalInButtonArea: {
      borderTopColor: '#CDCDD8',
      borderTopWidth: 1,
      justifyContent: 'center',
    },
    button: {
      margin: 15,
      marginHorizontal: 60,
    },
    cancel: {
      color: '#0E66F2',
      fontSize: 17,
    },
  })