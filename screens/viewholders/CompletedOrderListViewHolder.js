import {Dimensions, TouchableOpacity} from "react-native";
import {Text, View} from "native-base";
import {raisedLook} from "../../constants/ReuseStyle";
import {AppColor} from "../../constants/AppColor";

export default function CompletedOrderListViewHolder({order, onClick, onContextClick}) {
    return <>
        <TouchableOpacity activeOpacity={0.6}
                          onPress={onClick}
                          onLongPress={onContextClick}>
            <View style={raisedLook}
                  backgroundColor={AppColor.accent}
                  width={Dimensions.get('window').width - 30}
                  alignSelf={"center"}
                  marginTop={2}
                  borderRadius={10}
                  p={3}
            >
                <Text
                    fontSize={17}
                    color={AppColor.primary}
                    bold
                >
                    {`#${order.id}`}
                </Text>

                <View flexDirection={"row"}
                      justifyContent={'space-between'}
                >
                    <View>
                        <Text paddingTop={.5}
                              fontWeight={'bold'}
                              color={AppColor.primary}>{order.customer.name}</Text>
                        <Text paddingTop={.5}
                              fontWeight={'bold'}
                              color={AppColor.primary}>{order.customer.phoneNumber}</Text>
                    </View>

                    <View flexDirection={"row"}>
                        <Text paddingTop={.5}
                              bold
                              color={AppColor.primary}>Count : </Text>
                        <Text paddingTop={.5}
                              color={AppColor.primary}>{order.count}</Text>
                    </View>

                    <View flexDirection={"row"}>
                        <Text paddingTop={.5}
                              bold
                              color={AppColor.primary}>Price : </Text>
                        <Text paddingTop={.5}
                              color={AppColor.primary}>{`₹ ${order.orderPaymentDetails.totalBillAmount}`}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    </>
}