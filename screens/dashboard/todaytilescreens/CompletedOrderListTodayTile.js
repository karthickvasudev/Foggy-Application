import {ScrollView} from "native-base";
import CompletedOrderListViewHolder from "../../viewholders/CompletedOrderListViewHolder";

export default function CompletedOrderListTodayTile() {
    return <>
        <ScrollView contentContainerStyle={{paddingBottom: 70}}>
            <CompletedOrderListViewHolder/>
        </ScrollView>
    </>
}