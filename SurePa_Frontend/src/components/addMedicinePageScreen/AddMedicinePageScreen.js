import { Text, View } from 'react-native';
import React, { useState } from 'react';
import commonStyle from '../../commonStyle';
import CommonButton from '../button';
import Name from './Name';
import Type from './Type';
import PerDay from './PerDay';
import Times from './Times';
import Dose from './Dose';
import Finalize from './Finalize';
import { addMedicine } from '../../services/PatientController';
import { auth } from '../../services/DbCon';

const AddMedicinePageScreen = () => {
    const [medicineName, setMedicineName] = useState('');
    const [type, setType] = useState('Please Chose');
    const [perDay, setPerDay] = useState('Please Chose');
    const [times, setTimes] = useState([]);
    const [doseCount, setDoseCount] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [pageContent, setPageContent] = useState(<Name medicineName={medicineName} setMedicineName={setMedicineName} />);
    const [pageName, setPageName] = useState('Name');

    const nextPage = () => {
        if (pageName === 'Name' && medicineName !== '') {
            setPageContent(<Type
                type={type}
                setType={setType}
                medicineName={medicineName} />);
            setPageName('Type');
        }
        else if (pageName === 'Type' && type !== 'Please Chose') {
            setPageContent(<Dose
                medicineName={medicineName}
                type={type}
                doseCount={doseCount}
                setDoseCount={setDoseCount} />);
            setPageName('NumberOfTimes');
        }
        else if (pageName === 'NumberOfTimes') {
            setPageContent(<PerDay
                type={type}
                perDay={perDay}
                setPerDay={setPerDay}
                medicineName={medicineName}
                doseCount={doseCount} 
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate} />);
            setPageName('PerDay');
        }
        else if (pageName === 'PerDay') {
            setPageContent(<Times
                type={type}
                perDay={perDay}
                setPerDay={setPerDay}
                medicineName={medicineName}
                doseCount={doseCount}
                setTimes={setTimes}
                times={times} />);
            setPageName('Times');
        }
        else if (pageName === 'Times') {
            setPageContent(<Finalize
                medicineName={medicineName}
                type={type}
                doseCount={doseCount}
                perDay={perDay}
                times={times} 
                startDate={startDate}
                endDate={endDate} />);
            setPageName('Finalize');
        }
    };

    const goBack = () => {
        if (pageName === 'Type') {
            setPageContent(<Name medicineName={medicineName} setMedicineName={setMedicineName} />);
            setPageName('Name');
        } else if (pageName === 'NumberOfTimes') {
            setPageContent(<Type type={type} setType={setType} medicineName={medicineName} />);
            setPageName('Type');
        } else if (pageName === 'PerDay') {
            setPageContent(<Dose
                medicineName={medicineName}
                type={type}
                doseCount={doseCount}
                setDoseCount={setDoseCount} />);
            setPageName('NumberOfTimes');

        } else if (pageName === 'Times') {
            setPageContent(<PerDay type={type} perDay={perDay} setPerDay={setPerDay} medicineName={medicineName} doseCount={doseCount} />);
            setPageName('PerDay');

        } else if (pageName === 'Finalize') {
            setPageContent(<Times type={type} perDay={perDay} setPerDay={setPerDay} medicineName={medicineName} doseCount={doseCount} setTimes={setTimes} times={times} />);
            setPageName('Times');
        }

    };

    const finalize = () => {
        addMedicine(auth.currentUser.uid, medicineName, type, doseCount, perDay, times, startDate, endDate);
    };
    
    // const resetForm = () => {
    //     setMedicineName('');
    //     setType('Please Select');
    //     setPerDay('Please Select');
    //     setTimes([]);
    //     setDoseCount(0);
    // }
    return (
        <View style={commonStyle.mainDiv}>
            <Text>sdfsdfsd</Text>
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