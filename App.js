import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Login from './screens/login/Login';

const Stack = createBottomTabNavigator()

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </>
  );
}

