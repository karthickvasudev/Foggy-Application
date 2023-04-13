import React, {useState} from 'react';
import {CreateProductApi} from "../apihelper/AppApi";
import {ScrollView, View, VStack} from "native-base";
import CustomTextInput from "../../constants/CustomTextInput";
import {reuseStyle} from "../../constants/ReuseStyle";
import PrimaryButton from "../../constants/PrimaryButton";

function CreateProduct(props) {
    const [body, setBody] = useState({name: "", quantity: 0, price: 0})

    async function createProduct() {
        let rawResponse = await CreateProductApi(body);
        if (rawResponse.status === 200) {
            props.navigation.goBack()
        } else {
            console.log(rawResponse)
        }
    }

    return <>
        <ScrollView>
            <VStack space={2} alignItems={"center"} mt={5} mx={10}>
                <View>
                    <CustomTextInput placeholder={"Name"}
                                     onChange={e => setBody({...body, name: e.nativeEvent.text})}
                    />
                </View>
                <View>
                    <CustomTextInput inputType={'numeric'} placeholder={"Quantity"}
                                     onChange={e => setBody({...body, quantity: Number(e.nativeEvent.text)})}
                    />
                </View>
                <View>
                    <CustomTextInput placeholder={"Price"}
                                     inputType={'numeric'}
                                     onChange={e => setBody({...body, price: Number(e.nativeEvent.text)})}
                    />
                </View>
            </VStack>
        </ScrollView>
        <View style={reuseStyle.stickyBottomButton} pb={3}>
            <View w={"100%"} px={5}>
                <PrimaryButton name={"Create Product"} onPress={createProduct}/>
            </View>
        </View>
    </>
}

export default CreateProduct;