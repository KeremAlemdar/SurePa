import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import PieChart from 'react-native-pie-chart';
import commonStyle from '../../commonStyle';
import { auth } from '../../services/DbCon';
import { getBloodSugar, getReportData, returnPatient } from '../../services/PatientController';

const ReportPage = () => {
    const [patientInfo, setPatientInfo] = useState({
        uid: '',
        name: '',
        email: '',
        status: ''
    });
    const dateObj = new Date();
    const date = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
    const [medicineUsage, setMedicineUsage] = useState();
    const [bloodSugar, setBloodSugar] = useState([]);
    const [rendera, setRendera] = useState(true);

    const renderMedicineItem = (medicine) => {
        let usedCount = 0;
        let totalUse = 0;

        medicine.usage.map(day => {
            day.map(used => {
                totalUse++;
                if (used) {
                    usedCount++;
                }
            });
        });

        const widthAndHeight = 100;
        const series = [usedCount, totalUse - usedCount];
        const sliceColor = ["#00ff00", "gray"];

        const usage = () => {
            return (<View style={styles.usageCircleWrapper}>
                {medicine.usage.map((usage, index) => (
                    <View style={styles.dailyUsage} key={index}>
                        <Text style={styles.textDay}>Day {index + 1}</Text>
                        {usage.map((dayList, indexInner) => (
                            <View
                                key={`${index}${indexInner}`}
                                style={[styles.box,
                                {
                                    backgroundColor: dayList ? "#00ff00" : "gray",
                                }
                                ]}
                            />
                        ))}
                    </View>
                ))}
            </View>)
        };

        return <View>
            <Text style={styles.secondaryHeader}>
                {medicine.name}
            </Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Text>
                <Text style={styles.reportHeader}>Remaining in the Box: </Text>
                {medicine.remaining}
            </Text>
            <Text style={styles.secondaryHeader}>
                Usage:
            </Text>
            <View>
                {usage()}
            </View>
            <View>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                />
            </View>
        </View>
    }

    const displayListMedicineList = () => {
        return (<>
            <View>
                {medicineUsage.map(medicine => (
                    renderMedicineItem(medicine)
                ))}
            </View>
        </>)
    }

    const getUserData = () => {
        return new Promise((resolve) => {
            getReportData().then(data => {
                resolve(data);
            });
        });
    };

    const getProfileInfo = () => {
        const { uid } = auth.currentUser;
        returnPatient(uid).then((res) => {
            setPatientInfo(res);
        });
    };

    const getBloodSugarLocal = () => {
        const bloodSuagrArr = [['Date', 'Blood Sugar', 'Status']];
        getBloodSugar().then((res) => {
            res.map((item) => {
                bloodSuagrArr.push([item.date, item.bloodSugar, item.hungry]);
            });
            setBloodSugar(bloodSuagrArr);
        });
    }

    useEffect(() => {
        if (rendera) {
            getProfileInfo();
            getUserData().then(data => {
                setMedicineData(data);
            });
            getBloodSugarLocal();
            setRendera(false);
        }
    }), [];

    const setMedicineData = (userData) => {
        if (userData) {
            let medicineNameOld = '';
            let medicineArray = [];
            userData.forEach(row => {
                let medicineNameCurrent = row.name;
                if (medicineNameOld == medicineNameCurrent) {
                    medicineArray[medicineArray.length - 1].usage = [...medicineArray[medicineArray.length - 1].usage, row.usage];
                } else {
                    let newMedicine = {
                        id: medicineArray.length,
                        name: medicineNameCurrent,
                        remaining: row.numberOfDose,
                        usage: [row.usage]
                    }
                    medicineArray = [...medicineArray, newMedicine];
                    medicineNameOld = row.name;
                }
            });
            setMedicineUsage(medicineArray);
        }
    }
    return (
        <ScrollView style={[commonStyle.mainDiv]}>
            {medicineUsage
                ? <>
                    <View style={commonStyle.container}>
                        <Text style={styles.header}>Weekly Report</Text>
                        <Text>
                            <Text style={styles.reportHeader}>Date: </Text>
                            {date}
                        </Text>
                        <Text>
                            <Text style={styles.reportHeader}>User name: </Text>
                            {patientInfo.name}
                        </Text>
                        <Text style={styles.header}>Medicine usage</Text>
                    </View>
                    <View style={styles.usageWapper}>
                        {displayListMedicineList()}
                    </View>
                </>
                : <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    reportHeader: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    leftAligned: {
        textAlign: 'left',
    },
    secondaryHeader: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    box: {
        marginTop: 4,
        width: 25,
        height: 25,
        borderRadius: 50
    },
    textDay: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    usageWapper: {
        display: "flex",
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    usageCircleWrapper: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    dailyUsage: {
        margin: 5
    },
    activityIndicatorCenter: {
        alignContent: 'center'
    }
});

export default ReportPage;