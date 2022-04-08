import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import commonStyle from '../../commonStyle';
import { getCaregivers, getMeetings } from '../../services/PatientController';
import CommonButton from '../button';
import CardView from '../cardView';
import { FloatingAction } from "react-native-floating-action";

const AddThings = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [meetings, setMeetings] = useState([]);

    const buttons = (
        <View>
            <CommonButton text="Add Caregiver" onPress={() => setDirectPage('AddCareGiverPage')} />
            <CommonButton text="Add randevu" onPress={() => setDirectPage('AddMeetingPage')} />
            <CommonButton text="Add contact" onPress={() => onSubmit()} />
        </View>
    );

    const actions = [
        {
            text: "Add Meeting",
            icon: require("../../../img/empty.png"),
            name: "AddMeetingPage",
            position: 2,
        },
        {
            text: "Add Caregiver",
            icon: require("../../../img/empty.png"),
            name: "AddCareGiverPage",
            position: 1
        },
        {
            text: "Add contact",
            icon: require("../../../img/empty.png"),
            name: "bt_room",
            position: 3
        }
    ];

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    useEffect(() => {
        getCaregivers().then((tcaregivers) => {
            setCaregivers(tcaregivers);
        });
        getMeetings().then((tmeetings) => {
            setMeetings(tmeetings);
        });
    }, []);

    return (
        <View style={commonStyle.mainDiv}>
            {(meetings.length > 0 || caregivers.length > 0) ? (
                <View>
                    {
                        caregivers.map((caregiver, id) => {
                            return (
                                <CardView
                                    key={id}
                                    title={caregiver.name}
                                    text={caregiver.name}
                                />
                            );
                        })
                    }
                    {
                        meetings.map((meeting, id) => {
                            return (
                                <CardView
                                    key={id}
                                    title={meeting.title}
                                    text={`${meeting.details} \n ${meeting.date} \n ${meeting.time}`}
                                />
                            );
                        })
                    }
                </View>
            ) : (buttons)}
            <FloatingAction
                actions={actions}
                style={{zIndex: 5}}
                onPressItem={name => {
                    setDirectPage(name);
                }}
            />
        </View>
    );
};

export default AddThings;