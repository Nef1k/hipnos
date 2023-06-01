import style from './HButton.style'
import {Pressable, Text} from "react-native";

export const HButton = ({title, onPress}) => {
  return (
    <Pressable onPress={onPress} style={style.button}>
      <Text style={style.text}>{title}</Text>
    </Pressable>
  )
}
