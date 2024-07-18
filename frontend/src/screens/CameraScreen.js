import { Camera } from "expo-camera";
import { useState, useEffect, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Toast from 'react-native-toast-message';
import loyaltyApi from '../api/loyalty.js';
import { Context as AuthContext } from "../context/AuthContext";

const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (!scanned) {
      setScanned(true);
      Toast.show({
        type: 'success',
        text1: 'QR Code Scanned',
        visibilityTime: 3000,
      });
      console.log(data);

      const qrData = JSON.parse(data);

      try {
        const response = await loyaltyApi.post('/scan', {
          action: qrData.action,
          userId: qrData.userId,
          offerId: qrData.offerId,
          businessId: state.userId,
        });

        Toast.show({
          type: 'success',
          text1: response.data.message,
          visibilityTime: 3000,
        });
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response ? error.response.data.error : error.message,
          visibilityTime: 3000,
        });
      }

      setTimeout(() => setScanned(false), 5000);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarCodeScanned={handleBarCodeScanned}
      ></Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default CameraScreen;
