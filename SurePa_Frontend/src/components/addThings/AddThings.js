import React, { useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import commonStyle from '../../commonStyle';
import { getCaregivers, getMeetings, getPatients } from '../../services/PatientController';
import CommonButton from '../button';
import CardView from '../cardView';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const AddThings = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [patients, setPatients] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const buttons = (
        <View>
            <CommonButton text="Add Caregiver" onPress={() => setDirectPage('AddCareGiverPage')} />
            <CommonButton text="Add Meeting" onPress={() => setDirectPage('AddMeetingPage')} />
            <CommonButton text="Add Contact" onPress={() => onSubmit()} />
        </View>
    );

    const getThings = () => {
        getCaregivers().then((tcaregivers) => {
            setCaregivers(tcaregivers);
        });
        getMeetings().then((tmeetings) => {
            setMeetings(tmeetings);
        });
        getPatients().then((tpatients) => {
            setPatients(tpatients);
        });
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getThings();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    useEffect(() => {
        getThings();
    }, []);

    return (
        <ScrollView style={commonStyle.mainDiv}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
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
                {
                    patients.map((patient, id) => {
                        return (
                            <CardView
                                key={id}
                                title={patient.name}
                                text={'Patient'}
                            />
                        );
                    })
                }
            </View>
        </ScrollView>
    );
};

export default AddThings;