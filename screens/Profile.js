import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { UserAuth } from '../authContext';
import { db, auth } from '../config';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import CustomAppBar from '../components/CustomAppBar';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import ProceedButton from '../components/ProceedButton';

export default function Profile({ navigation }){

    const user = auth.currentUser;

    const windowHeight = useWindowDimensions().height;
    const [userDoc, setUserDoc] = useState('');

    const { logout } = UserAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('Login');
        }catch (error) {
        }
    }
    const uid = user.uid; 

    useFocusEffect(() => {

        let isMounted = true;

        const getInfo = ()  => {

            getDoc(doc(db, 'Users', uid, 'Profile', 'Information'))
            .then((snapshot) => {
                if(isMounted) {
                    setUserDoc(snapshot.data());
                } else {
                }
            })
            .catch((error) => {
            })
        }

        getInfo();

        return () => {
            isMounted = false;
        }
    })

    return(
        <KeyboardAvoidingWrapper>
            <View style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                minHeight: Math.round(windowHeight) - 59
            }}>
                <View style={styles.box}>
                    <Text style={styles.headerText}>Profile</Text>
                <View style={styles.profileAddress}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.title}>First Name</Text>
                        <TextInput
                            textAlign={'center'}
                            style={styles.addressInput}
                            defaultValue={userDoc.firstName}
                            onChangeText={text => updateDoc(doc(db, 'Users', uid, 'Profile', 'Information'), {
                                firstName: text
                            })}
                        />
                    </View>
                </View>
                <View style={styles.profileAddress}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.title}>Last Name</Text>
                        <TextInput
                            textAlign={'center'}
                            style={styles.addressInput}
                            defaultValue={userDoc.lastName}
                            onChangeText={text => updateDoc(doc(db, 'Users', uid, 'Profile', 'Information'), {
                                lastName: text
                            })}
                        />
                    </View>
                </View>
                <View style={styles.profileAddress}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.title}>Phone Number</Text>
                        <TextInput
                            textAlign={'center'}
                            style={styles.addressInput}
                            defaultValue={userDoc.phoneNumber}
                            onChangeText={text => updateDoc(doc(db, 'Users', uid, 'Profile', 'Information'), {
                                phoneNumber: text
                            })}
                        />
                    </View>
                </View>
                <View style={styles.profileAddress}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.title}>Street Address</Text>
                        <TextInput
                            textAlign={'center'}
                            style={styles.addressInput}
                            defaultValue={userDoc.streetAddress}
                            onChangeText={text => updateDoc(doc(db, 'Users', uid, 'Profile', 'Information'), {
                                streetAddress: text
                           })}
                        />
                    </View>
                </View>
                <View style={styles.profileAddress}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.title}>Zip Code</Text>
                        <TextInput
                            textAlign={'center'}
                            style={styles.addressInput}
                            defaultValue={userDoc.zip}
                            onChangeText={text => updateDoc(doc(db, 'Users', uid, 'Profile', 'Information'), {
                                zip: text
                            })}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.ProceedButton}>
                    <ProceedButton title='Edit Payment Details' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logout}>
                    <Text style={styles.logoutText} onPress={handleLogout}>Logout</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.appbar}>
                    <CustomAppBar />
                </View>
            </View>
        </KeyboardAvoidingWrapper>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        fontWeight: '700'
    },
    addressContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
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
        fontSize: 18,
    },
    box: {
        marginTop: '15%',
        width: '90%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 2
    },
    profileAddress: {
        width: '90%',
        marginTop: '4%',
        height: '10%',
        justifyContent: 'center'
    },
    ProceedButton: {
        marginVertical: '1%',
        width: '60%',
        height: '15%',
        justifyContent: 'center',
    },
    appbar: {
        height: '11%',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    logout: {
        width: '50%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 18,
        color: '#89cff0'
    }
})