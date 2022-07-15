import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown-upgraded';
import { db } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function TimePicker({ getTime, getDay }){

    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const [pickupTimes, setPickupTimes] = useState('');
    const [pickupDays, setPickupDays] = useState('');

    let availableTimes = [
        {value: pickupTimes.time1},
        {value: pickupTimes.time2},
        {value: pickupTimes.time3},
        {value: pickupTimes.time4},
        {value: pickupTimes.time5}
    ]   
    let availableDays = [
        {value: pickupDays.day1},
        {value: pickupDays.day2},
        {value: pickupDays.day3},
        {value: pickupDays.day4},
        {value: pickupDays.day5}
    ]   

    useFocusEffect(() => {

        let isMounted = true;

        const getAvailabilityTimes = ()  => {

            getDoc(doc(db, 'Availability', 'Times'))
            .then((snapshot) => {
                if(isMounted) {
                    setPickupTimes(snapshot.data())
                } else {
                }
            })
            .catch((error) => {
            })
        }

        const getAvailabilityDays = ()  => {

            getDoc(doc(db, 'Availability', 'Days'))
            .then((snapshot) => {
                if(isMounted) {
                    setPickupDays(snapshot.data())
                } else {
                }
            })
            .catch((error) => {
            })
        }

        getAvailabilityDays();
        getAvailabilityTimes();

        return () => {
            isMounted = false;
        }
    })

    useEffect(() => {

        let isMounted = true;

        if(isMounted){
            getTime(time);
            getDay(day); 
        }

        return () => {
            isMounted = false;
        }

    },[time, day])


    return(
        <View style={styles.timePickerContainer}>
            <Text style={styles.title}>Pickup</Text>
            <View style={styles.timeDropdown}>
                <Dropdown label='Day' data={availableDays} onChangeText={text => setDay(text)} />
            </View>
            <View style={styles.timeDropdown}>
                <Dropdown label='Time' data={availableTimes} onChangeText={text => setTime(text)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timePickerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeDropdown: {
        width: '32%',
        paddingBottom: '10%'
    },
    title: {
        fontSize: 18
    }
})