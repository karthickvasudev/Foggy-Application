import {HStack, Text, View} from "native-base";

import {MaterialIcons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {raisedLook} from "../../constants/ReuseStyle";
import {AppColor} from "../../constants/AppColor";


export default function CustomerListViewHolder({index, name, phoneNumber, onClick}) {
    return <TouchableOpacity key={index} activeOpacity={0.6} onPress={onClick}>
        <View style={raisedLook} backgroundColor={AppColor.accent} mx={5} borderRadius={5} mt={3}>
            <Text fontSize={18} bold m={4}>{name}</Text>
            <HStack ml={5} mb={5} flexDirection={"row"} space={2}>
                <MaterialIcons name="phone" size={20} ml="3"/>
                <Text>{phoneNumber}</Text>
            </HStack>
        </View>
    </TouchableOpacity>
}


CustomerListViewHolder.prototype = {
    index: PropTypes.number,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    onClick: PropTypes.string
}