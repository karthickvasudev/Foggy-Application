import React, {useEffect, useState} from 'react';
import {Center, HStack, Text, View, VStack} from "native-base";
import {raisedLook} from "../../constants/ReuseStyle";
import {AppColor} from "../../constants/AppColor";
import {rupee_symbol} from "../../constants/Constants";
import {TouchableOpacity} from "react-native";
import {GetCreditList} from "../apihelper/AppApi";
import CreditListViewHolder from "../viewholders/CreditListViewHolder";
import {useIsFocused} from "@react-navigation/native";

function CreditsList(props) {
    let resume = useIsFocused();
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        async function asyncFunc() {
            let response = await GetCreditList();
            if (response.status === 200) {
                let json = await response.json();
                setCredits(json)
            }
        }

        asyncFunc()
    }, [resume]);
    return (
        <>
            {
                credits.map((credit, index) => <CreditListViewHolder key={index} credit={credit}/>)
            }
            {
                credits.length === 0 &&
                <Center alignContent={"center"} flex={1}>
                    <Text>No Credits!</Text>
                </Center>
            }
        </>
    );
}

export default CreditsList;