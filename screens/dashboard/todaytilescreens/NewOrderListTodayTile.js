import {ScrollView, View} from "native-base";
import NewOrderListViewHolder from "../../viewholders/NewOrderListViewHolder";
import {useEffect, useRef, useState} from "react";
import {FlashList} from "@shopify/flash-list";
import EmptyCenterContent from "../../../constants/EmptyCenterContent";
import {GetTodayNewOrder} from "../../apihelper/AppApi";
import {useIsFocused, useNavigationState} from "@react-navigation/native";
import OrderActionMenus from "../../orders/OrderActionMenus";

export default function NewOrderListTodayTile(props) {
    let resume = useNavigationState(state => state.index === 1);
    const [orderList, setOrderList] = useState([]);
    const orderContextMenuRef = useRef(null);

    useEffect(() => {
        async function asyncFunc() {
            let rawResponse = await GetTodayNewOrder();
            if (rawResponse.status === 200) {
                let response = await rawResponse.json();
                setOrderList(response)
            }
        }

        if (resume) asyncFunc()
    }, [resume]);

    function navigateToViewOrderPage(order) {
        props.navigation.navigate("View Order", order)
    }

    function showContextMenu(order) {
        orderContextMenuRef.current.showContextMenu(order)
    }

    function renderContent(order) {
        return <>
            <NewOrderListViewHolder order={order}
                                    onClick={() => navigateToViewOrderPage(order)}
                                    onContextClick={() => showContextMenu(order)}
            />
            <OrderActionMenus ref={orderContextMenuRef}/>
        </>
    }

    return <>
        <View w={"100%"} h={"100%"} flex={1}>
            <FlashList renderItem={({item}) => renderContent(item)}
                       data={orderList}
                       estimatedItemSize={100}
                       ListEmptyComponent={<EmptyCenterContent content={"No Orders !"}/>}
                       contentContainerStyle={{paddingBottom: 100}}
            />
        </View>
    </>
}