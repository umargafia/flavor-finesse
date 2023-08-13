import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Theme } from '../../../constants/Theme';
import CountryCard from './CountryCard';
import { CountryList } from '../../../constants/CountryClass';
import Title from '../../global/Title';

const theme = Theme();

const CountrySection = () => {
  return (
    <View style={styles.container}>
      <Title text="Country Section" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CountryCard country={item.country} image={item.image} item={item} />
        )}
        data={CountryList}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CountrySection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
