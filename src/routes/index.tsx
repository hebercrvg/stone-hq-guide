import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../pages/Home';
import Character from '../pages/Character';
import Wiki from '../pages/Wiki';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.green} translucent />
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerTitleAlign: 'center',
        title: 'Marvel Characters',
        headerStyle: {
          backgroundColor: colors.green
        }
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Character" component={Character}/>
        <Stack.Screen name="Wiki" component={Wiki}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;