import gStyle from '../../style';
import {ActivityIndicator, Pressable, Text, View} from "react-native";
import {HButton} from "../../components/ui/HButton/HButton";
import {useEffect, useState} from "react";
import QRScanner from "../../components/QRScanner/QRScanner";
import {axiosInstance} from "../../api/axios";

const QRReadScreen = ({navigation}) => {
  const [isScanning, setScanning] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const flushServerResponse = (response) => {
    setServerResponse(response);
    setInterval(() => {
      setServerResponse('');
    }, 5000);
  }

  async function submitPhrase(phrase) {
    setLoading(true);

    const result = await axiosInstance.post('/hipnos/programs/phrase/', {
      phrase: phrase
    });

    if (result.status === 200) {
      console.log("Successfully submitted phrase!");
      flushServerResponse("Код активирован!");
    } else {
      throw new Error(`Error while submitting pharse ${phrase}`);
    }

    setLoading(false);
  }

  const handleScanned = (data) => {
    console.log(`Scanned: ${data}`);
    setScanning(false);
    submitPhrase(data).catch(() => {
      setLoading(false);
      console.log("Error while submitting phrase");
      flushServerResponse("Ошибка сканирования кода!")
    })
  }

  return (
    <View style={{flex: 1, flexDirection: "column", justifyContent: "space-around"}}>
      <View style={{flex: 7, flexDirection: "column", justifyContent: "space-around", alignItems: "center", backgroundColor: "red"}}>
        <QRScanner
          onScanned={isScanning ? handleScanned : undefined }
        />
      </View>
      <View style={{flex: 4, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <View style={{flex: 2, alignItems: "center", justifyContent: "center"}}>
          {!isScanning && <HButton title={"Сканировать ещё"} onPress={() => {setScanning(true)}} />}
        </View>
        <View style={{flex: 4, alignItems: "center", justifyContent: "center"}}>
          {!isLoading && serverResponse && <Text>{serverResponse}</Text>}
          {isLoading && <ActivityIndicator size={"large"} />}
        </View>
      </View>
    </View>
  )
}

export default QRReadScreen;
