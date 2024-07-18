import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, RefreshControl, Text } from 'react-native';
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserDataContext } from "../context/UserDataContext";
import { Context as BusinessContext } from "../context/BusinessContext";
import QrCodeCard from '../components/QrCodeCard';
import PointsCard from '../components/PointsCard';

const QrScreen = () => {
    const { state } = useContext(AuthContext);
    const { state: userDataState, fetchUserData } = useContext(UserDataContext);
    const { state: businessesState, fetchBusinesses } = useContext(BusinessContext);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (state.userId) {
            fetchUserData(state.userId);
        }
        fetchBusinesses();
    }, []);

    const onRefresh = async () => {
        if (state.userId) {
            setRefreshing(true);
            await fetchUserData(state.userId);
            setRefreshing(false);
        }
    };

    const getBusinessName = (businessId) => {
        const business = businessesState.businesses.find(b => b._id === businessId);
        return business ? business.name : 'Unknown Business';
    };

    const info = {
        action: 'scan_user',
        userId: state.userId
    };

    return (
        <SafeAreaView style={styles.container}>
            <QrCodeCard info={info} text={"Scan the QR code to collect points!"} subtext={"Pull down to refresh points list"} />
            <FlatList
                data={userDataState.userData}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <PointsCard info={item} businessName={getBusinessName(item.businessId)} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20,
    },
});

export default QrScreen;
