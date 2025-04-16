import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from "react-native";
import NewHomeCardIcon from 'react-native-vector-icons/Ionicons';
import InviteIcon from 'react-native-vector-icons/Ionicons';
import QRcodeIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// 아직 추가되지 않은 홈 카드 아이템

const AddHomeCardItem = ({ navigation }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);  // Modal
  
    const onPressModalOpen = () => {
        setIsModalVisible(true);
    }
  
    const onPressModalClose = () => {
        setIsModalVisible(false);
    }

    const changePage = (page) => {
        setIsModalVisible(false);
        navigation.navigate(page);
    }
    
    return (
        <><TouchableOpacity style={styles.homeCardItem} onPress={(onPressModalOpen)}>
            <NewHomeCardIcon name="add-outline" size={30}></NewHomeCardIcon>
        </TouchableOpacity>

        <Modal
            visible={isModalVisible}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalComponents}>
                        <Text style={styles.modalTitleText}>등록 방법을 선택하세요</Text>
                        <View style={styles.codeArea}>
                            <TouchableOpacity style={[styles.codeInArea, { backgroundColor: "#04B4AE" }, { marginRight: 15 }]} onPress={() => changePage("RegistIntviteCodeStack")}>
                                <InviteIcon name="people" size={35} color="white" />
                                <Text style={styles.codeText}>초대코드로 등록</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.codeInArea, { backgroundColor: "#5F04B4" }]} onPress={() => changePage("RegistDoorlockStack")}>
                                <QRcodeIcon name="qrcode-scan" size={35} color="white" />
                                <Text style={styles.codeText}>QR코드로 등록</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalInButton}>
                            <TouchableOpacity onPress={onPressModalClose}>
                                <Text>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                </View>
            </View>
        </Modal></>
        

    );
};


// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    homeCardItem: {
        width: 300,
        height: 170,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
    codeArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    codeInArea: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
    }, 
    codeText: {
        color: 'white',
        marginTop: 10,
        fontSize: 10,
        fontWeight: 'bold',
    },
    modalInButton: {
        width: 100,
        margin: 13,
        alignItems: 'center'
    },
})

export default AddHomeCardItem;