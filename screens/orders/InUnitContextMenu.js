import React, {useRef} from 'react';
import {Actionsheet, Heading, HStack, Text} from "native-base";
import {AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {ConfirmationDialog} from "./ConfirmationDialog";
import {CancelOrderApi, CompleteOrderApi} from "../apihelper/AppApi";

function InUnitContextMenu({order, isOpen, onOpen, onClose}) {
    const navigation = useNavigation()
    const confirmationDialogRef = useRef(null)

    const resendSmsConfirmationDialog = {
        title: "Resend SMS",
        content: "Are you sure want to resend create order SMS?",
        showSmsCheckBox: false,
        confirmationBtnName: 'Resend',
        confirmBtnAction: () => {
            confirmationDialogRef.current.closeConfirmationDialog()
        }
    }

    const completeOrderConfirmationDialog = {
        title: "Complete Order",
        content: "Are you sure want to complete?",
        showSmsCheckBox: true,
        defaultSmsCheck: false,
        confirmationBtnName: 'Complete',
        confirmBtnAction: async () => {
            confirmationDialogRef.current.closeConfirmationDialog()
            let response = await CompleteOrderApi(order.id)
            if (response.status === 200) {
                let json = await response.json();
                navigation.navigate("View Order", json)
            }
        }
    }

    const cancelOrderConfirmationDialog = {
        title: "Cancel Order",
        content: "Are you sure want to cancel?",
        showSmsCheckBox: true,
        defaultChecked: true,
        confirmationBtnName: 'Complete',
        confirmBtnAction: async () => {
            confirmationDialogRef.current.closeConfirmationDialog()
            let response = await CancelOrderApi(order.id);
            if (response.status === 200) {
                let json = await response.json();
                navigation.navigate("View Order", json)
            }
        }
    }

    return (<>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <Heading fontSize={18}>{order.id}</Heading>
                <Actionsheet.Item onPress={() => {
                    onClose()
                    confirmationDialogRef.current.showConfirmationDialog(resendSmsConfirmationDialog)
                }}>
                    <HStack space={3}>
                        <MaterialCommunityIcons name="email-send-outline" size={24} color="black"/>
                        <Text fontSize={16} bold>Resend Create Order SMS</Text>
                    </HStack>
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => {
                    onClose()
                    navigation.navigate("Update Order", order)
                }}>
                    <HStack space={3}>
                        <AntDesign name="edit" size={24} color="black"/>
                        <Text fontSize={16} bold>Update</Text>
                    </HStack>
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => {
                    onClose()
                    confirmationDialogRef.current.showConfirmationDialog(completeOrderConfirmationDialog)
                }}>
                    <HStack space={3}>
                        <Ionicons name="md-checkmark-circle" size={24} color="blue"/>
                        <Text fontSize={16} bold>Complete</Text>
                    </HStack>
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => {
                    onClose()
                    confirmationDialogRef.current.showConfirmationDialog(cancelOrderConfirmationDialog)
                }}>
                    <HStack space={3}>
                        <MaterialIcons name="cancel" size={24} color="red"/>
                        <Text fontSize={16} bold>Cancel</Text>
                    </HStack>
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
        <ConfirmationDialog ref={confirmationDialogRef}/>
    </>);
}

export default InUnitContextMenu;