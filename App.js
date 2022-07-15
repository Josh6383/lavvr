import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Receipts from './screens/Receipts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkout from './screens/Checkout';
import Login from './screens/Login';
import { AuthContextProvider } from './authContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} 
              options={{headerShown: false}}
            />
            <Stack.Screen name='Home' component={Home} 
              options={{
                headerBackVisible: false,
                title: 'Place An Order',
                headerStyle: {
                  backgroundColor: '#89cff0',
                },
                headerTintColor: '#fff',
              }}
            />
          <Stack.Screen name='Receipts' component={Receipts} 
            options={{
              headerBackVisible: false,
              title: 'Wash Receipts',
              headerStyle: {
                backgroundColor: '#89cff0',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name='Profile' component={Profile} 
            options={{
              headerBackVisible: false,
              title: 'Profile Details',
              headerStyle: {
                backgroundColor: '#89cff0',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name='Checkout' component={Checkout} 
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

