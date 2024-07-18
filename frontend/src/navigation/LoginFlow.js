import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

const LoginFlow = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

export default LoginFlow;