import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const QrCodeCard = ({ info, text, subtext }) => {

  return (
    <View style={styles.card}>
                <View style={styles.qrcard}>
                    <QRCode value={JSON.stringify(info)} size={120}/>
                </View>
                <Text style={styles.text}>{text}</Text>
                <Text style={{color: 'white', fontSize: 12, paddingTop: 10}}>{subtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#4169e1',
        paddingTop: 15,
        paddingBottom: 20,
        borderRadius: 10,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    qrcard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15
    }
});

export default QrCodeCard;
