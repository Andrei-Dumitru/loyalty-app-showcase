import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { Text } from "@rneui/themed";
import SearchBar from "../components/SearchBar";
import BusinessCard from "../components/BusinessCard";
import { Context as BusinessContext } from "../context/BusinessContext";

const BrowseScreen = ({ navigation }) => {
  const { state, fetchBusinesses } = useContext(BusinessContext);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <ScrollView style={{ marginBottom: 65 }} keyboardDismissMode="on-drag">
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => {}} />
      <Text h4 style={styles.heading}>
        Restaurants
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={state.businesses}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <BusinessCard info={item} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingLeft: 15,
    paddingBottom: 5,
  },
});

export default BrowseScreen;
