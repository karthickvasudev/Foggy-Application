import {StyleSheet, TextInput} from "react-native";
import {AppColor} from "./AppColor";
import {AntDesign} from "@expo/vector-icons";
import {View} from "native-base";
import PropTypes from "prop-types";


export default function CustomTextInput({inputType, placeholder, onChange, value, icon,disabled=false}) {
    let _inputType;
    if (inputType === undefined) {
        _inputType = 'text'
    } else {
        _inputType = inputType
    }
    return <View style={style.view}>
        {!icon && <View ml={4}/>}
        {icon &&
            <AntDesign
                style={style.icon}
                name={icon.name}
                color={icon.color ? icon.color : 'black'}
                size={icon.size ? icon.size : 24}
            />}
        <TextInput inputMode={_inputType}
                   value={value}
                   placeholder={placeholder}
                   style={style.input}
                   onChange={onChange}
                   editable={!disabled}
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
        overflow: 'hidden'
    }, input: {
        width: "100%",
    }, icon: {
        marginHorizontal: 10
    }
})

CustomTextInput.propTypes = {
    inputType: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.any,
    value: PropTypes.any,
    icon: PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.number,
    })
}