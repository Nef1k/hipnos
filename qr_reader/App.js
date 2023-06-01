import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import QRReadScreen from "./screens/QRReadScreen/QRReadScreen";
import SignInScreen from "./screens/SignInScreen/SignInScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"QRReadScreen"} component={QRReadScreen} options={{title: "Сканирование QR"}} />
        <Stack.Screen name={"SignInScreen"} component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
