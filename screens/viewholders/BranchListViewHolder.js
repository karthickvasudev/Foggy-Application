import {Text, View} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import {AppColor} from "../../constants/AppColor";
import {raisedLook} from "../../constants/ReuseStyle";
import PropTypes from "prop-types";


export default function BranchListViewHolder(props) {
    return <>
        <TouchableOpacity activeOpacity={0.6} onPress={props.onClick}>
            <View backgroundColor={AppColor.accent} m={3} style={raisedLook} borderRadius={10}>
                <View flexDirection={"row"}>
                    <View>
                        <Text color={AppColor.primary} fontSize={20} bold m={3}>{props.branchName}</Text>
                    </View>
                    <View justifyContent={"center"} alignItems={"flex-end"} flex={1} px={4}>
                        <Ionicons name="ios-caret-forward" size={24} color={AppColor.primary}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </>
}

BranchListViewHolder.prototype = {
    branchName: PropTypes.string,
    onClick: PropTypes.func
}