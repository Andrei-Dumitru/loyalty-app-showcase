import React from 'react';
import { View, Image, FlatList, StyleSheet, Text, SafeAreaView, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import OfferCard from '../components/OfferCard';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BusinessDetailsScreen = () => {
    const route = useRoute();
    const { business } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, padding: 5 }}>
            <Image
                style={styles.image}
                source={{ uri: business.imageUri }}
            />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => Linking.canOpenURL(business.locationUri).then(() => Linking.openURL(business.locationUri))}>
                <Feather name="map-pin" size={24} color="red" style={{padding: 2}}/>
                </TouchableOpacity>
                <Text style={styles.name}>{business.name}</Text>
            </View>
            <Text style={styles.description}>{business.description}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={business.offers}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <OfferCard info={item} />}
                contentContainerStyle={{paddingBottom: 65}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 180,
        borderRadius: 5,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 8
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 5
    },
});

export default BusinessDetailsScreen;