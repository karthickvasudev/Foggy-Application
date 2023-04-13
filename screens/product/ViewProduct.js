import React from 'react';
import {VStack} from "native-base";
import ListDetailsView from "../viewholders/ListDetailsView";
import {rupee_symbol} from "../../constants/Constants";

function ViewProduct(props) {
    const product = props.route.params

    return (
        <>
            <VStack mx={10}>
                <ListDetailsView heading={"Name"} value={product.name}/>
                <ListDetailsView heading={"Price of Quantity"}
                                 value={`${rupee_symbol} ${product.price} for ${product.quantity === 1 ? 'a' : product.quantity} Qty`}/>
                <ListDetailsView heading={"Status"}
                                 value={(product.active === true) ? 'Active' : 'InActive'}/>
                <ListDetailsView heading={"Created On"}
                                 value={product.createdOn}/>
            </VStack>
        </>
    );
}

export default ViewProduct;