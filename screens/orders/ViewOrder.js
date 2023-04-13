import React, {useEffect, useRef} from 'react';
import {Box, Center, Heading, HStack, ScrollView, Spacer, Text, View, VStack} from "native-base";
import ListDetailsView from "../viewholders/ListDetailsView";
import {rupee_symbol} from "../../constants/Constants";
import {AppColor} from "../../constants/AppColor";
import {TouchableOpacity} from "react-native";
import {Entypo} from "@expo/vector-icons";
import OrderActionMenus from "./OrderActionMenus";

function ViewOrder(props) {
    const order = props.route.params;
    const orderContextMenuRef = useRef(null)
    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                if (order.status === 'IN_UNIT' || order.status === 'COMPLETED'
                    || (order.status === 'DELIVERED' && order.orderPaymentDetails.status !== 'PAID')) {
                    return <TouchableOpacity activeOpacity={.6} onPress={() => {
                        orderContextMenuRef.current.showContextMenu(order)
                    }}>
                        <View mx={3}>
                            <Entypo name="dots-three-vertical" size={24} color="black"/>
                        </View>
                    </TouchableOpacity>
                }
            }
        })
    }, [order]);
    const CustomerDetails = () => {
        return <ListDetailsView heading={"Customer"}
                                value={`${order.customer.name} - ${order.customer.phoneNumber}`}/>
    }

    const OrderLineDetails = () => {
        return <>
            <Text fontSize={18} bold mt={3}>Order Details</Text>
            <Box mx={2}
                 py={1}>
                <VStack>
                    <HStack space={3}>
                        <Text bold w={"60%"}>Product</Text>
                        <Text bold w={"10%"}>Qty</Text>
                        <Text bold>Price</Text>
                    </HStack>
                    <Spacer/>
                </VStack>
            </Box>
            {
                order.orderLines.map((ol, index) => {
                    return <Box key={index} mx={2}
                                borderBottomColor={AppColor.grey}
                                borderBottomWidth={1}
                                py={3}>
                        <VStack>
                            <HStack space={3}>
                                <Text bold w={"60%"}>{ol.product.name}</Text>
                                <Text w={"10%"}>{ol.quantity}</Text>
                                <Text>{`${rupee_symbol} ${ol.price}`}</Text>
                            </HStack>
                            <Spacer/>
                        </VStack>
                    </Box>
                })
            }
        </>
    }

    const OrderDetails = () => {
        return <>
            <Text fontSize={18} bold mt={3}>Order Details</Text>
            <ListDetailsView heading={"Order Status"}
                             value={order.status.replace("_", " ")}/>
            <ListDetailsView heading={"Order Type"}
                             value={order.orderType}/>
            {(order.orderType === 'MEDIATOR') &&
                <ListDetailsView heading={"Mediator Pickup Charge"}
                                 value={`${rupee_symbol} ${order.mediatorPickupCharge}`}/>}

            {((order.orderType === 'MEDIATOR') &&
                    order.mediatorDeliveryCharge) &&
                <ListDetailsView heading={"Mediator Delivery Charge"}
                                 value={`${rupee_symbol} ${order.mediatorDeliveryCharge}`}/>}

            <Text fontSize={18} bold mt={3}>Date</Text>
            <ListDetailsView heading={"Order Date"}
                             value={order.orderDate}/>
            {order.completedDate && <ListDetailsView heading={"Completed Date"}
                                                     value={order.completedDate}/>}
            {order.DeliveredDate && <ListDetailsView heading={"Completed Date"}
                                                     value={order.DeliveredDate}/>}
        </>
    }

    const OrderPaymentDetails = () => {
        return <>
            <Text fontSize={18} bold mt={3}>Payment Details</Text>
            <ListDetailsView heading={"Status"}
                             value={order.orderPaymentDetails.status.replace("_", " ")}/>
            <ListDetailsView heading={"Balance"}
                             value={`${rupee_symbol} ${order.orderPaymentDetails.balance}`}/>
            <ListDetailsView heading={"Bill Amount"}
                             value={`${rupee_symbol} ${order.orderPaymentDetails.totalBillAmount}`}/>
            <ListDetailsView heading={"Paid Amount"}
                             value={`${rupee_symbol} ${order.orderPaymentDetails.paidAmount}`}/>
            <ListDetailsView heading={"discount"}
                             value={`${rupee_symbol} ${order.orderPaymentDetails.discount}`}/>
        </>
    }

    const PaymentList = () => {
        return <>
            <Text fontSize={18} bold mt={3}>Payments</Text>

            <HStack justifyContent={"space-between"} mt={2} alignContent={"center"}>
                <Text bold>Payment Id</Text>
                <Text bold>Amount</Text>
                <Text bold>Payment Type</Text>
                <Text bold>Created On</Text>
            </HStack>
            {
                (order.payments.length === 0) &&
                <Center my={5}>
                    <Text>No Payment!</Text>
                </Center>
            }
            {
                order.payments.map((payment, index) => {
                    return <HStack key={index} justifyContent={"space-between"}
                                   mt={3}
                                   borderBottomColor={"black"}
                                   borderBottomWidth={1}
                                   alignItems={"center"}>
                        <Text>{payment.id}</Text>
                        <Text>{`${rupee_symbol} ${payment.amount}`}</Text>
                        <Text>{payment.paymentType}</Text>
                        <Text>{payment.createOn.replace(" ", "\n")}</Text>
                    </HStack>
                })
            }
        </>
    }

    const CreditList = () => {
        return <>
            <Text fontSize={18} bold mt={3}>Credits</Text>

            <HStack justifyContent={"space-between"} mt={2} alignContent={"center"}>
                <Text bold>Credit Id</Text>
                <Text bold>Amount</Text>
                <Text bold>Used</Text>
                <Text bold>Created On</Text>
            </HStack>
            {
                (order.credits.length === 0) &&
                <Center my={5}>
                    <Text>No Credits!</Text>
                </Center>
            }
            {
                order.credits.map((credit, index) => {
                    return <HStack key={index} justifyContent={"space-between"}
                                   mt={3}
                                   borderBottomColor={"black"}
                                   borderBottomWidth={1}
                                   alignItems={"center"}>
                        <Text>{credit.id}</Text>
                        <Text>{`${rupee_symbol} ${credit.creditAmount}`}</Text>
                        <Text>{`${rupee_symbol} ${credit.usedCredit}`}</Text>
                        <Text>{credit.createdOn.replace(" ", "\n")}</Text>
                    </HStack>
                })
            }
        </>
    }

    return (<>
        <ScrollView horizontal={false} contentContainerStyle={{paddingBottom: 50}}>
            <VStack mx={5}>
                <ListDetailsView heading={"Order Id"}
                                 value={order.id}/>
                <CustomerDetails/>
                <OrderDetails/>
                <OrderLineDetails/>
                <OrderPaymentDetails/>
                <PaymentList/>
                <CreditList/>
            </VStack>
        </ScrollView>
        <OrderActionMenus ref={orderContextMenuRef}/>
    </>);
}

export default ViewOrder;