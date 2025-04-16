import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Modal, Pressable, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AuthAxios from '../../common/AuthAxios.js';
import DeleteKeyAuthModalItem from '../../components/modalItem/DeleteKeyAuthModalItem.js';
import { delNfc } from '../../components/DelNFCItem.js';
// <Text style={styles.userNameText}>사용자 A</Text> 
// -> <Text style={styles.userNameText}>{userName}</Text>

export default function DeleteKeyScreen ({route, navigation}) {
    const { data } = route.params || '';
    const [nfcList, setNfcList] = useState([]);
    const [handOverUser, setHandOverUser] = useState('');
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);  // 권한 양도 모달
    const [modalMessage, setModalMessage] = useState("");         // 모달에 표시할 메시지 상태 추가

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          await getNfcList();
        });
    
        const getNfcList = async () => {
            await AuthAxios.post('/api/pw486/settings/view/approve/nfcList', data)
              .then(async (response) => {
                const res = response.data;
                if(res.code === 201){
                    setNfcList(res.data.rdlList === undefined ? []:res.data.rdlList);
                } else console.log(">>> DeleteKeyScreen getNfcList ::", res.message);
              })
              .catch(error => {
                if (error.response?.status === 401) navigation.navigate('LoginScreen');
                else console.log("DeleteKeyScreen getNfcList 에러 메시지 ::", error); 
              });
        }
        
        return unsubscribe;
    });

    // 권한 양도 로직
    const tossAuth= async () => {
        const params = {'rdlSeq':handOverUser};
        await AuthAxios.post('/api/pw486/settings/toss/owner', params)
          .then(async (response) => {
            const res = response.data;
            if(res.code === 201){
                await delNfc();
              await delNfc(data, setIsAuthModalVisible, navigation);
            } else console.log(">>> DeleteKeyScreen tossAuth ::", res.message);
          })
          .catch(error => {
            setIsAuthModalVisible(false);
            if (error.response?.status === 401) navigation.navigate('LoginScreen');
            else console.log("DeleteKeyScreen tossAuth 에러 메시지 ::", error); 
          });
    }

    // 양도 후 삭제 로직
    const delNfc = async () => {
      await AuthAxios.post('/api/pw486/main/delNfcOther', data)
        .then(async (response) => {
          const res = response.data;
          if(res.code === 201){
              setIsAuthModalVisible(false);
              navigation.navigate('TabNavigator');
          } else console.log(">>> DeleteKeyScreen delNfc ::", res.message);
        })
        .catch(error => {
          setIsAuthModalVisible(false);
          if (error.response?.status === 401) navigation.navigate('LoginScreen');
          else console.log("DeleteKeyScreen delNfc 에러 메시지 ::", error); 
        });
      }
    
    // 모달창
    const onPressModalOpen = (userSeq, userName) => { // 버튼 클릭 시 메시지를 받아서 설정
        setHandOverUser(userSeq);
        setIsAuthModalVisible(true);
        setModalMessage(userName);             // 모달에 표시할 메시지 설정
    }

    return (
        <SafeAreaView style={styles.container}>
    
            <View style={styles.explainArea}>
                <Text style={styles.topTextStyle}>카드키 제거를 위해{'\n'}Owner 권한을 양도하세요</Text>
                {nfcList.length > 0 ? '' : <Text style={styles.bottomTextStyle2}>owner로 지정가능한 사용자가 없습니다.</Text>}
            </View>

            {nfcList.length > 0 ? 
              <View style={styles.outhTag}>
                  <Text style={styles.authTagText}>Member</Text>
              </View> : ''}

            <>{ nfcList.map( (item) => {
                if(item.rdlSeq === data.rdlSeq) return;
                
                return <View key={item.rdlSeq} style={styles.memberAuthArea}>
                            <View style={styles.userInfoArea}>
                              <View style={styles.withoutButtonArea}>
                                <Image
                                  style={styles.userProfile}
                                  source={require('../../images/unknownUser.png')} />
                                <Text style={styles.userNameText}>{item.rdlName}</Text>  
                            </View>
                            <View style={styles.memberAuthButtonArea}></View>
                                <Pressable onPress={() => onPressModalOpen(item.rdlSeq, item.rdlName)}>
                                    <View style={styles.buttonCompo}>
                                        <Icon name="angle-double-up" size={20} color="green" />
                                    </View>
                                </Pressable>
                            </View>
                        </View>;
            })}</>

            <DeleteKeyAuthModalItem
              isAuthModalVisible={isAuthModalVisible}
              modalMessage={modalMessage}
              tossAuth={tossAuth}
              setIsAuthModalVisible={setIsAuthModalVisible}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    explainArea: {
        padding: 30,
    },
    withoutButtonArea: {
      flexDirection: 'row'
    },
    topTextStyle: {
      fontSize: 27,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 25,
    },
    bottomTextStyle2: {
      fontSize: 17,
      color: 'red',
      marginTop:10,
    },
    memberAuthArea: { // 권한 버튼 포함 영역(멤버)
      flexDirection: 'row',
      paddingBottom: 10,
    },
    memberAuthButtonArea: {  // 버튼만 포함 영역
        justifyContent: 'center',
    },
    buttonCompo: {    // 권한 버튼
      width: 30,
      height: 30,
      //backgroundColor: '#B9B9B9',
      alignItems: 'center',
      justifyContent: 'center',
      // borderColor: 'black',
      // borderWidth: 1,
    },
    outhTag: {        // 권한 택
      height: 30,
      width: 65,
      backgroundColor: "#0E66F2",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 10,
      marginBottom: 5,
    },

    /**
   * User (공통)
   */

  authTagText: {   // 권한명
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  userInfoArea: {   // 유저(오너, 멤버) 정보 표시 컴포넌트
    backgroundColor: '#F4F5FC',
    width: 340,
    height: 80,
    marginHorizontal: 7,
    padding: 7,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userProfile: { // 유저(오너, 멤버) 프로필
    height: 50,
    width: 50,
    borderRadius:200,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 15,
  },
  userNameText: {   // 사용자 이름 텍스트
    fontSize: 25,
    color: 'black',
  },
  

  /**
   * 버튼
   */
  finishButtonArea: {
    flex: 1,
    alignItems: 'center',
  },

  /**
   * 권한 부여 모달
   */
  authCenteredView: {
    flex: 1,
    alignContent: "center",
    textAlignVertical: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  authModalView: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    marginTop: 230,
    margin: 20,
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
  authModalTextStyle: {
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

  /**
   * 카드키 삭제 모달
   */
  delCenteredView: {
    flex: 1,
    justifyContent: 'center', // 수직 방향으로 가운데 정렬
    alignItems: 'center', // 수평 방향으로 가운데 정렬
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  delModalView: {
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
  delModalTopTextStyle: {
    fontSize: 20,
    color: 'black',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  delModalBottomTextStyle: {
    fontSize: 20,
    color: 'red',
    marginBottom: 30,
  },
})