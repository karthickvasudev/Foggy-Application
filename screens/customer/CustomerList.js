import React, {useEffect, useState} from 'react';
import {useIsFocused} from "@react-navigation/native";
import CustomerListViewHolder from "../viewholders/CustomerListViewHolder";
import {GetListOfCustomer, LogoutHandler} from "../apihelper/AppApi";
import {Center, ScrollView, Text} from "native-base";

function CustomerList(props) {
    const resume = useIsFocused()
    const [customer, setCustomer] = useState([])
    useEffect(() => {
        async function asyncFunction() {
            try {
                let rawResponse = await GetListOfCustomer();
                if (rawResponse.status === 200) {
                    let customers = await rawResponse.json()
                    setCustomer(customers)
                } else {
                    console.log("error in getlistofcustomer api")
                    LogoutHandler(rawResponse)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (resume)
            asyncFunction();
    }, [resume])
    const navigateToViewCustomer = (customer) => {
        props.navigation.navigate("View Customer", customer)
    }

    return <>
        <ScrollView>
            {
                customer.map((customer, index) =>
                    <CustomerListViewHolder
                        key={index}
                        name={customer.name}
                        phoneNumber={customer.phoneNumber}
                        onClick={() => navigateToViewCustomer(customer)}/>)
            }
        </ScrollView>
        {
            customer.length === 0 &&
            <Center flex={1}>
                <Text>No Customers!</Text>
            </Center>
        }
    </>
}

export default CustomerList;