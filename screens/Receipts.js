import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import CustomAppBar from '../components/CustomAppBar';
import { db, auth } from '../config';
import { collection, getDocs } from 'firebase/firestore';
import Card from '../components/ReceiptCard';

export default function Receipts(){

    const [items, setItems] = useState([]);

    const uid = auth.currentUser.uid;

    const itemsCollectionRef = collection(db, 'Users', uid, 'Receipts');

    useEffect(() => {

        let isMounted = true;

        const getItems = async () => {
            const data = await getDocs(itemsCollectionRef);
            if(isMounted){
                setItems(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            }
        }

        getItems();

        return () => {
            isMounted = false;
        }
    }, [])

    return(
        <View style={styles.pageContainer}>
            <View style={styles.box}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Past Orders</Text>
                </View>
                <View style={styles.receipts}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView} 
                    contentContainerStyle={{alignItems: 'center', flexGrow: 1, paddingBottom: 300}}
                >
                    {items.map((item, index) => {
                        return(
                                <Card key={index} date={item.id} total={item.total} pickupDay={item.pickupDay} pickupTime={item.pickupTime} loadSize={item.loadSize} status={item.Status} />
                        );
                    })}
                </ScrollView>
                </View>
            </View>
            <View style={styles.appbar}>
                <CustomAppBar />
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    pageContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    box: {
        width: '90%',
        height: '70%',
        marginTop: '10%',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 20
    },
    titleContainer: {
        marginTop: '10%',
    },  
    title: { 
        fontSize: 18,
        fontWeight: '700'
    },
    appbar: {
        height: '11%',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },
    scrollView: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    receipts: {
        width: '100%',
        height: '80%',
        borderRadius: 20,
        alignItems: 'center',
        marginTop: '10%',
    }
})