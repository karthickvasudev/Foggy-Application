import React, {useEffect, useState} from 'react';
import {HStack, View, Text, FormControl, Center, VStack} from "native-base";
import CustomTextInput from "../../constants/CustomTextInput";
import PrimaryButton from "../../constants/PrimaryButton";

import {LogoutHandler, UpdateCustomerApi} from "../apihelper/AppApi";

function UpdateCustomer(props) {
    const customer = props.route.params
    const [body, setBody] = useState({});

    useEffect(() => {
        async function asyncFunc() {
            setBody(customer)
        }

        asyncFunc()
    }, []);

    const updateCustomer = async () => {
        try {
            let response = await UpdateCustomerApi(customer.id, body);
            if (response.status === 200) {
                let json = await response.json()
                props.navigation.replace("View Customer", json)
            } else {
                console.log(await response.json())
                LogoutHandler(response)
            }
        } catch (err) {
            console.log(err)
            if (err.message() === "logout") {
                props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}]
                })
            }
        }

    }

    return (
        <>
            <Center mx={10}>
                <FormControl>
                    <VStack alignItems={"center"} mt={5} space={5}>
                        <Text alignSelf={"flex-start"} fontSize={18} bold>Contact</Text>
                        <CustomTextInput placeholder={"Name *"}
                                         value={body.name}
                                         onChange={(e) => setBody({...body, name: e.nativeEvent.text})}/>
                        <CustomTextInput placeholder={"Phone Number *"}
                                         value={body.phoneNumber}
                                         onChange={(e) => setBody({...body, phoneNumber: e.nativeEvent.text})}/>
                        <CustomTextInput placeholder={"Email"}
                                         value={body.email}
                                         onChange={(e) => setBody({...body, email: e.nativeEvent.text})}/>
                    </VStack>

                    <VStack alignItems={"center"} mt={5} space={5}>
                        <Text alignSelf={"flex-start"} fontSize={18} bold>Address</Text>
                        <CustomTextInput placeholder={"Address"}
                                         value={body?.address?.address}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, address: e.nativeEvent.text}
                                         })}/>
                        <CustomTextInput placeholder={"City"}
                                         value={body?.address?.city}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, city: e.nativeEvent.text}
                                         })}/>
                        <CustomTextInput placeholder={"State"}
                                         value={body?.address?.state}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, state: e.nativeEvent.text}
                                         })}/>
                        <CustomTextInput placeholder={"Pin Code"}
                                         value={body?.address?.pinCode}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, pinCode: e.nativeEvent.text}
                                         })}/>
                    </VStack>
                    <VStack w={"100%"} mt={5}>
                        <PrimaryButton name={"Update Customer"}
                                       onPress={updateCustomer}/>
                    </VStack>
                </FormControl>
            </Center>

        </>
    );
}

export default UpdateCustomer;