import React from 'react';
import {HStack, Text, View, VStack} from "native-base";
import {raisedLook} from "../../constants/ReuseStyle";
import {AppColor} from "../../constants/AppColor";
import {rupee_symbol} from "../../constants/Constants";
import {TouchableOpacity} from "react-native";

function CreditListViewHolder({credit}) {
    return (
        <TouchableOpacity activeOpacity={0.6}>
            <View style={raisedLook} backgroundColor={AppColor.accent}
                  p={3} m={4} borderRadius={10}>
                <VStack space={2}>
                    <View>
                        <Text fontSize={18} bold>{credit.id}</Text>
                    </View>
                    <HStack mx={2} justifyContent={"space-between"}>
                        <View>
                            <Text bold>{credit.customer.name}</Text>
                            <Text>{credit.customer.phoneNumber}</Text>
                        </View>
                        <View alignItems={"center"}>
                            <Text bold>Credit Amount</Text>
                            <Text>{`${rupee_symbol} ${credit.creditAmount}`}</Text>
                        </View>
                        <View alignItems={"center"}>
                            <Text bold>Used Amount</Text>
                            <Text>{`${rupee_symbol} ${credit.usedCredit}`}</Text>
                        </View>
                    </HStack>
                    <HStack space={2} mt={1}>
                        <Text bold>Credited On :</Text>
                        <Text>{credit.createdOn}</Text>
                    < /HStack>
                </VStack>
            </View>
        </TouchableOpacity>
    );
}

export default CreditListViewHolder;