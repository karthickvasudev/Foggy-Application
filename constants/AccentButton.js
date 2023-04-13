import {StyleSheet, TouchableOpacity} from "react-native";
import {AppColor} from "./AppColor";
import {Text, View} from "native-base";

export default function AccentButton(props) {
    return <TouchableOpacity activeOpacity={.6} onPress={props.onPress}>
        <View
            backgroundColor={AppColor.accent}
            w={300}
            h={10}
            borderRadius={20}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={'center'}
        >
            <Text
                color={AppColor.primary}
                fontSize={16}
            >{props.name}</Text>
        </View>
    </TouchableOpacity>
}

