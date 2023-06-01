import {useEffect, useState} from "react";
import {BarCodeScanner} from "expo-barcode-scanner";
import {View, Text, TextComponent, StyleSheet, Button, Platform} from "react-native";

const QRScanner = ({isScanning, onScanned}) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPerm = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    getBarCodeScannerPerm()
      .catch((e) => console.log(e));
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const handleBarCodeScan = ({type, data}) => {
    if (!((type === 256 || type === "org.iso.QRCode") && onScanned)) {
      return;
    }

    const preparedData = data.replaceAll("\'", "\"");
    try {
      const jsonData = JSON.parse(preparedData);
      const phrase = jsonData.phrase;
      onScanned(phrase);
    } catch (e) {
      console.info("Scanned invalid QR code: ", e);
    }
  }

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={ handleBarCodeScan }
        style={[styles.cam, !isScanning ? styles.camScanned : undefined ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  cam: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  camScanned: {
    // backgroundColor: '#FF0000',
    // visibility: 'hidden',
  }
});

export default QRScanner;
