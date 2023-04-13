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
import PrimaryButton from "../../constants/PrimaryButton";
import {reuseStyle} from "../../constants/ReuseStyle";
import {PayingLaterDeliveryApi, PayingNowDeliveryApi} from "../apihelper/AppApi";
import {TextInput} from "react-native";

function ReceivePayment(props) {
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

    const PayingNowLaterConfirmation = ({deliveryOption, setDeliveryOption}) => {
        return <>
            <Text fontSize={18} bold mt={3}>Payment Details</Text>
            <Center mt={3}>
                <Radio.Group name={"deliveryOption"}
                             onChange={(e) => setDeliveryOption(e)}
                             value={deliveryOption}
                             colorScheme={"purple"}
                >
                    <HStack space={3}>
                        <Radio value={"payingNow"}>Paying Now</Radio>
                        <Radio value={"payingLater"}>Paying Later</Radio>
                    </HStack>
                </Radio.Group>
            </Center>
        </>
    }

    const MakePaymentAndDeliver = ({
                                       payingType,
                                       deliveryType,
                                       mediatorDeliveryCharge,
                                       paymentCalculation,
                                       partiallyPaid,
                                       paymentType
                                   }) => {
        const paymentDelivery = () => {
            if (payingType === 'payingLater')
                payingLater()
            else
                payingNow()
        }

        const payingLater = async () => {
            let body = {
                orderId: order.id,
                deliveryType: deliveryType,
                mediatorDeliveryCharge: Number(mediatorDeliveryCharge)
            }
            let response = await PayingLaterDeliveryApi(order.id, body);
            if (response.status === 200) {
                let json = await response.json();
                props.navigation.replace("View Order", json)
            }
        }

        const payingNow = async () => {
            let body = {
                orderId: order.id,
                paidAmount: paymentCalculation.paidAmount,
                discount: paymentCalculation.discount,
                deliveryType: deliveryType,
                mediatorDeliveryCharge: mediatorDeliveryCharge,
                paymentType: paymentType
            }
            let response = await PayingNowDeliveryApi(order.id, body);
            if (response.status === 200) {
                let json = await response.json();
                props.navigation.navigate("View Order", json)
            }
        }
        return <>
            <View style={reuseStyle.stickyBottomButton} pb={2}>
                <View w={"100%"} px={5}>
                    <PrimaryButton name={"Confirm & Delivery"}
                                   onPress={paymentDelivery}
                                   disabled={
                                       payingType === '' ||
                                       (payingType === 'payingLater' && deliveryType === '' || deliveryType === 'MEDIATOR' && (mediatorDeliveryCharge.length === 0 || mediatorDeliveryCharge === 0)) ||
                                       (payingType === 'payingNow' && paymentCalculation.paidAmount === 0 || (paymentCalculation.balance !== 0 && partiallyPaid === false)) ||
                                       paymentType === '' || deliveryType === '' || deliveryType === 'MEDIATOR' && (mediatorDeliveryCharge.length === 0 || mediatorDeliveryCharge === 0)
                                   }/>
                </View>
            </View>
        </>
    }

    const PayingSection = ({paymentCalculation, setPaymentCalculation, setPartiallyPaid}) => {

        const finalCalculation = (paidAmount, discount) => {
            let credit = 0
            let balance = order.orderPaymentDetails.totalBillAmount - paidAmount - discount
            if (paidAmount === 0 || balance === 0) {
                setPartiallyPaid(false)
            }
            if (paidAmount > order.orderPaymentDetails.totalBillAmount) {
                discount = 0
            }
            if (discount > balance) {
                discount = (order.orderPaymentDetails.totalBillAmount - paidAmount < 0) ? 0 : order.orderPaymentDetails.totalBillAmount - paidAmount
            }
            if (balance < 0) {
                balance = 0
                credit = paidAmount + discount - order.orderPaymentDetails.totalBillAmount
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
                               onChange={(e) => finalCalculation(paymentCalculation.paidAmount, Number(e.nativeEvent.text))}
                    />
                </HStack>
            </VStack>
        </Center>
    }

    const DeliveryType = ({deliveryType, setDeliveryType}) => {
        return <>
            <Text fontSize={18} bold mt={3}>Delivery Type</Text>
            <Center mt={3}>
                <Radio.Group name={"deliveryType"}
                             onChange={(e) => setDeliveryType(e)}
                             value={deliveryType}
                             colorScheme={"purple"}
                >
                    <HStack space={3}>
                        <Radio value={"WALK_IN"}>Walk In</Radio>
                        <Radio value={"SELF_DELIVERY"}>Self Delivery</Radio>
                        <Radio value={"MEDIATOR"}>Mediator</Radio>
                    </HStack>
                </Radio.Group>
            </Center>
        </>
    }

    const MediatorDeliveryCharge = ({setMediatorDeliveryCharge}) => {
        return <>
            <Center mt={5}>
                <HStack space={3} alignItems={"center"}>
                    <Text>Mediator Charge</Text>
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

                               }}
                               onChange={(e) => {
                                   setMediatorDeliveryCharge(Number(e.nativeEvent.text))
                               }}
                    />
                </HStack>
            </Center>
        </>
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
                      isDisabled={(paymentCalculation.paidAmount===0 || paymentCalculation.paidAmount >= order.orderPaymentDetails.totalBillAmount)}
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
    const ReceivePaymentContainer = () => {
        const [payingType, setPayingType] = useState('')
        const [deliveryType, setDeliveryType] = useState('')
        const [mediatorDeliveryCharge, setMediatorDeliveryCharge] = useState('')
        const [partiallyPaid, setPartiallyPaid] = useState(false)
        const [paymentType, setPaymentType] = useState('');

        const [paymentCalculation, setPaymentCalculation] = useState({
            balance: 0,
            paidAmount: 0,
            discount: 0,
            credits: 0
        })

        useEffect(() => {
            setPaymentCalculation({
                balance: order.orderPaymentDetails.totalBillAmount,
                paidAmount: order.orderPaymentDetails.paidAmount,
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
                    <PayingNowLaterConfirmation deliveryOption={payingType}
                                                setDeliveryOption={setPayingType}/>
                    {
                        paymentCalculation.credits !== 0 &&
                        <CreditInformation credits={paymentCalculation.credits}/>
                    }
                    {
                        (payingType === 'payingNow') &&
                        <PayingSection paymentCalculation={paymentCalculation}
                                       setPaymentCalculation={setPaymentCalculation}
                                       setPartiallyPaid={setPartiallyPaid}/>
                    }
                    {
                        (payingType === 'payingNow') &&
                        <PartialPaySection paymentCalculation={paymentCalculation}
                                           partiallyPaid={partiallyPaid}
                                           setPartiallyPaid={setPartiallyPaid}/>
                    }

                    {
                        (payingType === 'payingNow') &&
                        <PaymentType paymentType={paymentType} setPaymentType={setPaymentType} />
                    }

                    <DeliveryType deliveryType={deliveryType} setDeliveryType={setDeliveryType}/>
                    {deliveryType === 'MEDIATOR' &&
                        <MediatorDeliveryCharge setMediatorDeliveryCharge={setMediatorDeliveryCharge}/>}
                </ScrollView>
            </KeyboardAvoidingView>

            <MakePaymentAndDeliver payingType={payingType}
                                   deliveryType={deliveryType}
                                   paymentCalculation={paymentCalculation}
                                   partiallyPaid={partiallyPaid}
                                   paymentType={paymentType}
                                   mediatorDeliveryCharge={mediatorDeliveryCharge}
            />
        </>
    }
    return (
        <>
            <ReceivePaymentContainer/>
        </>
    );
}

export default ReceivePayment;