/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import Beacons from 'react-native-beacons-manager';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

// Headless JS Task 등록
const myTask = async (taskData) => {
  // 여기서 백그라운드에서 수행할 작업을 정의합니다.
  console.log('백그라운드 태스크 실행 중:', taskData);
  // 비콘 감지 로직을 여기에 추가할 수 있습니다.
  Beacons.detectIBeacons();

    Beacons
      .startMonitoringForRegion({
        identifier: 'REGION1',
        uuid: '74278bda-b644-4520-8f0c-720eaf059935',
      })
      .then(() => console.log('Beacons monitoring started in background task'))
      .catch(error => console.log(`Beacons monitoring not started in background task, error: ${error}`));

    Beacons
      .startRangingBeaconsInRegion('REGION1')
      .then(() => console.log('Beacons ranging started in background task'))
      .catch(error => console.log(`Beacons ranging not started in background task, error: ${error}`));

    Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log('Found beacons in background task!', data);
      // 여기서 비콘 데이터를 처리합니다.
    });
};

AppRegistry.registerHeadlessTask('BeaconTask', () => myTask);
