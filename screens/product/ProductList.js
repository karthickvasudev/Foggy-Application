import React, {useEffect, useState} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {GetListOfProducts, GetProfileApi, LogoutHandler} from "../apihelper/AppApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HStack, ScrollView, Select, Switch, View, Text} from "native-base";
import {AppColor} from "../../constants/AppColor";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions} from "react-native";
import ProductListViewHolder from "../viewholders/ProductListViewHolder";
import {FlashList} from "@shopify/flash-list";
import EmptyCenterContent from "../../constants/EmptyCenterContent";
import ProductSkeleton from "../Skeleton/ProductSkeleton";

function ProductList(props) {
    const [isLoading, setIsLoading] = useState(false);

    const [product, setProduct] = useState([])
    const resume = useIsFocused()

    useEffect(() => {
            const asyncFunc = async () => {
                setIsLoading(true)
                try {
                    let products = await GetListOfProducts()
                    if (products.status === 200) {
                        let productList = await products.json();
                        setProduct(productList)
                    }
                } catch (err) {
                    throw new Error("error in product")
                }
                setIsLoading(false)
            }
            if (resume) asyncFunc()
        },
        [resume]
    )

    const navigateToViewProduct = (product) => {
        props.navigation.navigate("View Product", product)
    }
    const renderItem = ({item}) => {
        return <>
            <ProductListViewHolder name={item.name}
                                   quantity={item.quantity}
                                   price={item.price}
                                   active={item.active}
                                   onClick={() => navigateToViewProduct(item)}/>
        </>
    }
    return (
        <>
            {isLoading && <ProductSkeleton/>}
            {!isLoading && <FlashList renderItem={renderItem}
                                      estimatedItemSize={100}
                                      ListEmptyComponent={<EmptyCenterContent content={"No Products!"}/>}
                                      data={product}
            />}
        </>
    )
}

export default ProductList;
