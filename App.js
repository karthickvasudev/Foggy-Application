import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import GetStarted from "./screens/getstarted/GetStarted";
import Login from "./screens/login/Login";
import UpdateProfile from "./screens/userprerequisitescreen/UpdateProfile";
import HomePage from "./screens/dashboard/HomePage";
import { createStackNavigator } from "@react-navigation/stack";
import CreateEmployee from "./screens/employee/CreateEmployee";
import CreateProduct from "./screens/product/CreateProduct";
import ViewProduct from "./screens/product/ViewProduct";
import CreateCustomer from "./screens/customer/CreateCustomer";
import ViewCustomer from "./screens/customer/ViewCustomer";
import UpdateCustomer from "./screens/customer/UpdateCustomer";
import CreateOrder from "./screens/orders/CreateOrder";
import ViewOrder from "./screens/orders/ViewOrder";
import UpdateOrder from "./screens/orders/UpdateOrder";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <NativeBaseProvider>
        <StatusBar style="inverted" />
        <NavigationContainer>
          <Stack.Navigator>
            {/* start up screen */}
            <Stack.Screen
              name="Get Started"
              component={GetStarted}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Update Profile" component={UpdateProfile} />

            {/* home page */}
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false }}
            />


            {/* Employee */}
            <Stack.Screen
              name="Create Employee"
              component={CreateEmployee}
            />

            {/* Products */}
            <Stack.Screen
              name="Create Product"
              component={CreateProduct}
            />
            <Stack.Screen
              name="View Product"
              component={ViewProduct}
            />

            {/* Customer */}
            <Stack.Screen
              name="Create Customer"
              component={CreateCustomer}
            />
            <Stack.Screen
              name="View Customer"
              component={ViewCustomer}
            />
            <Stack.Screen
              name="Update Customer"
              component={UpdateCustomer}
            />

            {/* Orders */}
            <Stack.Screen
              name="Create Order"
              component={CreateOrder}
            />
            <Stack.Screen
              name="View Order"
              component={ViewOrder}
            />
            <Stack.Screen
              name="Update Order"
              component={UpdateOrder}
            />  

            
            
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
}
