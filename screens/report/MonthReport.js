import React from 'react';
import {Card, Center, HStack, ScrollView, Text} from "native-base";
import {LineChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import {AppColor} from "../../constants/AppColor";
import {monthNames, rupee_symbol} from "../../constants/Constants";

function MonthReport(props) {
    const {monthly, daysForChart, dataForChart} = props.route.params;
    const chartConfig = {
        backgroundGradientFrom: AppColor.accent,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: AppColor.accent,
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true // optional

    };

    const getChartDataFromMonthly = () => {
        return {
            labels: daysForChart,
            datasets: [
                {
                    data: dataForChart,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: [monthNames[new Date().getMonth()]] // optional
        }
    }

    const ChartDisplay = () => {
        return <Center>
            <LineChart
                data={getChartDataFromMonthly()}
                width={Dimensions.get("window").width - 10}
                height={256}
                verticalLabelRotation={30}
                withVerticalLines={false}
                withVerticalLabels={false}

                chartConfig={chartConfig}
                bezier
            />
        </Center>
    }

    const ShowReportList = () => {
        return monthly.monthList.map((month, index) => {
            return <Card key={index} m={3} backgroundColor={AppColor.accent}>
                <Text bold>{month.date}</Text>
                <Center>
                    <HStack mt={2} space={5}>
                        <HStack>
                            <Text bold>Orders : </Text>
                            <Text>{month.orders}</Text>
                        </HStack>
                        <HStack>
                            <Text bold>Complete Piece : </Text>
                            <Text>{month.completedPiece}</Text>
                        </HStack>
                    </HStack>
                    <HStack mt={2} space={5}>
                        <HStack>
                            <Text bold>Revenue : </Text>
                            <Text>{`${rupee_symbol} ${month.revenue}`}</Text>
                        </HStack>
                        <HStack>
                            <Text bold>OutStanding : </Text>
                            <Text>{`${rupee_symbol} ${month.outStanding}`}</Text>
                        </HStack>
                    </HStack>
                </Center>
            </Card>
        })
    }
    return (
        <>
            <ScrollView horizontal={false}>
                <ChartDisplay/>
                <ShowReportList/>
            </ScrollView>
        </>
    );
}

export default MonthReport;