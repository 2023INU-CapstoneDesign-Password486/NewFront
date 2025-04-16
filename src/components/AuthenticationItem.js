import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

// 지문인식

const rnBiometrics = new ReactNativeBiometrics()  // { allowDeviceCredentials: true }

// 지문인식 사용 가능한 기기인지 확인 & 지문 인식 성공여부 판단
export const checkBiometricsAndAuthenticate = async () => {
  try {
    const resultObject = await rnBiometrics.isSensorAvailable();
    const { available, biometryType } = resultObject;

    if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('지문인식 사용 가능 기기입니다.');
      const authenSuccess = await authenticateBiometrics();
      if (authenSuccess) {
        console.log('지문 스캔 성공');
        return true;
      } else {
        console.log('지문 스캔 실패');
        return false;
      }
    } else {
      console.log('지문인식 사용 불가 기기입니다.');
      return false;
    }
  } catch (error) {
    console.error('지문인식 가능여부 error:', error);
    return false;
  }
};


// 지문인식 성공여부 확인
export const authenticateBiometrics = async () => {
  try {
    const resultObject = await rnBiometrics.simplePrompt({ promptMessage: '지문을 스캔해주세요.' });
    const { success } = resultObject;
    return success;
  } catch (error) {
    console.error(error);
    return false;
  }
};