import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import { UserAuth } from '../authContext';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import Icon from 'react-native-vector-icons/Feather';
import { db, auth } from '../config';
import { setDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Login({ navigation }){

    const windowHeight = useWindowDimensions().height;

    const user = <Icon name='user' size={30} color='white' style={styles.icon} />
    const lock = <Icon name='lock' size={30} color='white' style={styles.icon} />

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { createUser, login } = UserAuth();

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      };

    const register = async () => {
        if (!validateEmail(email)) {
            // not a valid email
          } else {
            // valid email
            try {
                const credentials = await createUser(email, password);
                const uid = credentials.user.uid;
                await setDoc(doc(db, 'Users', uid, 'Profile', 'Information'), {
                    'firstName': '',
                    'lastName': '',
                    'phoneNumber': '',
                    'streetAddress': ''
                })
                navigation.navigate('Home');
            } catch (error) {
                setError(error.message);
            }
        }
    }

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigation.navigate('Home');
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home')
            }
        })

        return unsubscribe
    }, [])

    return(
        <KeyboardAvoidingWrapper>
            <SafeAreaView style={{
                height: '100%',
                alignItems: 'center',
                minHeight: Math.round(windowHeight),
                marginTop: '12%',
                alignItems: 'center',
                backgroundColor: '#89cff0',
            }}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>LAVVR</Text>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputBorder}>
                            {user}
                            <TextInput style={styles.inputs} placeholder='Email' placeholderTextColor='white' onChangeText={(text) => setEmail(text)} />
                        </View>
                        <View style={styles.inputBorder}>
                            {lock}
                            <TextInput style={styles.inputs} secureTextEntry placeholder='Password' placeholderTextColor='white' onChangeText={(text) => setPassword(text)} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={register}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>{error}</Text>
                    <View> 
                        <TouchableOpacity>
                            <Text style={styles.forgot}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: '40%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        width: '90%',
        zIndex: 5

    },
    title: {
        fontSize: 50,
        color: 'white'
    },
    inputsContainer: {
        width: '90%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBorder: {
        margin: '5%',
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        height: '30%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 100,
        flexDirection: 'row'
    },
    icon: {
        width: '20%',
        textAlign: 'center',
    },
    inputs: {
        width: '75%',
        marginRight: '1%',
        height: '90%',
        borderRadius: 100,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '5%',
        width: '90%',
        height: '20%'
    },
    button: {
        width: '48%',
        height: '70%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2
    },
    buttonText: {
        color: '#89cff0'
    },
    forgot: {
        color: 'white'
    }
})