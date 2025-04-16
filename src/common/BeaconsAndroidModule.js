import { NativeModules } from 'react-native';

const { BeaconsAndroidModule } = NativeModules;

export const initializeBeacons = () => {
  // 필요한 초기화 코드
  BeaconsAndroidModule.startMonitoring(
    'regionId',
    '74278bda-b644-4520-8f0c-720eaf059935',
    4660,  // minor
    64002,  // major
    () => {
      console.log('Monitoring started');
    },
    (error) => {
      console.error('Error starting monitoring', error);
    }
  );

  BeaconsAndroidModule.startRanging(
    'regionId',
    '74278bda-b644-4520-8f0c-720eaf059935',
    () => {
      console.log('Ranging started');
    },
    (error) => {
      console.error('Error starting ranging', error);
    }
  );
};
