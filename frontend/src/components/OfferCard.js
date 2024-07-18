import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

const OfferCard = ({ info }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{paddingTop: 10}} onPress={() => navigation.navigate("Offer", { offer: info })}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `${info.imageUri}`,
          }}
        />
        <Text style={styles.name}>{info.title}</Text>
        <Text>{info.price} points</Text>
        <View style={{justifyContent: 'center'}}>
          <Feather name="chevron-right" size={36} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 1,
    justifyContent: "start",
    alignItems: "top",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    paddingLeft: 10
  },
});

export default OfferCard;
