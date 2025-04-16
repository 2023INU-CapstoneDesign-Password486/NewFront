import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

// 뒤로 가기 시, 앱 종료

const ShutDownGoBackItem = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return null;
};

export default ShutDownGoBackItem;
