import React from 'react';
import { Text, TextInput, View, StyleSheet} from 'react-native';

export default function AddressInput(props){

    return(
        <View style={styles.addressContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                style={styles.addressInput}
                defaultValue={props.value}
                editable={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    addressInput: {
        borderWidth: 1,
        width: '70%',
        height: '50%',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0
    },
    title: {
        fontSize: 18
    }
})