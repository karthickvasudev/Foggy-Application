import {ScrollView} from "native-base";
import CompletedOrderListViewHolder from "../../viewholders/CompletedOrderListViewHolder";
import {FlashList} from "@shopify/flash-list";
import {useEffect, useRef, useState} from "react";
import {GetTodayCompletedOrder} from "../../apihelper/AppApi";
import OrderActionMenus from "../../orders/OrderActionMenus";
import EmptyCenterContent from "../../../constants/EmptyCenterContent";
import {useNavigationState} from "@react-navigation/native";

export default function CompletedOrderListTodayTile(props) {
    let resume = useNavigationState(state => state.index === 2);
    const [order, setOrder] = useState([]);

    const contextMenu = useRef(null)

    useEffect(() => {
        async function asyncFunc() {
            let rawResponse = await GetTodayCompletedOrder()
            if (rawResponse.status === 200) {
                const json = await rawResponse.json();
                setOrder(json)
            }
        }

        if (resume) asyncFunc()
    }, [resume]);

    function clickAction(order) {
        props.navigation.navigate("View Order", order)
    }

    function onContextMenu(order) {
        contextMenu.current.showContextMenu(order)
    }

    function renderContent(order) {
        return <>
            <CompletedOrderListViewHolder order={order}
                                          onClick={() => clickAction(order)}
                                          onContextClick={() => onContextMenu(order)}/>
            <OrderActionMenus ref={contextMenu}/>
        </>
    }

    return (<>
        <FlashList renderItem={({item}) => renderContent(item)}
                   estimatedItemSize={100}
                   data={order}
                   ListEmptyComponent={<EmptyCenterContent content={"No Orders !"}/>}
                   contentContainerStyle={{paddingBottom: 70}}
        />
    </>)
}