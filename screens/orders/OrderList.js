import CustomTextInput from "../../constants/CustomTextInput";
import {AppColor} from "../../constants/AppColor";
import {FlatList, View} from "native-base";
import {useCallback, useEffect, useRef, useState} from "react";
import {GetListOfOrders} from "../apihelper/AppApi";
import {useIsFocused} from "@react-navigation/native";
import OrderActionMenus from "./OrderActionMenus";
import OrderViewHolder from "../viewholders/OrderViewHolder";


export default function OrderList(props) {
    const resume = useIsFocused()
    const [search, setSearch] = useState('');
    const [orderList, setOrderList] = useState([])
    const orderContextMenuRef = useRef(null)

    useEffect(() => {
        async function asyncFunc() {
            try {
                let responseRaw = await GetListOfOrders();
                if (responseRaw.status === 200) {
                    let response = await responseRaw.json();
                    setOrderList(response)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (resume)
            asyncFunc()
    }, []);

    const SearchFunction = () => {
        return (
            <View mb={3}>
                <CustomTextInput placeholder={"search"}
                                 icon={{name: 'search1', size: 18, color: AppColor.primary}}
                                 onChange={(e) => setSearch(e.nativeEvent.text)}
                />
            </View>)
    }

    const showContextMenu = (order) => {
        orderContextMenuRef.current.showContextMenu(order)
    }

    const navigateToViewOrderScreen = (order) => {
        props.navigation.navigate("View Order", order)
    }

    const renderItems = useCallback((data) => {
        return <OrderViewHolder
            order={data.item}
            onLongClick={() => {
                showContextMenu(data.item)
            }}
            onClick={() => navigateToViewOrderScreen(data.item)}/>
    }, []);

    const ShowOrderList = () => {
        return orderList.length > 0 && <FlatList data={orderList}
                                                 removeClippedSubviews={false}
                                                 maxToRenderPerBatch={10}
                                                 initialNumToRender={10}
                                                 updateCellsBatchingPeriod={10}
                                                 keyExtractor={item => item.id}
                                                 renderItem={renderItems}/>

    }

    return <>
        <View mx={5} mt={2}>
            <SearchFunction/>
            <ShowOrderList/>
            <OrderActionMenus ref={orderContextMenuRef}/>
        </View>
    </>
}