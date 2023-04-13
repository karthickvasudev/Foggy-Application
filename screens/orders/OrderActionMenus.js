import React, {useState} from 'react';
import {useDisclose,} from "native-base";
import InUnitContextMenu from "./InUnitContextMenu";
import CompletedOrderContextMenu from "./CompletedOrderContextMenu";
import DeliveredOrderContextMenu from "./DeliveredOrderContextMenu";


const OrderActionMenus = React.forwardRef((props, ref) => {
    const {isOpen, onOpen, onClose} = useDisclose();
    const [order, setOrder] = useState();

    const showContextMenu = (order) => {
        setOrder(order)
        onOpen()
    }

    React.useImperativeHandle(ref, () => ({
        showContextMenu
    }));

    return <>
        {
            (order?.status === 'IN_UNIT') &&
            <InUnitContextMenu order={order}
                               onClose={onClose}
                               isOpen={isOpen}
                               onOpen={onOpen}/>
        }
        {
            (order?.status === 'COMPLETED') &&
            <CompletedOrderContextMenu order={order}
                                       onClose={onClose}
                                       isOpen={isOpen}
                                       onOpen={onOpen}/>
        }
        {
            (order?.status === 'DELIVERED' &&
                order?.orderPaymentDetails.status === 'NOT_PAID' ||
                order?.orderPaymentDetails.status === 'PARTIALLY_PAID'
            ) &&
            <DeliveredOrderContextMenu order={order}
                                       onClose={onClose}
                                       isOpen={isOpen}
                                       onOpen={onOpen}/>
        }
    </>
})

export default OrderActionMenus;