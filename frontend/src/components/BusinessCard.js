import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BusinessCard = ({ info }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", { business: info })}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `${info.imageUri}`,
          }}
        />
        <Text style={styles.name}>{ info.name }</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
});

export default BusinessCard;
