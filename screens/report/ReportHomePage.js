import React from 'react';
import {Box, Card, Center, Heading, HStack, Text} from "native-base";
import {ProgressBar} from "react-native-paper";
import {AppColor} from "../../constants/AppColor";
import {chartConfig, rupee_symbol} from "../../constants/Constants";
import {PieChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";

function ReportHomePage(props) {
    const data = [
        {
            name: "Toronto",
            population: 2800000,
            color: "#FFD700",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];
    return (
        <>
            <Card backgroundColor={AppColor.accent} m={5}>
                <Heading fontSize={18}>Today</Heading>
                <Box>
                    <Center mt={3}>
                        <HStack alignItems={"center"}>
                            <Text bold>Revenue : </Text>
                            <Text fontSize={18}>{`${rupee_symbol} 100`}</Text>
                        </HStack>
                    </Center>
                    <ProgressBar style={{height: 20, borderRadius: 10}}
                                 progress={.5}
                                 animatedValue={.5}
                                 indeterminate={true}
                                 color="#49B5F2"/>
                    <Box alignSelf={"flex-end"} alignItems={"center"} mt={1}>
                        <Text bold>Yesterday</Text>
                        <Text>{`${rupee_symbol} 1000`}</Text>
                    </Box>
                </Box>

                <Box>
                    <PieChart data={data}
                              width={Dimensions.get("window").width-100}
                              height={120}
                              chartConfig={chartConfig}
                              accessor={"population"}
                              backgroundColor={"transparent"}
                              absolute
                              />
                </Box>
            </Card>
        </>
    );
}

export default ReportHomePage;