import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function Checkboxes({getColorLoads}){

    const [colorsCheckBox, setColorsCheckbox] = useState(false);
    const [darksCheckBox, setDarksCheckBox] = useState(false);
    const [delicatesCheckBox, setDelicatesCheckBox] = useState(false);
    const [whitesCheckBox, setWhitesCheckBox] = useState(false);

    return(
        <View style={styles.checkboxesConatiner}>
            <View style={styles.colors}>
                <Text>Darks</Text>
                <Checkbox value={colorsCheckBox} onValueChange={()=> setColorsCheckbox(!darksCheckBox)} color={colorsCheckBox ? '#89cff0' : undefined}/>
            </View>
            <View style={styles.darks}>
                <Text>Darks</Text>
                <Checkbox value={darksCheckBox} onValueChange={()=> setDarksCheckBox(!darksCheckBox)} color={darksCheckBox ? '#89cff0' : undefined}/>
            </View>
            <View style={styles.whites}>
                <Text>Whites</Text>
                <Checkbox value={whitesCheckBox} onValueChange={()=> setWhitesCheckBox(!whitesCheckBox)} color={whitesCheckBox ? '#89cff0' : undefined}/>
            </View>
            <View style={styles.delicates}>
                <Text>Delicates</Text>
                <Checkbox value={delicatesCheckBox} onValueChange={()=> setDelicatesCheckBox(!delicatesCheckBox)} color={delicatesCheckBox ? '#89cff0' : undefined}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    checkboxesConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '70%'
    },
    colors: {
        alignItems: 'center'
    },
    darks: {
        alignItems: 'center'
    },
    whites: {
        alignItems: 'center'
    },
    delicates: {
        alignItems: 'center'
    },
})