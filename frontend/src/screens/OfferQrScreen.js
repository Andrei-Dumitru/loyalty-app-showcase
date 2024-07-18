import React, { useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import QrCodeCard from "../components/QrCodeCard";
import { Context as AuthContext } from "../context/AuthContext";

const OfferQrScreen = () => {
  const route = useRoute();
  const { offer } = route.params;
  const { state } = useContext(AuthContext);
  
  const info =  {
    action: 'redeem_offer',
    userId: state.userId,
    offerId: offer._id
}

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <QrCodeCard info={info} text={"Scan de QR code to redeem the offer!"} subtext={offer.title} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default OfferQrScreen;
