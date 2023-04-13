import {Dimensions, TouchableOpacity} from "react-native";
import {Text, View} from "native-base";
import {raisedLook} from "../../constants/ReuseStyle";
import {AppColor} from "../../constants/AppColor";

export default function NewOrderListViewHolder() {
    return <>
        <TouchableOpacity activeOpacity={0.6}>
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
                    #ORD-00001
                </Text>

                <View flexDirection={"row"}
                      justifyContent={'space-between'}
                >
                    <View>
                        <Text paddingTop={.5}
                              fontWeight={'bold'}
                              color={AppColor.primary}>Karthick</Text>
                        <Text paddingTop={.5}
                              fontWeight={'bold'}
                              color={AppColor.primary}>8072175428</Text>
                    </View>

                    <View flexDirection={"row"}>
                        <Text paddingTop={.5}
                              bold
                              color={AppColor.primary}>Count : </Text>
                        <Text paddingTop={.5}
                              color={AppColor.primary}>5</Text>
                    </View>

                    <View>
                        <Text paddingTop={.5}
                              bold
                              color={AppColor.primary}>Delivery Date :</Text>
                        <Text paddingTop={.5}
                              color={AppColor.primary}>18-Mar-2023</Text>
                        <Text paddingTop={.5}
                              color={AppColor.primary}>11:30:00AM</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    </>
}