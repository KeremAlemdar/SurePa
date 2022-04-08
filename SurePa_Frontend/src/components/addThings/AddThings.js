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
        <View style={commonStyle.mainDiv}>
            <CommonButton text="Add Caregiver" onPress={() => setDirectPage('AddCareGiverPage')} />
            <CommonButton text="Add randevu" onPress={() => onSubmit()} />
            <CommonButton text="Add contact" onPress={() => onSubmit()} />
        </View>
    );

    const actions = [
        {
          text: "Add randevu",
          icon: require("../../../img/empty.png"),
          name: "bt_accessibility",
          position: 2
        },
        {
          text: "Add Caregiver",
          icon: require("../../../img/empty.png"),
          name: "bt_language",
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
                        caregivers.map((caregiver) => {
                            return (
                                <CardView
                                    key={caregiver.id}
                                    title={caregiver.name}
                                    text={caregiver.name}
                                />
                            );
                        })
                    }
                    {
                        meetings.map((meeting) => {
                            return (
                                <CardView
                                    key={meeting.id}
                                    title={meeting.name}
                                    text={meeting.time}
                                />
                            );
                        })
                    }
                </View>
            ) : (buttons)}
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                }}
            />
        </View>
    );
};

export default AddThings;