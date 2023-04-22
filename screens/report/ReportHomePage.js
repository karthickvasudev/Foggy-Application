import React from 'react';
import TodayReport from "./TodayReport";
import {Card, Center, HStack, Text} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AppColor} from "../../constants/AppColor";
import {ToastAndroid, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GetMonthStatus, GetYearlyStatus} from "../apihelper/AppApi";


function ReportHomePage(props) {
    let navigation = useNavigation();
    const links = [
        {
            name: 'Month',
            icon: 'calendar-month',
            action: async () => {
                let rawResponse = await GetMonthStatus();
                if (rawResponse.status === 200) {
                    let response = await rawResponse.json();
                    let data = {
                        monthly: response,
                        daysForChart: response.monthList.map(m => m.date.split("-")[0]).reverse(),
                        dataForChart: response.monthList.map(m => m.revenue).reverse()
                    }
                    navigation.navigate("Month Report", data)
                }
            }
        },
        {
            name: 'Yearly',
            icon: 'calendar-blank-multiple',
            action: async () => {
                navigation.navigate("Yearly Report")
            }
        }
    ]
    const Links = () => {
        return <>
            <HStack justifyContent={"center"} space={2}>
                {
                    links.map((link, index) => {
                        return <Center alignSelf={"stretch"} key={index}>
                            <TouchableOpacity activeOpacity={0.6} onPress={link.action}>
                                <Card borderRadius={10} backgroundColor={AppColor.accent} w={100}>
                                    <Center>
                                        <MaterialCommunityIcons name={link.icon} size={30}
                                                                color={AppColor.primary}/>
                                        <Text>{link.name}</Text>
                                    </Center>
                                </Card>
                            </TouchableOpacity>
                        </Center>
                    })
                }
            </HStack>

        </>
    }

    return (
        <>
            <TodayReport/>
            <Links/>
        </>
    );
}

export default ReportHomePage;