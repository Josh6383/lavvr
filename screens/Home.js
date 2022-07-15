import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { useFocusEffect } from '@react-navigation/native';
import Incrementer from '../components/Incrementer';
import { StyleSheet, Text, View, SafeAreaView, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import AddressInput from '../components/AddressInput';
import TimePicker from '../components/TimePicker';
import CustomAppBar from '../components/CustomAppBar';
import { db, auth } from '../config';
import { doc, getDoc, setDoc } from 'firebase/firestore';


export default function Home({ navigation }){

    const windowHeight = useWindowDimensions().height;

    const [colorsCheckBox, setColorsCheckbox] = useState(false);
    const [darksCheckBox, setDarksCheckBox] = useState(false);
    const [delicatesCheckBox, setDelicatesCheckBox] = useState(false);
    const [whitesCheckBox, setWhitesCheckBox] = useState(false);

    const [loads, setLoads] = useState(1);
    const [time, setTime] = useState('none');
    const [day, setDay] = useState('none');
    const [total, setTotal] = useState('0.00')
    const [userDoc, setUserDoc] = useState({});

    const zips = ['90041', '90021']

    // Reset state values after submit is pressed
    const reset = () => {
        setColorsCheckbox(false)
        setDarksCheckBox(false)
        setDelicatesCheckBox(false)
        setWhitesCheckBox(false)
        setLoads(1)
        setTime()
        setDay()
        setTotal()

    }

    const getLoads = (num) => {
        setLoads(num);
    }

    const getTime = (time) => {
        setTime(time);
    }

    const getDay = (day) => {
        setDay(day);
    }

    const getURL = async () => {

        if(colorsCheckBox == false && darksCheckBox == false && whitesCheckBox === false && delicatesCheckBox === false){
            alert('You need to select your load type.');
        } else {
            if(day === 'none'){
                alert("You haven't chosen a pickup day.");
            } else {
                if(time === 'none'){
                    alert("You haven't chosen a pickup time."); 
                } else {
                    if(userDoc.streetAddress === ''){
                        alert("You haven't filled out your address yet."); 
                    } else { 
                        if(!zips.includes(userDoc.zip)){
                            alert("You haven't filled out your zip code or we're not in your area yet."); 
                        } else {
                            const user = auth.currentUser;
                            const uid = user.uid;
                            const date = new Date().toLocaleString('en-US', {timeZone: 'PST'});
                            const params = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    'loadCount': loads,
                                    'delicates': delicatesCheckBox.toString(),
                                    'colors': colorsCheckBox.toString(),
                                    'darks': darksCheckBox.toString(),
                                    'white': whitesCheckBox.toString(),
                                    'address': userDoc.streetAddress,
                                    'pickupTime': time,
                                    'pickupDay': day,
                                    'email': user.email
                                })
                            };
                            const response = await fetch('https://lavvr.pythonanywhere.com/webhook', params);
                            const data = await response.json();
                            navigation.navigate('Checkout', {url: data.url});
                            setDoc(doc(db, 'Users', uid, 'Receipts', date), {
                                'Date': date,
                                'total': total,
                                'loadSize': loads,
                                'pickupTime': time,
                                'pickupDay': day,
                                'Status': 'Pending'
                            })
                        }
                    }
                }
            }
        }
    }
    
    useEffect(() =>{
        let isMounted = true;
        let costEquation = ((2.25*loads) + 7.00).toFixed(2);


        if(isMounted){
            setTotal(costEquation)
        }

        return () => {
            isMounted = false;
        }

    },[loads])

    const user = auth.currentUser;

    useFocusEffect(() => {

        let isMounted = true;

        const getInfo = ()  => {

            const uid = user.uid;
            getDoc(doc(db, 'Users', uid, 'Profile', 'Information'))
            .then((snapshot) => {
                if(snapshot.exists) {
                    setUserDoc(snapshot.data())
                } else {
                }
            })
            .catch((error) => {
            })
        }

        if(isMounted) {
            getInfo();  
        }

        return () => {
            isMounted = false;
        }
    })

    return(
        <SafeAreaView style={{
            height: '100%',
            alignItems: 'center',
            minHeight: Math.round(windowHeight)
        }}>
            <View style={styles.box}>
                <Text style={styles.headerText}>Order Details</Text>
                <View style={styles.loadSizeContainer}>
                    <View style={styles.inputLabel}>
                        <Text style={styles.sizeFont}>Load Size</Text>
                    </View>
                    <View style={styles.input}>
                        <Incrementer getLoads={getLoads} />
                    </View>
                </View>
                <View style={styles.loadSizeContainer}>
                    <Text style={styles.sizeFont}>Load Type</Text>
                    <View style={styles.checkboxesConatiner}>
                        <View style={styles.colors}>
                            <Text>Colors</Text>
                            <Checkbox value={colorsCheckBox} onValueChange={()=> setColorsCheckbox(!colorsCheckBox)} color={colorsCheckBox ? '#89cff0' : undefined}/>
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

                </View>
                <View style={styles.address}>
                    <AddressInput title='Address' value={userDoc.streetAddress + ' ' + userDoc.zip} />
                </View>
                <View style={styles.timePicker}>
                    <TimePicker getTime={getTime} getDay={getDay} />
                </View>
                <View style={styles.estimate}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalText}>${total}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.ProceedButton} onPress={getURL}>
                <View style={styles.button}>
                    <Text style={styles.ButtonText}>Proceed To Checkout</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.appbar}>
                <CustomAppBar />
            </View>
        </SafeAreaView>
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
    appbar: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 80
    },
    ButtonText: {
        fontSize: 15,
        color: 'white'
    },
    button: {
        width: '100%',
        height: '70%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#89cff0',
        elevation: 2
    },
    ProceedButton: {
        marginTop: '5%',
        width: '60%',
        height: '10%',
    },
    buttonContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        marginTop: '15%',
        width: '90%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 2
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700'
    },
    loadSizeContainer: {
        marginTop: '10%',
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timePicker: {
        marginTop: '3%',
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputLabel: {
        borderColor: 'green'
    },
    checkbox: {
        width: '50%'
    },
    optionsCheckbox:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    TextInput: {
        borderWidth: 1,
        width: '10%'
    },
    input: {
        width: '50%'
    },
    sizeFont: {
        fontSize: 18,
    },
    address: {
        width: '90%',
        marginTop: '10%',
        height: '10%',
        justifyContent: 'center'
    },
    estimate: {
        width: '50%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalText: {
        fontSize: 18,
    }
})