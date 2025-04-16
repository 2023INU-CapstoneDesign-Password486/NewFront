/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import AppStack from './screens/navigations/Stack';
import { PermissionsAndroid, Platform, Alert, NativeEventEmitter, NativeModules } from 'react-native';
import { initializeBeacons } from './common/BeaconsAndroidModule.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

const requestLocationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      ]);

      const allGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        Alert.alert("Permissions required", "All location and Bluetooth permissions are required for beacon functionality.");
      }

      return allGranted;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

const nowDate = () => {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    var day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const App: React.FC = () => {

    useEffect(() => {
      const init = async () => {
        const hasPermissions = await requestLocationPermissions();
        if (hasPermissions) {
          initializeBeacons();
          await AsyncStorage.setItem("taglessUseDate", "");

          // Native 이벤트에 대한 이벤트 에미터 생성
          const { BeaconsAndroidModule } = NativeModules;
          const beaconEventEmitter = new NativeEventEmitter(BeaconsAndroidModule);

          // 이벤트 리스너 등록
          const subscription = beaconEventEmitter.addListener('beaconsDidRange', async (event) => {
            var taglessUseDate = await AsyncStorage.getItem("taglessUseDate");
            var now = nowDate();

            if (event.beacons.length > 0) {
              var distance = event.beacons[0].distance === undefined ? 3 : parseFloat(event.beacons[0].distance);

              if (distance < 2.8) {
                if (now !== taglessUseDate) {
                  var params = { "btSerialNo" : event.beacons[0].uuid,"fcmToken" : await messaging().getToken() }

                  await axios.post('http://192.168.109.32:8080/machine/pw486/openLock/tagless', params)
                    .then(async (response) => {
                      const data = response.data;
                      console.log("time ::", new Date());
                      console.log("data ::", data);
                      if(data.code === 201){
                        await AsyncStorage.setItem("taglessUseDate", now);
                      }
                    })
                      .catch(error => {
                      console.log("openLockTagless 에러 메시지 ::", error);
                    });
                }
              }
            }

            if (distance > 3.2) {
              console.log("4");
              await AsyncStorage.setItem("taglessUseDate", "");
              taglessUseDate = "";
            }

          });

        } else {
          console.log('Location permissions denied');
        }

      }

      init();
    }, []);

    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}

export default App;