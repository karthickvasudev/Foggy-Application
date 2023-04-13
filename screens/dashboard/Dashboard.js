import {MaterialIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AppColor} from "../../constants/AppColor";
import {View} from "native-base";
import {HomeTab} from "./bottomnavigationtabs/HomeTab";
import CustomersTab from "./bottomnavigationtabs/CustomerTab";
import CreateOrder from "../orders/CreateOrder";
import OrderList from "../orders/OrderList";
import EmptyScreen from "../utils/EmptyScreen";

const Tab = createBottomTabNavigator();
export default function Dashboard(props) {
    const defaultTabBarLabelStyle = {
        fontSize: 12,
        fontWeight: "bold"
    }
    const defaultTabBarIcon = (props, icon) => {
        const {focused} = props
        return <MaterialIcons name={icon} size={28} color={focused ? AppColor.primary : AppColor.grey}/>
    }
    const defaultTabOptions = (icon) => {
        return {
            headerShown: false,
            tabBarLabelStyle: defaultTabBarLabelStyle,
            tabBarIcon: (props) => defaultTabBarIcon(props, icon),
            tabBarActiveTintColor: AppColor.primary
        }
    }
    const createOrderTabOption = (icon) => {
        return {
            headerShown: true,
            tabBarLabelStyle: defaultTabBarLabelStyle,
            tabBarIcon: () => {
                return <View
                    w={60}
                    h={60}
                    top={-20}
                    borderWidth={2}
                    borderColor={AppColor.primary}
                    borderRadius={30}
                    justifyContent={"center"}
                    alignItems={"center"}
                    backgroundColor={AppColor.primary}
                >
                    <MaterialIcons name={icon} size={28} color={AppColor.accent}/>
                </View>
            },
            tabBarActiveTintColor: AppColor.primary,
        }
    }

    return <>
        <Tab.Navigator
            screenOptions={{tabBarStyle: {height: 50}, tabBarShowLabel: false}}
        >
            <Tab.Screen name={"Home"} component={HomeTab} options={defaultTabOptions('dashboard')}/>
            <Tab.Screen name={"Customers"} component={CustomersTab}
                        options={defaultTabOptions('supervised-user-circle')}/>
            <Tab.Screen name={"Create Order"} component={CreateOrder}
                        options={createOrderTabOption('add-shopping-cart')}
                        listeners={
                            ({navigation}) => ({
                                tabPress: (e) => {
                                    e.preventDefault()
                                    props.navigation.navigate('Create Order')
                                }
                            })
                        }
            />
            <Tab.Screen name={"Orders"} component={OrderList} options={defaultTabOptions('shopping-cart')}/>
            <Tab.Screen name={"More"}
                        component={EmptyScreen}
                        options={defaultTabOptions('menu')}
                        listeners={
                            ({navigation}) => ({
                                tabPress: (e) => {
                                    e.preventDefault()
                                    props.navigation.toggleDrawer()
                                }
                            })
                        }
            />
        </Tab.Navigator>
    </>
}