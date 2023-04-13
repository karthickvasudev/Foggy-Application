import React from 'react';
import {raisedLook} from "../../constants/ReuseStyle";
import {AppColor} from "../../constants/AppColor";
import {Center, Divider, HStack, Text, View, VStack} from "native-base";
import {rupee_symbol} from "../../constants/Constants";
import {FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";

function OrderViewHolder({order, onLongClick, onClick}) {

    const PaymentStatus = ({status}) => {
        return <HStack space={3} alignItems={"center"}>
            <FontAwesome name="rupee" size={20} color="black"/>
            <Text
                style={{
                    color: "black",
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                {status.replace("_", " ")}
            </Text>

        </HStack>
    }

    const OrderStatus = ({status}) => {
        status = status.replace("_", " ")
        return <>
            <View flexDir={"row-reverse"} my={1}>
                {(status === 'IN UNIT') && <Fontisto name="shopping-store" size={24} color="#294e8c"/>}
                {(status === 'COMPLETED') &&
                    <Ionicons name="md-checkmark-circle" size={24} color="blue"/>}
                {(status === 'DELIVERED') && <Ionicons name="md-checkmark-done-circle-sharp" size={24} color="green"/>}
                {(status === 'CANCELLED') && <MaterialIcons name="cancel" size={24} color="red"/>}
                <Text bold mx={2}>{status}</Text>
            </View>
        </>
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onLongPress={onLongClick} onPress={onClick}>
            <View style={raisedLook} background={AppColor.accent} borderRadius={10} m={1} p={2}>
                <View justifyContent={"space-between"} flexDir={"row"}>
                    <VStack>
                        <HStack alignItems={"center"}>
                            <View><Text fontSize={18} bold>{order.id}</Text></View>
                        </HStack>
                        <HStack alignItems={"center"} space={2}>
                            <Text fontSize={12} bold color={AppColor.secondary}>{order.orderDate}</Text>
                        </HStack>
                        {(order.status !== "CANCELLED") &&
                            <View my={2}>
                                <PaymentStatus status={order.orderPaymentDetails.status}/>
                            </View>}
                    </VStack>
                    <VStack alignItems={"flex-end"}>
                        <OrderStatus status={order.status}/>
                        <View><Text bold>{order.customer.name}</Text></View>
                        <View><Text>{order.customer.phoneNumber}</Text></View>
                    </VStack>
                </View>

                <View flexDir={"row"} justifyContent={"space-between"} mx={3} my={1}>
                    <VStack alignItems={"center"}>
                        <Text bold>Count</Text>
                        <Text>{order.count}</Text>
                    </VStack>
                    <VStack alignItems={"center"}>
                        <Text bold>Bill Amount</Text>
                        <Text>{`${rupee_symbol} ${order.orderPaymentDetails.totalBillAmount}`}</Text>
                    </VStack>
                    <VStack alignItems={"center"}>
                        <Text bold>Paid</Text>
                        <Text>{`${rupee_symbol} ${order.orderPaymentDetails.paidAmount}`}</Text>
                    </VStack>
                    <VStack alignItems={"center"}>
                        <Text bold>Balance</Text>
                        <Text>{`${rupee_symbol} ${order.orderPaymentDetails.balance}`}</Text>
                    </VStack>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default OrderViewHolder;