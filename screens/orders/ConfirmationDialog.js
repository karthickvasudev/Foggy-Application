import React, {useRef, useState} from 'react';
import {AlertDialog, Button, Checkbox, Text} from "native-base";

export const ConfirmationDialog = React.forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState({})
    const showConfirmationDialog = (dialogAction) => {
        setIsOpen(true)
        setDialogAction(dialogAction)
    }

    const closeConfirmationDialog = () => onClose()

    const getSmsCheckBoxStatus = () => {
        return dialogAction.defaultChecked
    }


    React.useImperativeHandle(ref, () => ({
        showConfirmationDialog, closeConfirmationDialog, getSmsCheckBoxStatus
    }))

    const onClose = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <AlertDialog leastDestructiveRef={null} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton/>
                    <AlertDialog.Header>{dialogAction?.title}</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Text fontSize={14}>{dialogAction?.content}</Text>
                        {dialogAction?.showSmsCheckBox &&
                            <Checkbox value={"SMS"}
                                      mt={3}
                                      isChecked={dialogAction.defaultChecked}
                                      onChange={(flag) => setDialogAction({...dialogAction, defaultChecked: flag})}>
                                <Text>Send SMS</Text>
                            </Checkbox>
                        }
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="primary" onPress={dialogAction?.confirmBtnAction}>
                                {dialogAction?.confirmationBtnName}
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    );
})