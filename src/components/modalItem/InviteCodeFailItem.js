import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 존재하지 않는 초대코드 입력 시, 출력하는 Modal

export default function InviteCodeFailResultModalItem({ isVisible, onClose, inviteCode }) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitleText}>검색결과</Text>
          <Text style={styles.modalSearchResultText}>존재하지 않는 초대코드 입니다.</Text>
          <View style={styles.inviteCodeIconBackground}>
            <Icon name="code-brackets" size={40} color="white" />
          </View>
          <Text style={styles.modalInviteCodeText}>{inviteCode}</Text>
          <View style={styles.modalInButtonArea}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.cancel}>다시 입력</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({  
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    inviteCodeIconBackground: {
      height: 80,
      width: 80,
      borderRadius: 50,
      backgroundColor: '#DF0101',
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalInviteCodeText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 15,
    },
    cancel: {
      color: '#0E66F2',
      fontSize: 17,
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
  })
