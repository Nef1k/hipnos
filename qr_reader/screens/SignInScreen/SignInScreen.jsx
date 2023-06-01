import {View, Text, Button} from "react-native";
import {HButton} from "../../components/ui/HButton/HButton";

const SignInScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, flexDirection: "column", justifyContent: "space-around"}}>
      <View style={{flex: 1, flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
        <Text style={{fontSize: 28}}>Авторизация</Text>
        <HButton title={"К чтению QR"} onPress={() => {navigation.navigate('QRReadScreen')}} />
      </View>
      <View style={{flex: 4}} />
    </View>
  )
}

export default SignInScreen;
