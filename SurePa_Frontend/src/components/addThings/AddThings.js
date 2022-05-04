import React, { useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import commonStyle from '../../commonStyle';
import { getCaregivers, getMeetings } from '../../services/PatientController';
import CommonButton from '../button';
import CardView from '../cardView';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const AddThings = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const buttons = (
        <View>
            <CommonButton text="Add Caregiver" onPress={() => setDirectPage('AddCareGiverPage')} />
            <CommonButton text="Add randevu" onPress={() => setDirectPage('AddMeetingPage')} />
            <CommonButton text="Add contact" onPress={() => onSubmit()} />
        </View>
    );

    const getThings = () => {
        getCaregivers().then((tcaregivers) => {
            setCaregivers(tcaregivers);
        });
        getMeetings().then((tmeetings) => {
            setMeetings(tmeetings);
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
            </View>
        </ScrollView>
    );
};

export default AddThings;