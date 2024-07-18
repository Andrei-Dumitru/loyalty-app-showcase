import React, { useContext, useCallback } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      clearErrorMessage();
      return () => clearErrorMessage();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        headerText="Sign in to your account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        buttonText="Sign in"
      />
      <View style={styles.navLinkContainer}>
        <NavLink
          text="Don't have an account? Sign up instead"
          routeName="Signup"
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

export default SigninScreen;
