import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView, SafeAreaView, FlatList, StatusBar, SectionList } from 'react-native';
import PieChart from 'react-native-pie-chart';
import commonStyle from '../../commonStyle';

const DATA = [
  {
    title: "Medicines Taken for Today",
    data: ["Metoprolol               07.00 A.M.", "Gluformin                 07.00 A.M.", "Sulphamazetine     10.00 A.M."]
  },
  {
    title: "Medicines Remaining for Today",
    data: ["Metoprolol                07.00 P.M.", "Biguanidler               08.45 P.M.", "Glucophage              11.30 P.M."]
  }
];

<SectionList
  sections={DATA}
/>

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const dailyScheduler = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

export default dailyScheduler;