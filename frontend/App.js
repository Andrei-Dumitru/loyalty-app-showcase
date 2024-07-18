import "react-native-gesture-handler";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import LoginFlow from "./src/navigation/LoginFlow";
import MainTabs from "./src/navigation/MainTabs";

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as BusinessProvider } from "./src/context/BusinessContext";
import { Provider as UserDataProvider } from "./src/context/UserDataContext";

import Toast from "react-native-toast-message";

const Nav = () => {
  const { state, checkAuth } = useContext(AuthContext);

  checkAuth();

  if (state.isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {state.token !== null ? <MainTabs /> : <LoginFlow />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <UserDataProvider>
      <BusinessProvider>
        <AuthProvider>
          <StatusBar />
          <Nav />
          <Toast />
        </AuthProvider>
      </BusinessProvider>
    </UserDataProvider>
  );
};

export default App;
