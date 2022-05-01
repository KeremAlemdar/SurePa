import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import PieChart from 'react-native-pie-chart';

const ReportPage = ({ navigation }) => {

    const data = {
        "username": "Kaan Bebiş",
        "age": 31,
        "date": "01.05.2021",
        "weekNo": 6,
        "medicines": [
            {
                id: 1,
                name: "Metoprolol",
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
                name: "Sulphamazetine",
                remaining: 10,
                usage: [
                    [true],
                    [true],
                    [false],
                    [false],
                    [true],
                    [false],
                    [true],
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
        const sliceColor = ["green", "red"];

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
                                    backgroundColor: dayList ? "green" : "red",
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
                {data.medicines.map(medicine => (
                    renderMedicineItem(medicine)
                ))}
            </View>
        </>
    }

    return (
        <View style={styles.container}>
            {data
                ? <>
                    <View style={styles.contentWrapper}>
                        <Text style={styles.header}>Weekly Report</Text>
                        <Text>
                            <Text style={styles.reportHeader}>Date: </Text>
                            {data.date}
                            <Text style={styles.reportHeader}>   Week : </Text>
                            {data.weekNo}
                        </Text>
                        <Text>
                            <Text style={styles.reportHeader}>User name: </Text>
                            {data.username}
                        </Text>
                        <Text>
                            <Text style={styles.reportHeader}>Age: </Text>
                            {data.age}
                        </Text>
                        <Text style={styles.header}>Medicine usage</Text>
                    </View>
                    <View style={styles.usageWapper}>
                        {displayListMedicineList()}
                    </View>
                </>
                : <Text>Loading ...</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        width: "100%"
    },
    contentWrapper: {

        justifyContent: 'flex-start'
    },
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
});

export default ReportPage;