import React, { useContext, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { useFocusEffect } from "@react-navigation/native";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
      return () => clearErrorMessage();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        headerText="Create an account"
        buttonText="Sign up"
        onSubmit={signup}
        errorMessage={state.errorMessage}
      />
      <View style={styles.navLinkContainer}>
        <NavLink
          routeName="Signin"
          text="Already have an account? Sign in instead"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 12,
  },
  navLinkContainer: {
    alignItems: "center",
  },
});

export default SignupScreen;
