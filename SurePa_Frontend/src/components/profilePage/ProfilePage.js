import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import commonStyle from '../../commonStyle';
import { auth, db } from '../../services/DbCon';
import { returnPatient } from '../../services/PatientController';


import { getCaregivers, deleteCaregiver } from '../../services/PatientController';
import List from '../list/List';

const ProfilePage = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [patientInfo, setPatientInfo] = useState({
        uid: '',
        name: '',
        email: '',
        status: ''
    });
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    useEffect(() => {
        getCaregivers().then(res => {
            setCaregivers(res);
        });
    }, []);

    const denyCaregiver = (caregiver) => {
        deleteCaregiver(caregiver).then(res => {
        });
    };

    useEffect(() => {
        getProfileInfo();
        setReady(true);
    }, []);

    const getProfileInfo = () => {
        const { uid } = auth.currentUser;
        returnPatient(uid).then((res) => {
            setPatientInfo(res);
        });
        console.log(patientInfo);
    };
    return (

        <View style={commonStyle.mainDiv}>
            <View style={commonStyle.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{patientInfo.name}</Text>
                        <Text style={styles.info}>{patientInfo.status}</Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>Mix the colors in the palette,</Text>
                            <Text style={styles.description}>pick your filter.</Text>
                            <Text style={styles.description}>Which me do you want?</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text onPress={() => setDirectPage('InvitationsPage')}>See Invitations</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    },
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        textTransform: 'capitalize',
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        textAlign: 'center'
    },
    descriptionContainer: {
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});

export default ProfilePage;
