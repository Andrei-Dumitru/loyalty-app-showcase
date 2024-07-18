import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PointsCard = ({ info, businessName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.businessName}>{businessName}</Text>
        <Text style={styles.points}>Points: {info.points}</Text>
        <Text style={styles.multiplier}>Multiplier: {info.multiplier}x</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 1,
    width: "100%",
  },
  cardContent: {
    padding: 15,
  },
  businessName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  points: {
    fontSize: 16,
    marginBottom: 5,
  },
  multiplier: {
    fontSize: 16,
  },
});

export default PointsCard;
