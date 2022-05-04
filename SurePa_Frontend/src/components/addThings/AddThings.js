import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import commonStyle from '../../commonStyle';
import { getCaregivers, getMeetings } from '../../services/PatientController';
import CommonButton from '../button';
import CardView from '../cardView';

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
        <ScrollView style={commonStyle.mainDiv}>
            {buttons}
            <View style={{ marginTop: 20 }}>
                {
                    caregivers.map((caregiver, id) => {
                        return (
                            <CardView
                                key={id}
                                title={caregiver.name}
                                text={'Caregiver'}
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
        </ScrollView>
    );
};

export default AddThings;