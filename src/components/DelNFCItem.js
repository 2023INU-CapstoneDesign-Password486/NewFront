import AuthAxios from '../common/AuthAxios';

export async function delNfc(data, setIsAuthModalVisible, navigation) {
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