import React from 'react';
import PropTypes from "prop-types";
import {raisedLook} from "../../constants/ReuseStyle";
import {AppColor} from "../../constants/AppColor";
import {HStack, Switch, Text, View} from "native-base";
import {rupee_symbol} from "../../constants/Constants";
import {TouchableOpacity} from "react-native";

function ProductListViewHolder({name, quantity, price, active, onClick}) {
    return (
        <TouchableOpacity activeOpacity={.6} onPress={onClick}>
            <View style={raisedLook} backgroundColor={AppColor.accent} mx={5} borderRadius={10} my={2}>
                <Text fontSize={18} bold mt={3} ml={5}>{name}</Text>
                <HStack space={4} alignSelf={"center"}>
                    <HStack space={1} alignItems={"center"}>
                        <Text bold>Quantity : </Text>
                        <Text>{quantity}</Text>
                    </HStack>
                    <HStack space={1} alignItems={"center"}>
                        <Text bold>Price : </Text>
                        <Text>{rupee_symbol} {price}</Text>
                    </HStack>
                    <HStack space={1} alignItems="center">
                        <Text>Active : </Text>
                        <Switch disabled size="lg" justifyContent={"flex-start"} value={active}/>
                    </HStack>
                </HStack>
            </View>
        </TouchableOpacity>
    );
}

ProductListViewHolder.prototype = {
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.any
}
export default ProductListViewHolder;