import React, {useEffect, useState} from 'react';
import {LineChart} from "react-native-chart-kit";
import {GetYearlyStatus} from "../apihelper/AppApi";
import {Dimensions} from "react-native";
import {AppColor} from "../../constants/AppColor";
import {useIsFocused} from "@react-navigation/native";
import {Box, Card, Center, CheckIcon, Heading, HStack, ScrollView, Select, Text} from "native-base";
import {rupee_symbol} from "../../constants/Constants";

function YearlyReport(props) {
    const [yearly, setYearly] = useState();
    const [monthsForChart, setMonthsForChart] = useState();
    const [dataForChart, setDataForChart] = useState();
    const [dropdownYear, setDropdownYear] = useState(String(new Date().getFullYear()))
    const [monthReportList, setMonthReportList] = useState([])
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

    useEffect(() => {
        async function asyncFunc() {
            let rawResponse = await GetYearlyStatus();
            if (rawResponse.status === 200) {
                let response = await rawResponse.json();
                setYearly(response)
                setMonthsForChart(response.years.find(y => y.year === dropdownYear).months.map(m => m.month).reverse())
                setDataForChart(response.years.find(y => y.year === dropdownYear).months.map(m => m.revenue).reverse())
                setMonthReportList(response.years.find(y => y.year === dropdownYear).months)
            }
        }

        asyncFunc()
    }, []);

    useEffect(() => {
        if (yearly !== undefined) {
            setMonthsForChart(yearly.years.find(y => y.year === dropdownYear).months.map(m => m.month).reverse())
            setDataForChart(yearly.years.find(y => y.year === dropdownYear).months.map(m => m.revenue).reverse())
            setMonthReportList(yearly.years.find(y => y.year === dropdownYear).months)
        }
    }, [dropdownYear]);
    const getChartDataFromYearly = () => {
        return {
            labels: monthsForChart,
            datasets: [
                {
                    data: dataForChart,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: [dropdownYear] // optional
        }
    }
    const ChartDisplay = () => {
        return <Center>
            <LineChart
                data={getChartDataFromYearly()}
                width={Dimensions.get("window").width - 50}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
            />
        </Center>
    }

    const YearSelectDropdown = () => {
        return <Box mx={10} mt={5}>
            <Heading fontSize={15}>Select Year</Heading>
            <Box mt={3}>
                <Select selectedValue={dropdownYear} minWidth="200" accessibilityLabel="Choose Service"
                        placeholder="Choose Service" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setDropdownYear(itemValue)}>
                    {
                        yearly && yearly.years.map((year, index) => <Select.Item key={index} label={year.year}
                                                                                 value={year.year}/>)
                    }
                </Select>
            </Box>
        </Box>
    }

    const DisplayMonthListReport = () => {
        return monthReportList.map((month, index) => {
            return <Card key={index} m={3} backgroundColor={AppColor.accent}>
                <Text bold>{month.month}</Text>
                <Center>
                    <HStack>
                        <Text bold>Orders : </Text>
                        <Text>{month.orders}</Text>
                    </HStack>
                    <HStack mt={2} space={2}>
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

    const ReportMonthly = () => {

        return <>
            <YearSelectDropdown/>
            <DisplayMonthListReport/>
        </>
    }

    const OverAllYearReport =()=>{
        const yearData = yearly.years.find(y=>y.year===dropdownYear)
        return <Card m={3} backgroundColor={AppColor.accent}>
            <Text bold>{`Over All Report of ${yearData.year} `}</Text>
            <Center mt={2}>
                <HStack>
                    <Text bold>Orders : </Text>
                    <Text>{yearData.orders}</Text>
                </HStack>
                <HStack mt={2} space={2}>
                    <HStack>
                        <Text bold>Revenue : </Text>
                        <Text>{`${rupee_symbol} ${yearData.revenue}`}</Text>
                    </HStack>
                    <HStack>
                        <Text bold>OutStanding : </Text>
                        <Text>{`${rupee_symbol} ${yearData.outStanding}`}</Text>
                    </HStack>
                </HStack>
            </Center>
        </Card>
    }
    return (
        <ScrollView horizontal={false}>
            {dataForChart && <ChartDisplay/>}
            {yearly && <OverAllYearReport/>}
            <ReportMonthly/>
        </ScrollView>
    );
}

export default YearlyReport;