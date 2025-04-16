import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Modal, Pressable,  ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import AuthAxios from '../../common/AuthAxios.js';

export default function SetAuthScreen({route, navigation}) {
  const { data } = route.params || '';
  const [rdlList, setRdlList] = useState([]);       // rdlList(nfc) 리스트
  const [keyCardList, setKeyCardList] = useState([]);   // 등록된 키카드 리스트
  const [keyBioList, setKeyBioList] = useState([]);    // 등록된 지문 리스트
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);  // 권한 양도 모달 상태
  const [approveModalMsg, setApproveModalMsg] = useState({});             // 권한 양도 모달에 표시할 메시지 상태 추가
  const [isHandOverModalVisible, setIsHandOverModalVisible] = useState(false);  // 권한 양도 모달 상태
  const [handOverModalMsg, setHandOverModalMsg] = useState({});             // 권한 양도 모달에 표시할 메시지 상태 추가
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);    // 해제키 삭제 모달 상태
  const [deleteModalMsg, setDeleteModalMsg] = useState({});             // 해제키 삭제 모달에 표시할 메시지 상태 추가

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getOpenMethodList();
    });
    
    return unsubscribe;
  });

  const getOpenMethodList = async () => {
    await AuthAxios.post('/api/pw486/settings/view/regist/key', data)
      .then(async (response) => {
        const res = response.data;
        if(res.code === 201){
          console.log(res.data.rdlList);
          setRdlList(res.data.rdlList !== undefined ? res.data.rdlList:[]);
          setKeyCardList(res.data.keyCardList !== undefined ? res.data.keyCardList:[]);
          setKeyBioList(res.data.keyBioList !== undefined ? res.data.keyBioList:[]);
        } else console.log(">>> SetAuthScreen getOpenMethodList ::", res.message);
      })
      .catch(error => {
        if (error.response?.status === 401) navigation.navigate('LoginScreen');
        else console.log("SetAuthScreen getOpenMethodList 에러 메시지 ::", error); 
      });
  }

  const onPressApproveModalOpen = (params) => {
    setIsApproveModalVisible(true);
    setApproveModalMsg(params);             // 모달에 표시할 메시지 설정
  }

  const onPressHandOverModalOpen = (params) => { // 버튼 클릭 시 메시지를 받아서 설정
    setIsHandOverModalVisible(true);
    setHandOverModalMsg(params);             // 모달에 표시할 메시지 설정
  }

  const onPressDeleteModalOpen = (params) => { // 버튼 클릭 시 메시지를 받아서 설정
    setIsDeleteModalVisible(true);
    setDeleteModalMsg(params);             // 모달에 표시할 메시지 설정
  }

  const onPressApproveModalClose = async (state) => {
    if(state === 1) {
      const params = {'rdlSeq':approveModalMsg.rdlSeq};
      await AuthAxios.post('/api/pw486/settings/use/permit', params)
          .then(async (response) => {
            const res = response.data;
            console.log(res);
            if(res.code === 201) {
              setIsApproveModalVisible(false);
              Alert.alert('승인','초대코드 등록 승인이 완료되었습니다.');
              await getOpenMethodList();
            } else console.log(">>> SetAuthScreen onPressHandOverModalClose ::", res.message);
            
          })
          .catch(error => {
            setIsApproveModalVisible(false);
            if (error.response?.status === 401) navigation.navigate('LoginScreen');
            else console.log("SetAuthScreen onPressHandOverModalClose 에러 메시지 ::", error); 
          });
    } else setIsApproveModalVisible(false);
  }

  const onPressHandOverModalClose = async (state) => {
    if(state === 1) {
      const params = {'rdlSeq':handOverModalMsg.rdlSeq};
      await AuthAxios.post('/api/pw486/settings/toss/owner', params)
          .then(async (response) => {
            const res = response.data;
            console.log(res);
            if(res.code === 201) {
              setIsHandOverModalVisible(false);
              Alert.alert(
                '권한양도', // 제목
                '권한이 성공적으로 양도되었습니다.', // 내용
                [
                    {
                        text: '확인', // 버튼 텍스트
                        onPress: () => navigation.navigate('TabNavigator')
                    }
                ],
                { cancelable: false } // 뒤로가기 버튼으로 알림창을 닫을 수 있는지 여부
              );
            } else console.log(">>> SetAuthScreen onPressHandOverModalClose ::", res.message);
            
          })
          .catch(error => {
            setIsHandOverModalVisible(false);
            if (error.response?.status === 401) navigation.navigate('LoginScreen');
            else console.log("SetAuthScreen onPressHandOverModalClose 에러 메시지 ::", error); 
          });
    } else setIsHandOverModalVisible(false);
  }

  const onPressDeleteModalClose = async (state) => {
    if(state === 1) {
      var params = {};
      var url = '/api/pw486/settings/delete';
      if(deleteModalMsg.rdlSeq !== undefined) {
        url += '/nfc/other';
        params = {'rdlSeq':deleteModalMsg.rdlSeq};
      } else if(deleteModalMsg.keyCardSeq !== undefined) {
        url += '/keyCard';
        params = {'keyCardSeq':deleteModalMsg.keyCardSeq};
      } else if(deleteModalMsg.keyBioSeq !== undefined) {
        url += '/keyBio';
        params = {'keyBioSeq':deleteModalMsg.keyBioSeq};
      } else return;

      await AuthAxios.post(url, params)
          .then(async (response) => {
            const res = response.data;
            if(res.code !== 201) console.log(">>> SetAuthScreen onPressDeleteModalClose ::", res.message);
            setIsDeleteModalVisible(false);
            await getOpenMethodList();
          })
          .catch(error => {
            setIsDeleteModalVisible(false);
            if (error.response?.status === 401) navigation.navigate('LoginScreen');
            else console.log("SetAuthScreen onPressDeleteModalClose 에러 메시지 ::", error); 
          });
    }else setIsDeleteModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollerArea}>
        <View style={styles.allArea}>
          <View style={styles.ownerArea}>
            <View style={styles.outhTag}>
              <Text style={styles.authTagText}>Owner</Text>
            </View>
            <View style={styles.memberAuthArea}>
              <View style={styles.userInfoArea}>
                <View style={styles.withoutButtonArea}>
                  <Image
                    style={styles.userProfile}
                    source={require('../../images/exampleProfile.png')} />
                  <Text style={styles.userNameText}>{data.rdlName}</Text>
                </View>
              </View>
            </View>
            
          </View>
          
          <View style={styles.memberArea}>
          
            {rdlList.length > 0 ? 
              <View style={styles.outhTag}>
                <Text style={styles.authTagText}>NFC</Text>
              </View>:''}

            <>{rdlList.map((item)=>{
              if(item.rdlSeq === data.rdlSeq) return;
              
              return <View key={item.rdlSeq} style={styles.memberAuthArea}>
                        <View style={styles.userInfoArea}>
                          <View style={styles.withoutButtonArea}>
                            <Image
                              style={styles.userProfile}
                              source={require('../../images/unknownUser.png')} />
                            <Text style={styles.userNameText}>{item.rdlName}</Text>
                          </View>
                          <View style={styles.memberAuthButtonArea}>
                          {item.rdlApprove === 0 ? 
                            <Pressable onPress={() => onPressApproveModalOpen({"msg":`${item.rdlName}님의 NFC를 승인하시겠습니까?`, "rdlSeq":item.rdlSeq})}>
                              <View style={styles.buttonCompo}>
                                <Icon name="user-plus" size={20} color="green" />
                                {/* <ion-icon name="person-add-outline"></ion-icon> */}
                              </View>
                            </Pressable> :
                            <Pressable onPress={() => onPressHandOverModalOpen({"msg":`${item.rdlName}님에게 권한을 양도하시겠습니까?`, "rdlSeq":item.rdlSeq})}>
                              <View style={styles.buttonCompo}>
                                <Icon name="angle-double-up" size={25} color="green" />
                              </View>
                            </Pressable>
                            }
                            <Pressable onPress={() => onPressDeleteModalOpen({"msg":`${item.rdlName}님의 nfc를 삭제하시겠습니까?`, "rdlSeq":item.rdlSeq})}>
                              <View style={styles.buttonCompo}>
                                <AntDesignIcon name="close" size={25} color="red" />
                              </View>
                            </Pressable>
                          </View>
                      </View>
                    </View>
            })}</>

            {keyCardList.length > 0 ? 
              <View style={styles.outhTag}>
                <Text style={styles.authTagText}>카드키</Text>
              </View>:''}
            <>{keyCardList.map((item)=>{
              return <View key={item.keyCardSeq} style={styles.memberAuthArea}>
                        <View style={styles.userInfoArea}>
                          <View style={styles.withoutButtonArea}>
                            <Image
                              style={styles.userProfile}
                              source={require('../../images/unknownUser.png')} />
                            <Text style={styles.userNameText}>{item.keyCardName}</Text>
                          </View>
                          <View style={styles.memberAuthButtonArea}>
                          <Pressable onPress={() => onPressDeleteModalOpen({"msg":`${item.keyCardName}를 삭제하시겠습니까?`, "keyCardSeq":item.keyCardSeq})}>
                            <View style={styles.buttonCompo}>
                              <AntDesignIcon name="close" size={20} color="red" />
                            </View>
                          </Pressable>
                        </View>
                        </View>
                      </View>
            })}</>

            {keyCardList.length > 0 ? 
              <View style={styles.outhTag}>
                <Text style={styles.authTagText}>지문</Text>
              </View>:''}
            <>{keyBioList.map((item)=>{
              return <View key={item.keyBioSeq} style={styles.memberAuthArea}>
                        <View style={styles.userInfoArea}>
                          <View style={styles.withoutButtonArea}>
                            <Image
                              style={styles.userProfile}
                              source={require('../../images/unknownUser.png')} />
                            <Text style={styles.userNameText}>{item.keyBioName}</Text>
                          </View>
                          <View style={styles.memberAuthButtonArea}>
                          <Pressable onPress={() => onPressDeleteModalOpen({"msg":`${item.keyBioName}을 삭제하시겠습니까?`, "keyBioSeq":item.keyBioSeq})}>
                            <View style={styles.buttonCompo}>
                              <AntDesignIcon name="close" size={20} color="red" />
                            </View>
                          </Pressable>
                        </View>
                        </View>
                      </View>
            })}</>
          </View>
        </View>
      </ScrollView>

      <Modal
        //animationType="fade"
        visible={isApproveModalVisible}
        transparent={true} >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalTextStyle}>{approveModalMsg.msg}</Text>
            </View>
            <View style={styles.modalInButtonArea}>
              <TouchableOpacity style={styles.button} onPress={()=>onPressApproveModalClose(0)}>
                <Text style={styles.cancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>onPressApproveModalClose(1)}>
                <Text style={styles.ok}>승인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    
      <Modal
        //animationType="fade"
        visible={isHandOverModalVisible}
        transparent={true} >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalTextStyle}>{handOverModalMsg.msg}</Text>
            </View>
            <View style={styles.modalInButtonArea}>
              <TouchableOpacity style={styles.button} onPress={()=>onPressHandOverModalClose(0)}>
                <Text style={styles.cancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>onPressHandOverModalClose(1)}>
                <Text style={styles.ok}>양도</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        //animationType="fade"
        visible={isDeleteModalVisible}
        transparent={true} >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalTextStyle}>{deleteModalMsg.msg}</Text>
            </View>
            <View style={styles.modalInButtonArea}>
              <TouchableOpacity style={styles.button} onPress={()=>onPressDeleteModalClose(0)}>
                <Text style={styles.cancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>onPressDeleteModalClose(1)}>
                <Text style={styles.ok}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

// =============================== 컴포넌트 스타일 =================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  allArea: {
    marginBottom: 120,
  },
  withoutButtonArea: {
    flexDirection: 'row'
  },

  /**
   * Owner
   */

  ownerArea: {
    flex: 1,
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
   * Member
   */
  memberArea: {
    flex: 5,
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

    //backgroundColor: 'red'
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
  }
})

