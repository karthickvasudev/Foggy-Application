import React, {useEffect} from 'react';
import {Text, VStack} from "native-base";
import ListDetailsView from "../viewholders/ListDetailsView";
import {TouchableOpacity} from "react-native";
import {useIsFocused} from "@react-navigation/native";

function ViewCustomer(props) {
    const resume = useIsFocused()
    const customer = props.route.params;

    useEffect(() => {
        async function asyncFunc() {
            props.navigation.setOptions({
                headerRight: () => {
                    return <TouchableOpacity activeOpacity={.6} onPress={navigateToUpdateCustomer}>
                        <Text mx={2}>Update</Text>
                    </TouchableOpacity>
                }
            })
        }

        asyncFunc()
    }, [resume]);

    const navigateToUpdateCustomer = () => {
        props.navigation.replace("Update Customer", customer)
    }
    return (
        <>
            <VStack mt={5} mx={10}>
                <ListDetailsView heading={"Name"} value={customer.name}/>
                <ListDetailsView heading={"Phone Number"} value={customer.phoneNumber}/>
                <ListDetailsView heading={"Email"} value={customer.email}/>
            </VStack>

            <VStack mt={5} mx={10}>
                <Text fontSize={18} bold>Address</Text>
                <ListDetailsView heading={"Address"} value={customer?.address?.address}/>
                <ListDetailsView heading={"City"} value={customer?.address?.city}/>
                <ListDetailsView heading={"State"} value={customer?.address?.state}/>
                <ListDetailsView heading={"Pin Code"} value={customer?.address?.pinCode}/>
            </VStack>
        </>
    );
}

export default ViewCustomer;