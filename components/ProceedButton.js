import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProceedButton(props){
    return(
        <View style={styles.button}>
            <Text style={styles.ButtonText} onPress={()=>{props.function}}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: '70%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#89cff0',
        elevation: 2
    },
    ButtonText: {
        fontSize: 15,
        color: 'white'
    }
})