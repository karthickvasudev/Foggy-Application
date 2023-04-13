import React, {useEffect, useState} from 'react';
import {useIsFocused} from "@react-navigation/native";
import {GetListOfProducts, GetProfileApi, LogoutHandler} from "../apihelper/AppApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HStack, ScrollView, Select, Switch, View, Text} from "native-base";
import {AppColor} from "../../constants/AppColor";
import {Ionicons} from "@expo/vector-icons";
import {Dimensions} from "react-native";
import ProductListViewHolder from "../viewholders/ProductListViewHolder";

function ProductList(props) {
    const [product, setProduct] = useState([])
    const resume = useIsFocused()

    useEffect(() => {
            const asyncFunc = async () => {
                try {
                    let products = await GetListOfProducts()
                    if(products.status === 200) {
                        let productList = await products.json();
                        setProduct(productList)
                    }
                } catch (err) {
                    throw new Error("error in product")
                }
            }
            if (resume) asyncFunc()
        },
        [resume]
    )

    const navigateToViewProduct = (product) => {
        props.navigation.navigate("View Product", product)
    }

    return <>
        <ScrollView>
            {
                product.map((product, index) =>
                    <ProductListViewHolder key={index}
                                           name={product.name}
                                           quantity={product.quantity}
                                           price={product.price}
                                           active={product.active}
                                           onClick={() => navigateToViewProduct(product)}
                    />
                )
            }
            {(product.length === 0) && <View flex={1} alignSelf={"center"} mt={10}>
                <Text>No Products!</Text>
            </View>}
        </ScrollView>
    </>
}

export default ProductList;
