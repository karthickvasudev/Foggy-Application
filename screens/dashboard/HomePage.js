import { AppColor } from "../../constants/AppColor";
import { Text, View } from "native-base";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Dashboard from "./Dashboard";
import { TouchableOpacity } from "react-native";
import EmployeeList from "../employee/EmployeeList";
import ProductList from "../product/ProductList";
import EmptyScreen from "../utils/EmptyScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomerList from "../customer/CustomerList";
import OrderList from "../orders/OrderList";
import CreditsList from "../credits/CreditsList";
import ReportHomePage from "../report/ReportHomePage";

const Drawer = createDrawerNavigator();
export default function HomePage(props) {
    const ProfileDetails = () => {
        return <>
            <View h={250} bg={AppColor.primary}>
                <Text>Profile</Text>
            </View>
        </>
    }

    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <ProfileDetails />
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Close drawer"
                    onPress={() => props.navigation.closeDrawer()}
                />
            </DrawerContentScrollView>
        );
    }

    function navigateToScreen(name) {
        props.navigation.navigate(name)
    }

    return <>
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Drawer.Screen name="Employee"
                component={EmployeeList}
                options={{
                    headerRight: () =>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => navigateToScreen('Create Employee')}
                        >
                            <Text>Create</Text>
                        </TouchableOpacity>
                }}
            />

            <Drawer.Screen name="Products"
                component={ProductList}
                options={{
                    headerRight: () =>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => navigateToScreen('Create Product')}
                        >
                            <Text>Create</Text>
                        </TouchableOpacity>
                }}
            />

            <Drawer.Screen name="Customers"
                component={CustomerList}
                options={{
                    headerRight: () =>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => navigateToScreen('Create Customer')}
                        >
                            <Text>Create</Text>
                        </TouchableOpacity>
                }}
            />

            <Drawer.Screen name="Orders"
                component={OrderList}
                options={{
                    headerRight: () =>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => navigateToScreen('Create Order')}
                        >
                            <Text>Create</Text>
                        </TouchableOpacity>
                }}
            />

            <Drawer.Screen name="Credits"
                component={CreditsList} />

            <Drawer.Screen name="Report"
                component={ReportHomePage} />

            <Drawer.Screen name="Logout"
                component={EmptyScreen}
                listeners={{
                    drawerItemPress: (e) => {
                        e.preventDefault()
                        AsyncStorage.removeItem('token').then(
                            props.navigation.navigate('Login')
                        );
                    }
                }}
            />
        </Drawer.Navigator>
    </>
}