import React from 'react';
import {Text, View} from "native-base";
import {TouchableOpacity} from "react-native";

function SelectCustomerViewHolder({customer,onClick}) {
    return (
        <TouchableOpacity activeOpacity={0.6}
                          onPress={onClick}>
            <View borderBottomColor={"black"} borderBottomWidth={1} my={1}>
                <Text bold>{customer.name}</Text>
                <Text mb={2}>{customer.phoneNumber}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default SelectCustomerViewHolder;