import React, {useRef} from 'react';
import {Actionsheet, Heading, HStack, Text} from "native-base";
import {AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {ConfirmationDialog} from "./ConfirmationDialog";
import {useNavigation} from "@react-navigation/native";

function CompletedOrderContextMenu({order, isOpen, onOpen, onClose}) {
    const navigation = useNavigation()
    const confirmationDialogRef = useRef(null)

    const resendSmsConfirmationDialog = {
        title: "Resend SMS",
        content: `Are you sure want to resend completed order sms of ${order.id}?`,
        showSmsCheckBox: false,
        defaultChecked: true,
        confirmationBtnName: 'Resend',
        confirmBtnAction: async () => {
            confirmationDialogRef.current.closeConfirmationDialog()
        }
    }

    return (
        <>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Heading fontSize={18}>{order.id}</Heading>

                    <Actionsheet.Item onPress={() => {
                        onClose()
                        confirmationDialogRef.current.showConfirmationDialog(resendSmsConfirmationDialog)
                    }}>
                        <HStack space={3}>
                            <MaterialCommunityIcons name="email-send-outline" size={24} color="black"/>
                            <Text fontSize={16} bold>Resend Complete Order SMS</Text>
                        </HStack>
                    </Actionsheet.Item>

                    <Actionsheet.Item onPress={() => {
                        onClose()
                        navigation.navigate("Receive Payment", order)
                    }}>
                        <HStack space={3}>
                            <FontAwesome5 name="rupee-sign" size={24} color="black"/>
                            <Text fontSize={16} bold>Receive Payment and Delivery</Text>
                        </HStack>
                    </Actionsheet.Item>

                </Actionsheet.Content>
            </Actionsheet>
            <ConfirmationDialog ref={confirmationDialogRef}/>
        </>
    );
}

export default CompletedOrderContextMenu;