import {ScrollView} from "native-base";
import DeliveredOrderListViewHolder from "../../viewholders/DeliveredOrderListViewHolder";
import {FlashList} from "@shopify/flash-list";
import EmptyCenterContent from "../../../constants/EmptyCenterContent";

export default function DeliveredOrderListTodayTile() {


    const renderItems = ({item}) => {
        return <DeliveredOrderListViewHolder order={item}
                                             onClick={() => {
                                             }}
                                             onContextClick={() => {
                                             }}/>
    }
    return <>
        <FlashList renderItem={({item}) => renderItems(item)}
                   data={[]}
                   estimatedItemSize={100}
                   ListEmptyComponent={<EmptyCenterContent content={"No Orders"}/>}
        />
    </>
}