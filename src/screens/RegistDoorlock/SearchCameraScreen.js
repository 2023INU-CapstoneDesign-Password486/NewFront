import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import QRCodeScannerItem from "../../components/QRCodeScannerItem"; // 경로 수정

export default function SearchCameraScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scannerArea}>
                <QRCodeScannerItem />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scannerArea: {
        flex: 1,
    },
});