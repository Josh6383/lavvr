import React, { useState, useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, BackHandler, Text } from 'react-native';

export default function Checkout({route, navigation}){

    const { url } = route.params;

    const [currentUrl, setCurrentUrl] = useState('');
    const [canGoBack, setCanGoBack] = useState(false);

    const webviewref = useRef(null);

    const onNavigationStateChange = (webViewState) => {
        setCanGoBack(webViewState.canGoBack);
        setCurrentUrl(webViewState.url);
    }

    const backAction = () => {
        if(canGoBack){
            webviewref.current.goBack();
        } else{
            navigation.goBack();
        }

        return true;
    }

    useEffect(()=>{

        let isMounted = true; 

        BackHandler.addEventListener('hardwareBackPress', backAction);

        () => BackHandler.removeEventListener('hardwareBackPress', backAction);

        return () => {
            isMounted = false;
        }
    }, [ canGoBack ])

    return(
        <SafeAreaView>
            <View style={{marginTop: 50, height: '85%', width: '100%'}}>
                <WebView 
                    ref={webviewref} 
                    startInLoadingState={true} 
                    source={{uri: url}} 
                    onNavigationStateChange={onNavigationStateChange}
                    />
            </View>
            <View style={styles.appBar}>
                <TouchableOpacity style={{marginBottom: '5%'}} onPress={backAction}>
                    <Text style={{color: 'white'}}>Back To Main Screen</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '10%',
        width: '100%',
        position: 'relative',
        backgroundColor: '#89cff0',
    },
});