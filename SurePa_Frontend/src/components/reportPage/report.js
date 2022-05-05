import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { Row } from 'react-native-table-component';
import commonStyle from '../../commonStyle';
import { auth } from '../../services/DbCon';
import { getReportData, returnPatient } from '../../services/PatientController';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ReportPage = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUserData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [userData, setUserData] = useState();
    const [patientInfo, setPatientInfo] = useState({
        uid: '',
        name: '',
        email: '',
        status: ''
    });
    const [date, setDate] = useState();
    const [medicineUsage, setMedicineUsage] = useState();

    const dataOld = {
        "username": "denem1",
        "date": "04.05.2022",
        "medicines": [
            {
                id: 1,
                name: "Parol",
                remaining: 5,
                usage: [
                    [true, false],
                    [true, true],
                    [true, false],
                    [false, false],
                    [true, true],
                    [true, true],
                    [true, false],
                ]
            },
            {
                id: 2,
                name: "Metpamid",
                remaining: 10,
                usage: [
                    [true, false, true],
                    [true, false, true],
                    [false, false, true],
                    [false, true, true],
                    [true, false, false],
                    [false, true, true],
                    [true, false, true],
                ]
            },
            {
                id: 2,
                name: "Arveles",
                remaining: 10,
                usage: [
                    [false, false],
                    [false, false],
                    [false, false],
                    [false, false],
                    [false, false],
                ]
            }
        ]
    }

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
            return <View style={styles.usageCircleWrapper}>
                {medicine.usage.map((usage, index) => (
                    <View style={styles.dailyUsage} key={index}>
                        <Text style={styles.textDay}>Day {index + 1}</Text>
                        {usage.map((dayList, indexInner) => (
                            <View
                                key={indexInner}
                                style={[styles.box,
                                {
                                    backgroundColor: dayList ? "#00ff00" : "gray",
                                }
                                ]}
                            />
                        ))}
                    </View>
                ))}
            </View>
        }

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
        return <>
            <View>
                {medicineUsage.map(medicine => (
                    renderMedicineItem(medicine)
                ))}
            </View>
        </>
    }

    async function getUserData() {
        const response = await getReportData();
        setUserData(response);
    };

    const getProfileInfo = () => {
        const { uid } = auth.currentUser;
        returnPatient(uid).then((res) => {
            setPatientInfo(res);
        });
    };

    useEffect(() => {
        getProfileInfo();
        getUserData();
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        const fullDate = `${date}.${month}.${year}`;
        setDate(fullDate);
        setData();
    }), [];

    const setData = () => {
        if (userData) {

            let medicineNameOld = '';
            let medicineArray = [];

            userData.forEach(row => {
                let medicineNameCurrent = row.name;
                console.log(`current med name ${medicineNameCurrent}`);

                if (medicineNameOld == medicineNameCurrent) {
                    medicineArray[medicineArray.length - 1].usage = [...medicineArray[medicineArray.length - 1].usage, row.usage];
                    console.log(`current med ussage ${row.usage}`);
                    console.log(`eşitt current ${medicineNameCurrent} old = ${medicineNameOld}`);
                } else {
                    let newMedicine = {
                        id: medicineArray.length,
                        name: medicineNameCurrent,
                        remaining: row.numberOfDose,
                        usage: [row.usage]
                    }
                    medicineArray = [...medicineArray, newMedicine];
                    console.log(`current med ussage ${row.usage}`);
                    medicineNameOld = row.name;
                }
            });
            setMedicineUsage(medicineArray);
            console.log(userData);
            console.log(medicineArray);
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