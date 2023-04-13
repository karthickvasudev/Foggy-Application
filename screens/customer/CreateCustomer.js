import React, {useState} from 'react';
import {Text, FormControl, Center, VStack} from "native-base";
import CustomTextInput from "../../constants/CustomTextInput";
import PrimaryButton from "../../constants/PrimaryButton";
import {CreateCustomerApi, LogoutHandler} from "../apihelper/AppApi";

function CreateCustomer(props) {
    const [body, setBody] = useState({});

    const createCustomer = async () => {
        try {
            console.log(body);
            let response = await CreateCustomerApi(body);
            if (response.status === 200) {
                let json = await response.json()
                props.navigation.replace("View Customer", json)
            } else {
                LogoutHandler(response)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Center mx={10}>
                <FormControl>
                    <VStack alignItems={"center"} mt={5} space={5}>
                        <Text alignSelf={"flex-start"} fontSize={18} bold>Contact</Text>
                        <CustomTextInput placeholder={"Name *"}
                                         onChange={(e) => setBody({...body, name: e.nativeEvent.text})}/>
                        <CustomTextInput placeholder={"Phone Number *"}
                                         inputType={"numeric"}
                                         onChange={(e) => setBody({...body, phoneNumber: e.nativeEvent.text})}/>
                        <CustomTextInput placeholder={"Email"}
                                         onChange={(e) => setBody({...body, email: e.nativeEvent.text})}/>
                    </VStack>

                    <VStack alignItems={"center"} mt={5} space={5}>
                        <Text alignSelf={"flex-start"} fontSize={18} bold>Address</Text>
                        <CustomTextInput placeholder={"Address"}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, address: e.nativeEvent.text}
                                         })}/>
                        <CustomTextInput placeholder={"City"}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, city: e.nativeEvent.text}
                                         })}/>
                        <CustomTextInput placeholder={"State"}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, state: e.nativeEvent.text}
                                         })}/>
                        <CustomTextInput placeholder={"Pin Code"}
                                         onChange={(e) => setBody({
                                             ...body,
                                             address: {...body.address, pinCode: e.nativeEvent.text}
                                         })}/>
                    </VStack>
                    <VStack w={"100%"} mt={5}>
                        <PrimaryButton name={"Create Customer"}
                                       onPress={createCustomer}/>
                    </VStack>
                </FormControl>
            </Center>

        </>
    );
}

export default CreateCustomer;