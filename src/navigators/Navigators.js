import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Spinner from '../components/Spinner'
import { Fonts ,Images } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {
  Login,
  Signup,
  Discussion,
  ChatRooms,
  HomeScreen
} from '../screens';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

const Navigators = ()=>{
   
    const [status, setStatus] = useState('');

    const DrawerHome = () => (
      <Drawer.Navigator
      initialRouteName="DashBoardScreen"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ 
        headerShown: false,
        headerStyle: {
          backgroundColor:'#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        drawerActiveBackgroundColor: '#FBA304',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: Fonts.POPPINS_MEDIUM,
          fontSize: 15,
          marginTop:5
        },
      }}>

        <Drawer.Screen options={{
          title:'Device Status',
          drawerIcon: ({color}) => (
            <Ionicons name="phone-portrait-outline" size={22} color={color} />
          ),
        }} name="DeviceStatus" component={DeviceStatus}/>

      </Drawer.Navigator>
    );

    return(
        <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor:'#ffffff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor:'#2D2D2D',
            headerTitleStyle:{
              fontFamily: Fonts.POPPINS_MEDIUM,
            }
          }}
        >
        {
          status == 'loading' ?
          <Stack.Screen
            options={{headerShown:false}} 
            name="Spinner"
            component={Spinner}
          />
         :
        
          <>
            <Stack.Screen
              options={{headerShown:false}} 
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerShown:false}} 
              name="Signup"
              component={Signup}
            />
            <Stack.Screen
              options={{headerShown:false}} 
              name="Discussion"
              component={Discussion}
            />
            <Stack.Screen
              options={{headerShown:false}} 
              name="ChatRooms"
              component={ChatRooms}
            />
            <Stack.Screen
              options={{headerShown:false}} 
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              name="DrawerHome"
              component={DrawerHome}
              options={{ headerShown: false }}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
    )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_REGULAR,
    color:'#FBA304',
  }
});

export default Navigators
