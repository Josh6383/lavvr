import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Card(props){
    return(
        <View style={styles.cardsContainer}>
            <View style={styles.cardHeader}>
                <Text numberOfLines={1} style={styles.dateText}>Date: {props.date}</Text>
                <Text style={styles.headerText}>Total: ${props.total}</Text>
            </View>
            <View style={styles.cardBody}>
                <View style={styles.rowOne}>
                    <Text style={styles.bodyText}>Day: {props.pickupDay}</Text>
                    <Text style={styles.bodyText}>Time: {props.pickupTime}</Text>
                </View>
                <View style={styles.rowTwo}>
                    <Text style={styles.bodyText}>Loads: {props.loadSize}</Text>
                    <Text style={styles.bodyText}>Order: {props.status}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        marginVertical: '2%',
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        height: 120,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cardBody: {
        justifyContent: 'center',
        height: '80%'
    },
    rowOne: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    rowTwo: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bodyText: {
        fontSize: 14,
        fontWeight: '500',
    },
    headerText: {
        paddingTop: '5%',
        fontWeight: '600',
    },
    dateText: {
        width: '40%',
        textAlignVertical: 'bottom',
        fontWeight: '600'
    }
})