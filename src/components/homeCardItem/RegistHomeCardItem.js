
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import NoAuthIcon from 'react-native-vector-icons/Feather';
import AuthIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import WarningIcon from 'react-native-vector-icons/AntDesign'
import DeleteKeyNoAuthModalItem from '../../components/modalItem/DeleteKeyNoAuthModalItem';
import AuthAxios from '../../common/AuthAxios'

// 등록된 홈 카드 아이템
// HomeMainScreen에서 해당 호수 데이터(item) 받기 ( O )
// 톱니바퀴 클릭해서 설정 페이지 넘어가게 변경 ( O )

const RegistHomeCardItem = ({ navigation, data }) => {
    const [isNoAuthModalVisible, setIsNoAuthModalVisible] = useState(false);  // 카드키 삭제 모달 상태 관리

    const activateNfc = async (item) => {
        // console.log('item :: ', item);
        // console.log('rdlSeq :: ', item.rdlSeq);

        if (item.rdlApprove != 1) return

        await AuthAxios.post('/api/pw486/main/activate/nfc', {'rdlSeq': item.rdlSeq})
            .then(async (response) => {
                const res = response.data;
                // console.log(res);
                if(res.code === 201){
                    navigation.navigate("LoadingNFCScreen")
                } else console.log(">>> RegistHomeCardItem activateNfc ::", res.message);
            })
            .catch(error => {
                console.log("RegistHomeCardItem activateNfc 에러 메시지 ::", error); 
            });
    }

    return (
    <>
        {data.map(item => {
            const authIcon = item.rdlAuth === 1 ?
                <TouchableOpacity onPress={() => navigation.navigate("DoorlockSettingStack", {data: item})}>
                    <View style={styles.iconContainer}>
                        <AuthIcon name="settings-helper" size={40} color="white" style={styles.authIconAdjust} />
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => setIsNoAuthModalVisible(true)}>
                    <View style={styles.iconContainer}>
                        <NoAuthIcon name="x" size={25} color="white"  style={styles.noAuthIconAdjust} />
                    </View>
                </TouchableOpacity>;

            // owner 권한 여부에 따라 분기 만들어서 버튼 생성 및 nfc 활성화  
            return (
                <TouchableOpacity 
                    key={item.rdlSeq}
                    style={[
                        item.rdlApprove === 1 ? styles.homeCardItem : styles.homeCardItemNoAuth, 
                        styles.touchableIconContainer
                    ]}
                    onPress={() =>activateNfc(item) }
                >
                    <View style={styles.itemContainer}>
                        {item.rdlApprove === 1 ? ( // rdlApprove 값에 따라 아이콘 표시
                            <TouchableOpacity onPress={() => navigation.navigate("DoorlockSettingStack", {data: item})}>
                                <View style={styles.iconContainer}>
                                    {authIcon}
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.wariningContainer}>
                                <View style={styles.wariningIconContainer}>
                                    <WarningIcon name="exclamationcircleo" size={20} color="red"  style={styles.noAuthIconAdjust} />
                                    <Text style={styles.noAuthText}>미승인 도어락입니다</Text>
                                </View>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => setIsNoAuthModalVisible(true)}>
                                    <NoAuthIcon name="x" size={25} color="#e7e7e7ff"  style={styles.noAuthIconAdjust} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[ item.rdlApprove === 1 ? styles.itemText : styles.noAuthItemText]}>
                                                    {item.rdlName}</Text>
                    </View>
                </TouchableOpacity>
            )
        })}

        <DeleteKeyNoAuthModalItem
            isAuthModalVisible={isNoAuthModalVisible}
            setIsAuthModalVisible={setIsNoAuthModalVisible}
        />
    </>
    );
};

export default RegistHomeCardItem;

// =============================== 컴포넌트 스타일 =================================

const styles = StyleSheet.create({
    // 공통
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40, // 아이콘 크기에 맞게 설정
        height: 40, // 아이콘 크기에 맞게 설정
    },
    itemText: {
        fontSize: 27,
        color: 'white',
    },
    itemContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    touchableIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    // 승인 및 owner 권한
    homeCardItem: {
        width: 300,
        height: 170,
        backgroundColor: '#4169E1',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        elevation: 5,
    },
    authIconAdjust: {
        position: 'relative',
        top: -20,
        left: -5,
    },

    // 미승인 nfc
    homeCardItemNoAuth: {
        width: 300,
        height: 170,
        backgroundColor: '#9fb0e4ff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        elevation: 5,
        padding: 10,
    },
    wariningContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 283,
    },
    noAuthIconAdjust: {
        position: 'relative',
    },
    wariningIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 3
    },
    noAuthText: {
        marginLeft : 6,
        fontSize : 13,
        alignItems: 'center',
        color : 'red',
        marginBottom:6
    },
    noAuthItemText: {
        fontSize: 27,
        color: '#e7e7e7ff',
    }


})
