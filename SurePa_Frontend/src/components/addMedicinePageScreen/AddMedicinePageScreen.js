import { View } from 'react-native';
import React, { useState } from 'react';
import commonStyle from '../../commonStyle';
import CommonButton from '../button';
import Name from './Name';
import Type from './Type';
import NumberOfTimes from './NumberOfTimes';
import Finalize from './Finalize';
import { addMedicine } from '../../services/PatientController';
import { auth } from '../../services/DbCon';

const AddMedicinePageScreen = () => {
    const [medicineName, setMedicineName] = useState('');
    const [birim, setBirim] = useState('Please Chose');
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
        } else if (pageName === 'Finalize') {
            setPageContent(<NumberOfTimes
                medicineName={medicineName}
                birim={birim}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption} />);
            setPageName('NumberOfTimes');
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