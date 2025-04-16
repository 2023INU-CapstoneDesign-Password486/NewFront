import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (data) => {
    // accessToken 만료 시간 5분 (추후 10분으로 변경 예정)
    await AsyncStorage.setItem("accessToken", data.accessToken);
    // refreshToken 만료 시간 10분 (추후 1달로 변경 예정)
    await AsyncStorage.setItem("refreshToken", data.refreshToken);
    await setNickname(data.nickname);
};

export const getToken = async () => {
    return await AsyncStorage.getItem("accessToken");
};

export const setNickname = async (nickname) => {
    await AsyncStorage.setItem("nickname", nickname);
};

export const getNickname = async () => {
    return await AsyncStorage.getItem("nickname");
};

export const setUseFingerPrintYn = async (fingerPrint) => {
    await AsyncStorage.setItem("fingerPrint", fingerPrint);
};

export const getUseFingerPrintYn = async () => {
    return await AsyncStorage.getItem("fingerPrint");
};

export const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("nickname");
    await AsyncStorage.removeItem("numberPassword");
    await AsyncStorage.removeItem("fingerPrint");
};

export const tokenRefresh = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    await axios({
        method: 'post',
//        url: 'http://52.78.166.187:8080/pw486/user/refreshLogin',
//        url: 'http://192.168.35.116:8080/pw486/user/refreshLogin',
        url: 'http://192.168.109.32:8080/pw486/user/refreshLogin',
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    }).then(async (response) => {
        let data = response.data;
        await setToken(data.data);
        return true;
    }).catch(async (error) => {
        console.log("refreshToken 만료 error :: ", error);
        await logout();
        return false;
    });
};