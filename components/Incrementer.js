import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Incrementer({getLoads}){

    const [loadCount, setLoadCount] = useState(1);

    const increment = () => {
        setLoadCount(prevLoadCount => prevLoadCount + 1);
    }

    const decrement = () => {
        setLoadCount(prevLoadCount => prevLoadCount - 1);
    }

    const minCheck = () => {
        if (loadCount <= 0) {
            setLoadCount(1)
            alert('Minimum load size is 1 load at a time.')
        }
    }

    const maxCheck = () => {
        if (loadCount >= 10) {
            setLoadCount(10)
            alert('Maximum load size is 10 loads at a time.')
        }
    }

    useEffect(() => {
        
        let isMounted = true;
        
        minCheck();
        maxCheck();
        getLoads(loadCount);

        return () => {
            isMounted = false;
        }

    },[loadCount])

    return(
        <View style={styles.incrementContainer}>
            <View style={styles.loadCountContainer}>
                <Text style={styles.loadCount}>{loadCount}</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.incrementButtonContainer} onPress={increment}>
                    <Text style={styles.increment}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.decrementButtonContainer} onPress={decrement}>
                    <Text style={styles.decrement}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadCountContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        width: '60%',
        alignContent: 'center',
        justifyContent: 'space-evenly'
    },
    incrementButtonContainer: {
        borderRadius: 20,
        width: '40%',
        alignItems: 'center',
        backgroundColor: '#89cff0'
    },
    increment: {
        color: 'white',
        fontSize: 25,
    },
    decrementButtonContainer: {
        borderRadius: 20,
        width: '40%',
        alignItems: 'center',
        backgroundColor: '#89cff0'
    },
    decrement: {
        color: 'white',
        fontSize: 25,
    },
    incrementContainer: {
        flexDirection: 'row',
        
    },
    loadCount: {
        fontSize: 22
    }
})