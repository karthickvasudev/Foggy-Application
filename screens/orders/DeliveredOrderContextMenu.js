import React from 'react';
import {Actionsheet, Heading, HStack, Text} from "native-base";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {ConfirmationDialog} from "./ConfirmationDialog";
import {useNavigation} from "@react-navigation/native";

function DeliveredOrderContextMenu({order, isOpen, onOpen, onClose}) {
    const navigation = useNavigation()
    return (
        <>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Heading fontSize={18}>{order.id}</Heading>
                    <Actionsheet.Item onPress={() => {
                        onClose()
                        navigation.navigate("Add Payment", order)
                    }}>
                        <HStack space={3}>
                            <FontAwesome5 name="rupee-sign" size={24} color="black"/>
                            <Text fontSize={16} bold>Add Payment</Text>
                        </HStack>
                    </Actionsheet.Item>

                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

export default DeliveredOrderContextMenu;