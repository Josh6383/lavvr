import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function CustomAppBar(){

    const navigation = useNavigation();

    const orderIcon = <Icon name='skin' size={30} color='#89cff0' />
    const recieptIcon = <Icon name='wallet' size={30} color='#89cff0' />
    const profileIcon = <Icon name='user' size={30} color='#89cff0' />

    return(
        <View style={styles.bottom}>
            <TouchableOpacity style={styles.touchArea} onPress={() => navigation.navigate('Home')}>
                {orderIcon}
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchArea} onPress={() => navigation.navigate('Receipts')}>
                {recieptIcon}
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchArea} onPress={() => navigation.navigate('Profile')}>
                {profileIcon}
            </TouchableOpacity>
        </View>
    );
}

const styles= StyleSheet.create({
    touchArea: {
        height: '90%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        backgroundColor: 'white',
        elevation: 2,
        alignItems: 'center',
        borderRadius: 50,
        height: '100%',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})