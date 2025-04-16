import axios from 'axios';
import {getToken, tokenRefresh}  from './JwtProcess.js';

const instance = axios.create({
//    baseURL: 'http://52.78.166.187:8080', // 기본 URL 설정
//    baseURL: 'http://192.168.35.116:8080', // 기본 URL 설정
    baseURL: 'http://192.168.109.32:8080', // 기본 URL 설정
    timeout: 5000, // 요청 시간 초과 시간 설정
});

instance.interceptors.request.use(
  async (config) => {
    // 특정 url access 토큰 제외
    if (config.url !== '/pw486/user/firstLogin') {
      const accessToken = await getToken(); // 액세스 토큰 가져오기
      
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // access 토큰 만료시 refresh토큰 발급
    if (error.response?.status === 401) {
      let refresh = await tokenRefresh();

      if(refresh){
        const accessToken = await getToken();

        error.config.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.request(error.config);
        return response;
      }    
    }

    return Promise.reject(error);
  }
);

export default instance;