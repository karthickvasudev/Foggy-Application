import {StyleSheet, TouchableOpacity} from "react-native";
import {AppColor} from "./AppColor";
import {Text, View} from "native-base";
import PropTypes from "prop-types";

export default function PrimaryButton({name, onPress, disabled = false}) {
    return <TouchableOpacity activeOpacity={.6} onPress={onPress} disabled={disabled}>
        <View
            backgroundColor={disabled ? AppColor.grey : AppColor.primary}
            h={10}
            borderRadius={10}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={'center'}

        >
            <Text
                color={'white'}
                fontSize={16}
            >{name}</Text>
        </View>
    </TouchableOpacity>
}

PrimaryButton.propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string
}

