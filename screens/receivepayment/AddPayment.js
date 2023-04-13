import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Center,
    Checkbox,
    HStack,
    KeyboardAvoidingView,
    Radio,
    ScrollView,
    Text,
    View,
    VStack
} from "native-base";
import ListDetailsView from "../viewholders/ListDetailsView";
import {rupee_symbol} from "../../constants/Constants";
import {reuseStyle} from "../../constants/ReuseStyle";
import PrimaryButton from "../../constants/PrimaryButton";
import {TextInput} from "react-native";
import {AddPaymentToOrder} from "../apihelper/AppApi";

function AddPayment(props) {
    const order = props.route.params
    const CustomerDetails = ({customer}) => {
        return <>
            <Text fontSize={18} bold mt={3}>Customer</Text>
            <ListDetailsView heading={"Name & Phone number"}
                             value={`${customer.name}\n${customer.phoneNumber}`}/>
        </>
    }

    const OrderDetails = ({orderLines}) => {
        return <>
            <Text fontSize={18} bold mt={3}>Order Details</Text>
            <View>
                <VStack>
                    <HStack>
                        <View w={"60%"}>
                            <Text bold mt={3}>Product</Text>
                        </View>
                        <View w={"20%"}>
                            <Text bold mt={3}>Qty</Text>
                        </View>
                        <View w={"20%"}>
                            <Text bold mt={3}>Price</Text>
                        </View>
                    </HStack>
                    {
                        orderLines.map((line, index) => {
                            return <HStack key={index}>
                                <View w={"60%"} justifyContent={"center"}>
                                    <Text
                                        mt={3}>{`${line.product.name}\n${rupee_symbol} ${line.product.price}`}</Text>
                                </View>
                                <View w={"20%"} justifyContent={"center"}>
                                    <Text mt={3}>{line.quantity}</Text>
                                </View>
                                <View w={"20%"} justifyContent={"center"}>
                                    <Text mt={3}>{`${rupee_symbol} ${line.price}`}</Text>
                                </View>
                            </HStack>
                        })
                    }
                </VStack>
            </View>
        </>
    }

    const MakePaymentAndDeliver = ({
                                       mediatorDeliveryCharge,
                                       paymentCalculation,
                                       partiallyPaid,
                                       paymentType
                                   }) => {
        const addPayment = async () => {
            let body = {
                orderId: order.id,
                paidAmount: paymentCalculation.paidAmount,
                discount: paymentCalculation.discount,
                mediatorDeliveryCharge: mediatorDeliveryCharge,
                paymentType: paymentType
            }

            let response = await AddPaymentToOrder(order.id, body);
            console.log(response.status)
            if (response.status === 200) {
                let json = await response.json();
                props.navigation.replace("View Order", json)
            }
        }

        return <>
            <View style={reuseStyle.stickyBottomButton} pb={2}>
                <View w={"100%"} px={5}>
                    <PrimaryButton name={"Add Payment"}
                                   onPress={addPayment}
                                   disabled={
                                       (paymentCalculation.paidAmount === 0) ||
                                       ((paymentCalculation.paidAmount !== 0) &&
                                           paymentCalculation.balance !== 0 &&
                                           !partiallyPaid) ||
                                       paymentType === ''
                                   }/>
                </View>
            </View>
        </>
    }

    const PayingSection = ({paymentCalculation, setPaymentCalculation, setPartiallyPaid}) => {

        const finalCalculation = (paidAmount, discount) => {
            let credit = 0
            let balance = paymentCalculation.currentTotalBillAmount - paidAmount - discount
            if (paidAmount === 0 || balance === 0) {
                setPartiallyPaid(false)
            }
            if ((paidAmount + paymentCalculation.alreadyPaid) > paymentCalculation.currentTotalBillAmount) {
                discount = 0
            }
            if (discount > balance) {
                discount = (paymentCalculation.currentTotalBillAmount - paidAmount < 0) ? 0 : paymentCalculation.currentTotalBillAmount - paidAmount
            }
            if (balance < 0) {
                balance = 0
                if (paidAmount > paymentCalculation.currentTotalBillAmount) {
                    credit = paidAmount - paymentCalculation.currentTotalBillAmount
                } else {
                    credit = paidAmount + discount - paymentCalculation.currentTotalBillAmount
                }
            }

            setPaymentCalculation({
                ...paymentCalculation,
                credits: credit,
                balance: balance,
                paidAmount: paidAmount,
                discount: discount
            })
        }

        return <Center mt={3}>
            <VStack space={3}>
                <HStack alignItems={"center"} space={3}>
                    <Text bold minW={100} maxW={100}>Bill Amount</Text>
                    <TextInput inputMode={"numeric"}
                               style={{
                                   width: 60,
                                   height: 40,
                                   bottom: 0,
                                   borderWidth: 1,
                                   borderColor: "black",
                                   backgroundColor: "transparent",
                                   borderRadius: 10,
                                   zIndex: 100,
                                   textAlign: "center",
                                   fontWeight: "bold"
                               }}
                               value={String(order.orderPaymentDetails.totalBillAmount)}
                               editable={false}
                    />
                </HStack>
                <HStack alignItems={"center"} space={3}>
                    <Text bold minW={100} maxW={100}>Already Paid Amount</Text>
                    <TextInput inputMode={"numeric"}
                               style={{
                                   width: 60,
                                   height: 40,
                                   bottom: 0,
                                   borderWidth: 1,
                                   borderColor: "black",
                                   backgroundColor: "transparent",
                                   borderRadius: 10,
                                   zIndex: 100,
                                   textAlign: "center",
                                   fontWeight: "bold"
                               }}
                               value={String(order.orderPaymentDetails.paidAmount)}
                               editable={false}
                    />
                </HStack>
                <HStack alignItems={"center"} space={3}>
                    <Text bold minW={100} maxW={100}>Balance</Text>
                    <TextInput inputMode={"numeric"}
                               style={{
                                   width: 60,
                                   height: 40,
                                   bottom: 0,
                                   borderWidth: 1,
                                   borderColor: "black",
                                   backgroundColor: "transparent",
                                   borderRadius: 10,
                                   zIndex: 100,
                                   textAlign: "center",
                                   fontWeight: "bold"
                               }}
                               value={String(paymentCalculation.balance)}
                               editable={false}
                    />
                </HStack>
                <HStack alignItems={"center"} space={3}>
                    <Text bold minW={100} maxW={100}>Paid Amount</Text>
                    <TextInput inputMode={"numeric"}
                               style={{
                                   width: 60,
                                   height: 40,
                                   bottom: 0,
                                   borderWidth: 1,
                                   borderColor: "black",
                                   backgroundColor: "transparent",
                                   borderRadius: 10,
                                   zIndex: 100,
                                   textAlign: "center",
                                   fontWeight: "bold"
                               }}
                               value={String(paymentCalculation.paidAmount)}
                               onChange={(e) => finalCalculation(Number(e.nativeEvent.text), paymentCalculation.discount)}
                    />
                </HStack>
                <HStack alignItems={"center"} space={3}>
                    <Text bold minW={100} maxW={100}>Discount</Text>
                    <TextInput inputMode={"numeric"}
                               style={{
                                   width: 60,
                                   height: 40,
                                   bottom: 0,
                                   borderWidth: 1,
                                   borderColor: "black",
                                   backgroundColor: "transparent",
                                   borderRadius: 10,
                                   zIndex: 100,
                                   textAlign: "center",
                                   fontWeight: "bold"
                               }}
                               value={String(paymentCalculation.discount)}
                               onChange={(e) => finalCalculation(paymentCalculation.paidAmount,
                                   Number(e.nativeEvent.text))}
                    />
                </HStack>
            </VStack>
        </Center>
    }
    const CreditInformation = ({credits}) => {
        return <>
            <Alert status="info" colorScheme="info" my={3}>
                <Text bold>{`${rupee_symbol} ${credits} will be added to customer account as Credits`}</Text>
                <Box _text={{
                    color: "coolGray.600"
                }}>
                    This credit amount will adjusted in the future orders!
                </Box>
            </Alert>
        </>
    }

    const PartialPaySection = ({paymentCalculation, partiallyPaid, setPartiallyPaid}) => {
        return <Center mt={4}>
            <Checkbox value={"partialPay"}
                      colorScheme={"purple"}
                      isDisabled={(paymentCalculation.paidAmount === 0 || paymentCalculation.balance === 0)}
                      onChange={flag => setPartiallyPaid(flag)}
                      isChecked={partiallyPaid}
                      fontWeight={"bold"}>Partially Paid?</Checkbox>
        </Center>
    }

    const PaymentType = ({paymentType, setPaymentType}) => {
        return <>
            <Text fontSize={18} bold mt={3}>Payment Type</Text>
            <Center mt={3}>
                <Radio.Group name={"paymentType"}
                             onChange={(e) => setPaymentType(e)}
                             value={paymentType}
                             colorScheme={"purple"}
                >
                    <HStack space={3}>
                        <Radio value={"CASH"}>CASH</Radio>
                        <Radio value={"UPI"}>UPI</Radio>
                    </HStack>
                </Radio.Group>
            </Center>
        </>
    }
    const AddPaymentContainer = () => {
        const [partiallyPaid, setPartiallyPaid] = useState(false)
        const [paymentType, setPaymentType] = useState('');

        const [paymentCalculation, setPaymentCalculation] = useState({
            currentTotalBillAmount: 0,
            totalBillAmount: 0,
            alreadyPaid: 0,
            balance: 0,
            paidAmount: 0,
            discount: 0,
            credits: 0
        })

        useEffect(() => {
            setPaymentCalculation({
                currentTotalBillAmount: order.orderPaymentDetails.totalBillAmount - order.orderPaymentDetails.paidAmount,
                totalBilledAmount: order.orderPaymentDetails.totalBillAmount,
                alreadyPaidAmount: order.orderPaymentDetails.paidAmount,
                balance: order.orderPaymentDetails.totalBillAmount - order.orderPaymentDetails.paidAmount,
                paidAmount: 0,
                discount: order.orderPaymentDetails.discount,
                credits: 0
            })
        }, []);

        return <>
            <KeyboardAvoidingView enabled behavior={"position"}>
                <ScrollView horizontal={false} mx={5} contentContainerStyle={{paddingBottom: 80}}
                            showsVerticalScrollIndicator={false}>
                    <CustomerDetails customer={order?.customer}/>
                    <OrderDetails orderLines={order.orderLines}/>
                    {
                        paymentCalculation.credits !== 0 &&
                        <CreditInformation credits={paymentCalculation.credits}/>
                    }

                    <PayingSection paymentCalculation={paymentCalculation}
                                   setPaymentCalculation={setPaymentCalculation}
                                   setPartiallyPaid={setPartiallyPaid}/>


                    <PartialPaySection paymentCalculation={paymentCalculation}
                                       partiallyPaid={partiallyPaid}
                                       setPartiallyPaid={setPartiallyPaid}/>

                    <PaymentType paymentType={paymentType} setPaymentType={setPaymentType}/>
                </ScrollView>
            </KeyboardAvoidingView>

            <MakePaymentAndDeliver
                paymentCalculation={paymentCalculation}
                partiallyPaid={partiallyPaid}
                paymentType={paymentType}
            />
        </>
    }
    return (
        <>
            <AddPaymentContainer/>
        </>
    );
}

export default AddPayment;