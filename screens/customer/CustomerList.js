import React, {useEffect, useState} from 'react';
import {useIsFocused} from "@react-navigation/native";
import CustomerListViewHolder from "../viewholders/CustomerListViewHolder";
import {GetListOfCustomer, LogoutHandler} from "../apihelper/AppApi";
import {Center, ScrollView, Text} from "native-base";
import {FlashList} from "@shopify/flash-list";
import EmptyCenterContent from "../../constants/EmptyCenterContent";
import ProductSkeleton from "../Skeleton/ProductSkeleton";

function CustomerList(props) {
    const resume = useIsFocused()
    const [isLoading, setIsLoading] = useState(false);

    const [customer, setCustomer] = useState([])
    useEffect(() => {
        async function asyncFunction() {
            setIsLoading(true)
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
            setIsLoading(false)
        }

        if (resume)
            asyncFunction();
    }, [resume])
    const navigateToViewCustomer = (customer) => {
        props.navigation.navigate("View Customer", customer)
    }

    const renderItem = ({item}) => {
        return <CustomerListViewHolder
            name={item.name}
            phoneNumber={item.phoneNumber}
            onClick={() => navigateToViewCustomer(item)}
        />
    }

    return <>
        {
            isLoading && <ProductSkeleton/>
        }
        {!isLoading && <FlashList renderItem={renderItem}
                    estimatedItemSize={100}
                    ListEmptyComponent={<EmptyCenterContent content={"No Customer"}/>}
                    data={customer}
        />}
    </>
}

export default CustomerList;