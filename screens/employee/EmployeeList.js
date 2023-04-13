import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { GetListOfEmployees, LogoutHandler } from "../apihelper/AppApi";
import { AppColor } from "../../constants/AppColor";
import { raisedLook } from "../../constants/ReuseStyle";
import { Center, HStack, Text, View } from "native-base";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";


function EmployeeList(props) {
    const isResume = useIsFocused()
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        async function asyncFunc() {
            let responseRaw = await GetListOfEmployees();
            if (responseRaw.status === 200) {
                let response = await responseRaw.json()
                setEmployees(response)
            } else {
                LogoutHandler(responseRaw)
            }
        }

        if (isResume)
            asyncFunc()
    }, [])

    return (
        <>
            {employees.map((employee, index) => {
                return <TouchableOpacity key={index}
                    activeOpacity={.6}
                    onPress={() => props.navigation.navigate("View Employee", employee)}>
                    <View backgroundColor={AppColor.accent} style={raisedLook} mx={5} mt={3}
                        borderRadius={10}>
                        <HStack m={3}>
                            <View>
                                <FontAwesome name="file-photo-o" size={80} color="black" />
                            </View>
                            <View ml={5} my={3}>
                                <Text fontSize={15} bold>{employee.name}</Text>
                                <Text fontSize={15} flex={1} mt={4}>
                                    <View flexDirection={"row"} alignItems={"center"}>
                                        <View>
                                            <Entypo name="phone" size={15} color={AppColor.primary} />
                                        </View>
                                        <View>
                                            <Text pl={1}>{employee.phoneNumber}</Text>
                                        </View>
                                        <View alignSelf={"flex-end"}>
                                            <Text pl={1}>{" -  " + employee.applicationRole}</Text>
                                        </View>
                                    </View>
                                </Text>
                            </View>
                        </HStack>
                    </View>
                </TouchableOpacity>
            })}

            {
                employees.length === 0 &&
                <Center flex={1}>
                    <Text>No Employees!</Text>
                </Center>

            }
        </>
    );
}

export default EmployeeList;