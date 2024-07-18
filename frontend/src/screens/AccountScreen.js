import React, { useContext } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return (
    <SafeAreaView>
            <Spacer>
                <Button title="Sign out" onPress={signout} />
            </Spacer>
    </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({});

export default AccountScreen;