import React from "react";
import { StyleSheet, Text, View, Image, Modal, Pressable, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

// 권한 부여 모달창

const AuthModalItem = ({ }) => {
    return (
        <View>
            <View style={styles.memberAuthButtonArea}>
                <Pressable onPress={() => onPressModalOpen("권한을 양도하시겠습니까?")}>
                    <View style={styles.buttonCompo}>
                    <Icon name="angle-double-up" size={30} color="green" />
                    </View>
                </Pressable>
                <Pressable onPress={() => onPressModalOpen("권한을 제거하시겠습니까?")}>
                    <View style={styles.buttonCompo}>
                    <AntDesignIcon name="close" size={30} color="red" />
                    </View>
                </Pressable>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <View>
                        <Text style={styles.modalTextStyle}>{modalMessage}</Text>
                    </View>
                    <View style={styles.modalInButtonArea}>
                        <View style={styles.modalInButton}>
                        <Button title="예" onPress={onPressModalClose} color="green" />
                        </View>
                        <View style={styles.modalInButton}>
                        <Button title="아니오" onPress={onPressModalClose} color="red" />
                        </View>
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default AuthModalItem;

const styles = StyleSheet.create({
    /**
   * 모달
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
    margin: 30,
    backgroundColor: '#D9D9D9',
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
  modalTextStyle: {
    color: '#17191c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 20,
  },
  modalInButtonArea: {
    flexDirection: 'row',
  },
  modalInButton: {
    width: 100,
    margin: 10,
  },
})