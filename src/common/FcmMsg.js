import messaging from '@react-native-firebase/messaging';

// 앱 시작 시 Firebase 앱 초기화
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging()
  .getToken()
  .then(token => {
    console.log('FCM Token:', token);
    // 이 토큰을 서버로 전송하여 저장합니다.
  });

messaging().onTokenRefresh(token => {
  console.log('FCM Token Refreshed:', token);
  // 이 토큰을 서버로 전송하여 저장합니다.
});