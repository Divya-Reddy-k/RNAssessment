import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ErrorBoundary from './ErrroBoundary';
import {Provider} from 'react-redux';
import store from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: 'UsersList',
                  headerBackTitle: '',
                }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
