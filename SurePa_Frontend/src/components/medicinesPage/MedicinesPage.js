import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../../services/DbCon';



// Initialize Firebase


const MedicinesPage = ({ navigation }) => {

    useEffect(() => {
        var docRef = db.collection("users").doc("F1OOfMb3PcQqUKIRPysS");

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }, []);

    return (
        <View>
            <Text>asda</Text>
        </View>
    )
};

export default MedicinesPage;
