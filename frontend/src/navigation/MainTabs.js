import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseFlow from "../navigation/BrowseFlow";
import AccountScreen from "../screens/AccountScreen";
import AnotherScreen from "../screens/CameraScreen";
import QrScreen from "../screens/QrScreen";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import CameraScreen from "../screens/CameraScreen";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarActiveTintColor: "blue",
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

const MainTabs = () => {
  const { state } = useContext(AuthContext);

  if (state.isBusiness) {
    return <CameraScreen />;
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="BrowseFlow"
        component={BrowseFlow}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Qr"
        component={QrScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Points",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="qrcode" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Another"
        component={AnotherScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Offers",
          tabBarIcon: ({ color, size }) => (
            <Feather name="percent" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
