import {StyleSheet, TextInput, View} from "react-native";
import {AppColor} from "./AppColor";
import {MaterialIcons} from "@expo/vector-icons";
import {useState} from "react";


export default function PasswordInputText(props) {
    const [visible, setVisible] = useState(false)
    return <View style={style.view}>
        <TextInput placeholder={props.placeholder}
                   style={style.input}
                   secureTextEntry={!visible}
                   onChange={props.onChange}/>
        <MaterialIcons
            onPress={() => setVisible(!visible)}
            style={style.icon}
            name={visible ? 'visibility' : 'visibility-off'}
            color={'black'}
            size={24}
        />
    </View>
}

const style = StyleSheet.create({
    view: {
        borderWidth: 1,
        borderColor: AppColor.primary,
        width: '100%',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    }, input: {
        height: "100%",
        width: "80%",
        marginLeft: 15
    }, icon: {
        marginHorizontal: 10
    }
})