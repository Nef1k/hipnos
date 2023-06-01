import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import QRScanner from "./components/QRScanner/QRScanner";

export default function App() {
  const [phrase, setPhrase] = useState("");

  const handleScanned = (phrase) => {
    setPhrase(phrase);
    const timer = setTimeout(() => {
      setPhrase("");
    }, 2000);
  }

  const handleDbgButton = () => {
    console.log("fsadfg");
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 3, backgroundColor: "#fff", width: '100%', justifyContent: "center"}}>
        <QRScanner
          onScanned={handleScanned}
        />
      </View>
      <View style={{flex: 1, backgroundColor: "#fff", width: '100%', display: 'flex', justifyContent: 'space-around'}}>
        <Text style={{backgroundColor: "#fff", textAlign: "center"}}>
          {!!phrase && `Отсканирована фраза: ${phrase}`}
        </Text>
        <Button title={"Test"} onPress={handleDbgButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "column",
  },
});
