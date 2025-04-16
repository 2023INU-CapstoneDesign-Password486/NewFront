import React, { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const BeaconMonitoring = () => {
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'active') {
        await requestLocationPermission();
      }
    };

    const requestLocationPermission = async () => {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await check(permission);
      if (result === RESULTS.DENIED) {
        await request(permission);
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    Beacons.detectIBeacons();

    Beacons
      .startMonitoringForRegion({
        identifier: 'REGION1',
        uuid: 'YOUR_BEACON_UUID',
      })
      .then(() => console.log('Beacons monitoring started'))
      .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));

    Beacons
      .startRangingBeaconsInRegion('REGION1')
      .then(() => console.log('Beacons ranging started'))
      .catch(error => console.log(`Beacons ranging not started, error: ${error}`));

    Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log('Found beacons!', data);
    });

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      Beacons.stopMonitoringForRegion('REGION1');
      Beacons.stopRangingBeaconsInRegion('REGION1');
    };
  }, []);

  return null;
};

export default BeaconMonitoring;
