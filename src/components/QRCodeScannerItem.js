import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";
import { useNavigation } from '@react-navigation/native';

const QRCodeScannerItem = () => {
    const [scanned, setScanned] = useState(true);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        setScanned(true);
    }, []);

    const onQRCodeRead = (event) => {
        if (!scanned) return;
        setScanned(false);
        const serialNumber = event.nativeEvent.codeStringValue;
        Alert.alert("시리얼 넘버", '인식되었습니다.', [
            { text: "다음", onPress: () => {
                navigation.navigate("SearchSerialScreen", { serialNumber }); // SearchSerialScreen으로 네비게이션 및 데이터 전달
                setScanned(true);
            }},
        ]);
    };


    return (
        <View style={styles.camera}>
            <Camera
                style={styles.camera}
                ref={cameraRef}
                cameraType={CameraType.Back}
                scanBarcode
                showFrame={false}
                laserColor="rgba(0, 0, 0, 0)"
                frameColor="rgba(0, 0, 0, 0)"
                surfaceColor="rgba(0, 0, 0, 0)"
                onReadCode={onQRCodeRead}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
});

export default QRCodeScannerItem;