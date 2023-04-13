import React from 'react';
import {HStack, View, VStack} from "native-base";
import {FontAwesome} from "@expo/vector-icons";
import ListDetailsView from "../viewholders/ListDetailsView";

function ViewEmployee(props) {
    const employee = props.route.params
    return (
        <>
            <HStack mx={5}>
                <View alignSelf={"center"}>
                    <FontAwesome name="file-photo-o" size={80} color="black"/>
                </View>
                <VStack flex={1} mx={5}>
                    <ListDetailsView heading={'Name'} value={employee.name}/>
                    <ListDetailsView heading={'Phone Number'} value={employee.phoneNumber}/>
                </VStack>
            </HStack>
        </>
    );
}

export default ViewEmployee;