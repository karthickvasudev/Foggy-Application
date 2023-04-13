import {
    AlertDialog,
    Center,
    HStack,
    KeyboardAvoidingView,
    Radio,
    ScrollView,
    Text,
    TextArea,
    View,
    VStack
} from "native-base";
import {Dimensions, TextInput, ToastAndroid, TouchableOpacity} from "react-native";
import {AppColor} from "../../constants/AppColor";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import CustomTextInput from "../../constants/CustomTextInput";
import {CreateOrderApi, GetListOfCustomer, GetListOfProducts} from "../apihelper/AppApi";
import {reuseStyle} from "../../constants/ReuseStyle";
import PrimaryButton from "../../constants/PrimaryButton";
import {rupee_symbol} from "../../constants/Constants";

export default function CreateOrder(props) {
    const isResume = useIsFocused()
    const [customerList, setCustomerList] = useState([]);
    const [productList, setProductList] = useState([])

    useEffect(() => {
        async function asyncFunction() {
            props.navigation.setOptions({headerShown: true})
            loadCustomer()
            loadProducts();
        }

        async function loadProducts() {
            try {
                let response = await GetListOfProducts()
                if (response.status === 200) {
                    let json = await response.json();
                    setProductList(json.filter(p => p.active))
                }
            } catch (err) {
            }
        }

        async function loadCustomer() {
            try {
                let response = await GetListOfCustomer();
                if (response.status === 200) {
                    let json = await response.json();
                    setCustomerList(json)
                }
            } catch (err) {
            }
        }

        asyncFunction()
    }, [isResume])

    const CustomerSection = ({customerDetails, setCustomerDetails}) => {
        const [customerSelectionDialogFlag, setCustomerSelectionDialogFlag] = useState(false);

        const [search, setSearch] = useState('')
        const filteredCustomers = customerList.filter(customer =>
            customer?.name.toLowerCase().includes(search.toLowerCase()) ||
            customer?.phoneNumber.toLowerCase().includes(search.toLowerCase()))
        const onDialogClose = () => setCustomerSelectionDialogFlag(false);
        return <>
            <VStack space={5} mt={5}>
                <Text color={AppColor.primary} fontWeight={"bold"} fontSize={18}>Customer Details</Text>
                <HStack>
                    <View w={"85%"}>
                        <CustomTextInput inputType={"numeric"}
                                         placeholder={"Phone number"}
                                         icon={{name: 'phone', color: AppColor.grey, size: 16}}
                                         value={customerDetails.phoneNumber}
                                         onChange={(e) => setCustomerDetails({
                                             ...customerDetails,
                                             phoneNumber: e.nativeEvent.text
                                         })}
                        />
                    </View>
                    <View mx={3} alignSelf={"center"}>
                        <TouchableOpacity activeOpacity={0.6}
                                          onPress={() => setCustomerSelectionDialogFlag(!customerSelectionDialogFlag)}>
                            <Text color={AppColor.primary} bold>Select</Text>
                        </TouchableOpacity>
                    </View>
                </HStack>
                <CustomTextInput placeholder={"Name"}
                                 icon={{name: 'user', color: AppColor.grey, size: 16}}
                                 value={customerDetails.name}
                                 onChange={(e) => setCustomerDetails({...customerDetails, name: e.nativeEvent.text})}
                />
            </VStack>
            <AlertDialog leastDestructiveRef={null} isOpen={customerSelectionDialogFlag} onClose={onDialogClose}
                         maxHeight={Dimensions.get("screen").height - 100}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton/>
                    <AlertDialog.Header>Select Customer</AlertDialog.Header>
                    <AlertDialog.Body>
                        <View mb={3}>
                            <CustomTextInput placeholder={"search"}
                                             icon={{name: 'search1', size: 18, color: AppColor.primary}}
                                             onChange={(e) => setSearch(e.nativeEvent.text)}
                            />
                        </View>
                        <ScrollView horizontal={false}>
                            {
                                filteredCustomers.map((customer, index) => {
                                    return <TouchableOpacity activeOpacity={0.6}
                                                             key={index}
                                                             onPress={() => {
                                                                 setCustomerDetails({
                                                                     ...customerDetails,
                                                                     name: customer.name,
                                                                     phoneNumber: customer.phoneNumber
                                                                 })
                                                                 setCustomerSelectionDialogFlag(!customerSelectionDialogFlag)
                                                             }}>
                                        <View borderBottomColor={"black"} borderBottomWidth={1} my={1}>
                                            <Text bold>{customer.name}</Text>
                                            <Text mb={2}>{customer.phoneNumber}</Text>
                                        </View>
                                    </TouchableOpacity>
                                })
                            }
                        </ScrollView>
                    </AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    }

    const ProductSection = ({orderLines, setOrderLines}) => {
        return <>
            <Text bold fontSize={18}>Products</Text>
            {
                productList.map((product, index) => {
                    return <View key={index} borderBottomWidth={1} borderBottomColor={"black"}>
                        <HStack my={3} space={5}>
                            <VStack minW={"50%"} maxW={"50%"}>
                                <Text bold>{product.name}</Text>
                                <Text bold
                                      color={AppColor.grey}>{`${rupee_symbol} ${product.price} for ${(product.quantity === 1) ? 'a' : product.quantity} qty`}</Text>
                            </VStack>
                            <View width={16}>
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
                                               alignItems: "center",
                                               justifyContent: "center"
                                           }}
                                           onChange={(e) => {
                                               setOrderLines({
                                                   ...orderLines,
                                                   [product.id]: {
                                                       quantity: Number(e.nativeEvent.text),
                                                       price: (Number(e.nativeEvent.text) * product.price) / product.quantity
                                                   }
                                               })
                                           }}
                                />
                            </View>
                            <View alignSelf={"center"}>
                                <Text>{`${rupee_symbol} ${(orderLines[product.id] ? orderLines[product.id].quantity : 0) * product.price}`}</Text>
                            </View>
                        </HStack>
                    </View>
                })
            }
        </>
    }

    const TotalAndCreateOrderBtn = ({
                                        quantity,
                                        price,
                                        customerDetails,
                                        orderLines,
                                        notes,
                                        orderType,
                                        mediatorCharge
                                    }) => {
        const createOrder = async () => {
            let _orderLines = Object.keys(orderLines).map(key => {
                return {
                    id: key,
                    quantity: orderLines[key].quantity
                }
            })
            let body = {
                name: customerDetails.name,
                phoneNumber: customerDetails.phoneNumber,
                notes: notes,
                orderType: orderType,
                mediatorPickupCharge: mediatorCharge,
                orderLines: _orderLines.filter(ol => ol.quantity !== 0)
            }
            let response = await CreateOrderApi(body);
            if (response.status === 200) {
                let json = await response.json();
                props.navigation.replace("View Order", json)
            } else {
                ToastAndroid.show("error in create order", 5)
            }
        }
        return <>
            <View style={[reuseStyle.stickyBottomButton, {backgroundColor: "white"}]} pb={3}>
                <View w={'100%'} px={5}>
                    <Center my={1}>
                        <HStack space={4}>
                            <HStack>
                                <Text bold>Total Count : </Text>
                                <Text fontSize={15}>{quantity}</Text>
                            </HStack>
                            <HStack>
                                <Text bold>Total Price : </Text>
                                <Text fontSize={15}>{`${rupee_symbol} ${price}`}</Text>
                            </HStack>
                        </HStack>

                    </Center>
                    <PrimaryButton name={"Create Order"}
                                   onPress={() => createOrder()}
                                   disabled={(customerDetails.name === '') || (customerDetails.phoneNumber === '') ||
                                   (quantity === 0) || orderType === '' ||
                                   (orderType === 'MEDIATOR') ? (mediatorCharge === 0) : false}/>
                </View>
            </View>
        </>
    }

    const NotesSection = ({notes, setNotes}) => {
        return <>
            <Text bold fontSize={18} mt={5}>Notes</Text>
            <TextArea mt={3} value={notes} onChange={(e) => setNotes(e.nativeEvent.text)}/>
        </>
    }

    const OrderType = ({orderType, setOrderType}) => {
        return <>
            <Text bold fontSize={18} my={3}>Order Type</Text>
            <Radio.Group name={"orderType"}
                         onChange={(e) => setOrderType(e)} value={orderType}
                         colorScheme={"purple"}
                         alignItems={"center"}>
                <HStack space={5}>
                    <Radio value={"WALKIN"}>Walk In</Radio>
                    <Radio value={"SELFPICKUP"}>Self Pickup</Radio>
                    <Radio value={"MEDIATOR"}>Mediator</Radio>
                </HStack>
            </Radio.Group>
        </>
    }

    const MediatorCharge = ({mediatorCharge, setMediatorCharge}) => {
        return <>
            <HStack mt={3} alignSelf={"center"}>
                <View alignSelf={"center"}>
                    <Text>Mediator Charge : </Text>
                </View>
                <View>
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
                                   setMediatorCharge(Number(e.nativeEvent.text))
                               }}
                    />
                </View>
            </HStack>
        </>
    }
    const OrderForm = () => {
        const [customerDetails, setCustomerDetails] = useState({name: '', phoneNumber: ''})
        const [orderLines, setOrderLines] = useState({})
        const quantity = Object.keys(orderLines).map(key => orderLines[key].quantity).reduce((p, c) => p + c, 0)
        const price = Object.keys(orderLines).map(key => orderLines[key].price).reduce((p, c) => p + c, 0)
        const [notes, setNotes] = useState('');
        const [orderType, setOrderType] = useState('')
        const [mediatorCharge, setMediatorCharge] = useState(0);


        return <>
            <KeyboardAvoidingView enabled behavior={"padding"}>
                <ScrollView horizontal={false} contentContainerStyle={{paddingBottom: 30}}>
                    <VStack space={4} mx={5}>
                        <CustomerSection customerDetails={customerDetails}
                                         setCustomerDetails={setCustomerDetails}/>
                        <ProductSection orderLines={orderLines}
                                        setOrderLines={setOrderLines}/>
                        <OrderType orderType={orderType} setOrderType={setOrderType}/>
                        {
                            (orderType === 'MEDIATOR') &&
                            <MediatorCharge mediatorCharge={mediatorCharge} setMediatorCharge={setMediatorCharge}/>
                        }
                        <NotesSection notes={notes} setNotes={setNotes}/>
                    </VStack>
                </ScrollView>
            </KeyboardAvoidingView>
            <TotalAndCreateOrderBtn quantity={quantity}
                                    price={price}
                                    notes={notes}
                                    customerDetails={customerDetails}
                                    orderType={orderType}
                                    orderLines={orderLines}
                                    mediatorCharge={mediatorCharge}/>

        </>
    }

    return (
        <OrderForm/>
    )
}