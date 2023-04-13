import {ScrollView} from "native-base";
import DeliveredOrderListViewHolder from "../../viewholders/DeliveredOrderListViewHolder";

export default function DeliveredOrderListTodayTile() {
    return <>
        <ScrollView contentContainerStyle={{paddingBottom: 70}}>
            <DeliveredOrderListViewHolder/>
        </ScrollView>
    </>
}