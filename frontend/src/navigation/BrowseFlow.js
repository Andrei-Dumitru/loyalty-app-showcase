import React from "react";
import BrowseScreen from "../screens/BrowseScreen";
import BusinessDetailsScreen from "../screens/BusinessDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import OfferQrScreen from "../screens/OfferQrScreen";

const Stack = createStackNavigator();

const BrowseFlow = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Browse" component={BrowseScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={BusinessDetailsScreen} options={{title: ""}} />
        <Stack.Screen name="Offer" component={OfferQrScreen} />
      </Stack.Navigator>
    );
  }

  export default BrowseFlow;