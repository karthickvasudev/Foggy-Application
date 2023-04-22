import CustomTextInput from "../../constants/CustomTextInput";
import {AppColor} from "../../constants/AppColor";
import {Center, View, Text} from "native-base";
import {useEffect, useMemo, useRef, useState} from "react";
import {GetListOfOrders} from "../apihelper/AppApi";
import {useIsFocused} from "@react-navigation/native";
import OrderActionMenus from "./OrderActionMenus";
import {FlashList} from "@shopify/flash-list";
import OrderViewHolder from "../viewholders/OrderViewHolder";
import OrderSkeleton from "../Skeleton/OrderSkeleton";

export default function OrderList(props) {
    const params = props.route.params
    const resume = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);

    const [orderList, setOrderList] = useState([]);
    const orderContextMenuRef = useRef(null);

    useEffect(() => {
        async function asyncFunc() {
            setIsLoading(true)
            if (params?.from === 'report') {
                setOrderList(params.orders)
            } else {
                try {
                    let responseRaw = await GetListOfOrders();
                    if (responseRaw.status === 200) {
                        let response = await responseRaw.json();
                        setOrderList(response);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            setIsLoading(false)
        }

        if (resume) asyncFunc();
    }, [resume]);


    const SearchFunction = ({setSearch}) => {
        return (
            <View mb={3}>
                <CustomTextInput
                    placeholder={"search"}
                    icon={{name: "search1", size: 18, color: AppColor.primary}}
                    onChange={(e) => setSearch(e.nativeEvent.text)}
                />
            </View>
        );
    };

    const showContextMenu = (order) => {
        orderContextMenuRef.current.showContextMenu(order);
    };

    const navigateToViewOrderScreen = (order) => {
        props.navigation.navigate("View Order", order);
    };

    const NoOrders = () => {
        return (
            <Center flex={1} alignItems={"center"}>
                <Text>No Orders!</Text>
            </Center>
        );
    };

    const ShowOrderList = ({filteredList}) => {
        return (<>
            <View w={"100%"} h={"100%"}>
                <FlashList
                    renderItem={({item}) => {
                        return <OrderViewHolder order={item}
                                                onClick={() => navigateToViewOrderScreen(item)}
                                                onLongClick={() => showContextMenu(item)}
                        />;
                    }}
                    removeClippedSubviews={true}
                    ListEmptyComponent={NoOrders}
                    estimatedItemSize={100}
                    keyExtractor={item => item.id}
                    data={filteredList}

                />
            </View>
        </>);
    };

    const SearchAndList = () => {
        const [search, setSearch] = useState("");

        const filteredList = useMemo(() => {
            return orderList.filter(order => {
                    let _search = search.toLowerCase()
                    return order.id.toLowerCase().includes(_search) ||
                        order.customer.name.toLowerCase().includes(_search) ||
                        order.customer.phoneNumber.toLowerCase().includes(_search) ||
                        order.status.toLowerCase().replace("_", " ").includes(_search) ||
                        order.orderPaymentDetails.status.toLowerCase().replace("_", " ").includes(_search) ||
                        order.orderDate.toLowerCase().includes(_search)
                }
            )
        }, [orderList, search])

        return <>
            <SearchFunction setSearch={setSearch}/>
            {isLoading && <OrderSkeleton/>}
            {!isLoading && <ShowOrderList filteredList={filteredList}/>}
        </>
    }
    return (
        <>
            <View mx={5} mt={2}>
                <SearchAndList/>
                <OrderActionMenus ref={orderContextMenuRef}/>
            </View>
        </>
    );
}
