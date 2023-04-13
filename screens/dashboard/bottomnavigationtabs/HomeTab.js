import {useIsFocused} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {GetProfileApi} from "../../apihelper/AppApi";
import {HStack, ScrollView, View, Text} from "native-base";
import {raisedLook} from "../../../constants/ReuseStyle";
import {AppColor} from "../../../constants/AppColor";
import {Dimensions, ImageBackground, Platform, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import NewOrderListTodayTile from "../todaytilescreens/NewOrderListTodayTile";
import CompletedOrderListTodayTile from "../todaytilescreens/CompletedOrderListTodayTile";
import DeliveredOrderListTodayTile from "../todaytilescreens/DeliveredOrderListTodayTile";

const TopTabNavigator = createMaterialTopTabNavigator();
export const HomeTab = (props) => {
    const isResume = useIsFocused()
    const [profile, setProfile] = useState()
    useEffect(() => {
        const asyncFunction = async () => {
            try {
                let rawResponse = await GetProfileApi();
                if (rawResponse.status === 200) {
                    let response = await rawResponse.json()
                    setProfile(response)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (isResume)
            asyncFunction()
    }, [isResume])

    const SmallTiles = ({name, value}) => {
        return <View
            backgroundColor={AppColor.primary}
            borderRadius={10}
            justifyContent={"center"}
            alignItems={"center"}
            px={9}
            py={2}>
            <Text color={"white"}>
                {name}
            </Text>
            <Text
                color={"white"}
                fontWeight={"bold"}
                fontSize={20}>
                {value}
            </Text>
        </View>
    }

    const StatusTiles = () => {
        return <>
            <View style={[raisedLook]}
                  backgroundColor={AppColor.accent}
                  w={Dimensions.get('window').width - 50}
                  alignSelf={"center"}
                  alignItems={"center"}
                  mt={2}
                  borderRadius={10}
                  mb={1}
                  p={3}
            >
                <HStack space={12}>
                    <SmallTiles name={"Orders"} value={1}/>
                    <SmallTiles name={"Revenue"} value={`$ 1`}/>
                </HStack>
            </View>
        </>
    }

    const UserNameWithHiAndBranchSelection = () => {
        return <>
            <View>
                <Text bold
                      fontSize={18}
                      color={AppColor.accent}
                      mt={3}
                      ml={5}>{`Welcome ${profile?.name} !`}</Text>
            </View>
        </>
    }

    return <ImageBackground source={require('../../../assets/foggy_bg.png')}
                            style={[style.background, {paddingBottom: 10}]}>
        <UserNameWithHiAndBranchSelection/>
        <StatusTiles/>
        <TodayOrders/>
    </ImageBackground>
}

const CustomTobTab = (props) => {
    return <View py={2} alignItems={"center"}>
        <ScrollView horizontal={true}>
            {props.state.routes.map((route, index) => {
                    const status = (props.state.index === index)
                    return <TouchableOpacity key={index}
                                             activeOpacity={.6}
                                             onPress={() => props.navigation.navigate(route.name)}>
                        <View
                            style={[status ? {backgroundColor: AppColor.primary} : {}]}
                            h={8}
                            borderColor={AppColor.primary}
                            borderWidth={1}
                            borderRadius={20}
                            px={4}
                            alignItems={"center"}
                            justifyContent={"center"}
                            ml={2}

                        >
                            <Text
                                style={{
                                    color: status ? "white" : AppColor.primary,
                                    fontWeight: 'bold'
                                }}>
                                {route.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            )}
        </ScrollView>
    </View>
}

const TodayOrders = () => {
    return <>
        <TopTabNavigator.Navigator
            initialRouteName={"New"}
            tabBar={(props) => <CustomTobTab {...props} />}
        >
            <TopTabNavigator.Screen name={"Online"} component={NewOrderListTodayTile}/>
            <TopTabNavigator.Screen name={"New"} component={NewOrderListTodayTile}/>
            <TopTabNavigator.Screen name={"Completed"} component={CompletedOrderListTodayTile}/>
            <TopTabNavigator.Screen name={"Delivered"} component={DeliveredOrderListTodayTile}/>
        </TopTabNavigator.Navigator>
    </>
}

const style = StyleSheet.create({
    background: {
        backgroundColor: AppColor.accent,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})