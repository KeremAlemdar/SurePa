import { View } from 'react-native';
import React, { useState } from 'react';
import commonStyle from '../../commonStyle';
import CommonButton from '../button';
import Name from './Name';
import Type from './Type';
import PerDay from './PerDay';
import Times from './Times';
import NumberOfTimes from './NumberOfTimes';
import Finalize from './Finalize';
import { addMedicine } from '../../services/PatientController';
import { auth } from '../../services/DbCon';

const AddMedicinePageScreen = () => {
    const [medicineName, setMedicineName] = useState('');
    const [birim, setBirim] = useState('Please Chose');
    const [perDay, setPerDay] = useState('Please Chose');
    const [times, setTimes] = useState([]);
    const [doseCount, setDoseCount] = useState(0);

    const [pageContent, setPageContent] = useState(<Name medicineName={medicineName} setMedicineName={setMedicineName} />);
    const [pageName, setPageName] = useState('Name');

    const nextPage = () => {
        if (pageName === 'Name' && medicineName !== '') {
            setPageContent(<Type birim={birim} setBirim={setBirim} medicineName={medicineName} />);
            setPageName('Type');
        } 
        else if (pageName === 'Type' && birim !== 'Please Chose') {
            setPageContent(<NumberOfTimes
                medicineName={medicineName}
                birim={birim}
                doseCount={doseCount}
                setDoseCount={setDoseCount} />);
            setPageName('NumberOfTimes');
        } 
        else if (pageName === 'NumberOfTimes') {
            setPageContent(<PerDay birim={birim} doseCount={doseCount} medicineName={medicineName} perDay={perDay} setPerDay={setPerDay} />);
            setPageName('PerDay');
        }
        else if (pageName === 'PerDay') {
            setPageContent(<Times perDay={perDay} setTimes={setTimes} times={times} medicineName={medicineName} birim={birim} doseCount={doseCount} />);
            setPageName('Times');
        }
        else if (pageName === 'Times') {
            setPageContent(<Finalize medicineName={medicineName} birim={birim} doseCount={doseCount} />);
            setPageName('Finalize');
        }
    };

    const goBack = () => {
        if (pageName === 'Type') {
            setPageContent(<Name medicineName={medicineName} setMedicineName={setMedicineName} />);
            setPageName('Name');
        } else if (pageName === 'NumberOfTimes') {
            setPageContent(<Type birim={birim} setBirim={setBirim} medicineName={medicineName} />);
            setPageName('Type');
        } else if (pageName === 'PerDay') {
            setPageContent(<NumberOfTimes
                medicineName={medicineName}
                birim={birim}
                doseCount={doseCount}
                setDoseCount={setDoseCount} />);
            setPageName('NumberOfTimes');

        } else if (pageName === 'Times') {
            setPageContent(<PerDay
                medicineName={medicineName}
                setPerDay={setPerDay}
                perDay={perDay}
                birim={birim} />);
            setPageName('PerDay');

        } else if (pageName === 'Finalize') {
            setPageContent(<Times
                medicineName={medicineName}
                setTimes={setTimes}
                times={Times}
                perDay={perDay}
                birim={birim} />);
            setPageName('Times');
        }
        
    };

    const finalize = () => {
        addMedicine(auth.currentUser.uid, medicineName, doseCount, birim);
    };

    return (
        <View style={commonStyle.mainDiv}>
            {pageContent}
            {pageName === 'Finalize' ?
                (<CommonButton text="Add" onPress={finalize} />)
                : (<CommonButton text="Next" onPress={nextPage} />)
            }
            {pageName !== 'Name' &&
                <CommonButton text="Back" onPress={() => goBack()} />
            }
        </View>
    );
}

export default AddMedicinePageScreen;