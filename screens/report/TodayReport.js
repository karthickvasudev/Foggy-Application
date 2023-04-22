import React, {useEffect, useState} from 'react';
import {AppColor} from "../../constants/AppColor";
import {Box, Button, Card, Center, Heading, HStack, Link, Text} from "native-base";
import {rupee_symbol} from "../../constants/Constants";
import {ProgressBar} from "react-native-paper";
import {GetTodayStatus} from "../apihelper/AppApi";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";

function TodayReport(props) {
    let resume = useIsFocused();
    const navigation = useNavigation()
    const [dailyReport, setDailyReport] = useState();

    useEffect(() => {
        async function asyncFunc() {

            let rawResponse = await GetTodayStatus();
            if (rawResponse.status === 200) {
                let response = await rawResponse.json();
                setDailyReport(response)
            }
        }

        if (resume) asyncFunc()
    }, []);

    const RevenueTile = () => {
        return <>
            <Heading fontSize={18}>Today</Heading>
            <Box>
                <Center mt={3}>
                    <HStack alignItems={"center"}>
                        <Text bold>Revenue : </Text>
                        <Text fontSize={18}>{`${rupee_symbol} ${dailyReport?.revenue.todayRevenue}`}</Text>
                    </HStack>
                </Center>
                <ProgressBar style={{height: 20, borderRadius: 10}}
                             progress={(dailyReport?.revenue?.barPercentage ? (dailyReport?.revenue?.barPercentage / 10) : 0)}
                             color={AppColor.primary}/>
                <Box alignSelf={"flex-end"} alignItems={"center"} mt={1}>
                    <Text bold>Yesterday</Text>
                    <Text>{`${rupee_symbol} ${dailyReport?.revenue.yesterdayRevenue}`}</Text>
                </Box>
            </Box>
        </>
    }

    const TotalOrderCount = () => {
        return <Box>
            <HStack space={3} alignItems={"center"}>
                <Heading fontSize={15}>Total Orders :</Heading>
                <Text fontSize={18}>{dailyReport?.orderCount}</Text>
            </HStack>
            <Box mt={2}>
                <Heading fontSize={15}>Piece Count</Heading>
                <Center mt={3}>
                    <HStack alignItems={"center"}>
                        <Text bold>Complete : </Text>
                        <Text fontSize={17}>{dailyReport?.pieceCount?.completedPieceCount}</Text>
                    </HStack>
                </Center>
                <ProgressBar style={{height: 20, borderRadius: 10,}}
                             progress={(dailyReport?.pieceCount?.barPercentage ? (dailyReport?.pieceCount?.barPercentage / 10) : 0)}
                             color={AppColor.primary}/>
                <Box alignSelf={"flex-end"} alignItems={"center"} mt={1}>
                    <Text bold>Total</Text>
                    <Text>{dailyReport?.pieceCount?.totalPieceCount}</Text>
                </Box>
            </Box>
        </Box>
    }

    const MediatorCharge = () => {
        return <Box mt={3}>
            <HStack space={3} alignItems={"center"}>
                <Heading fontSize={15}>Mediator Pick & Delivery Charge :</Heading>
                <Text fontSize={18}>{`${rupee_symbol} ${dailyReport?.mediatorPickUpDeliveryCharge}`}</Text>
            </HStack>
        </Box>
    }

    const viewOrderAction = () => {
        navigation.navigate("Order List", {from: "report", orders: dailyReport?.orders});
    }
    const ViewOrder = () => {
        return <>
            <Box alignItems={"flex-end"} mt={5}>
                <Button background={AppColor.primary} onPress={viewOrderAction}>View Order</Button>
            </Box>
        </>
    }
    return (
        <Card backgroundColor={AppColor.accent} m={5}>
            <RevenueTile/>
            <TotalOrderCount/>
            <MediatorCharge/>
            <ViewOrder/>
        </Card>
    );
}

export default TodayReport;