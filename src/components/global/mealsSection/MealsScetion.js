import {
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import React from 'react';

import { Theme } from '../../../constants/Theme';
import MealsCard from './MealsCard';

const dummyData = [
  {
    id: 1,
    title: 'Tea and Pancake',
  },
  {
    id: 2,
    title: 'Tea and Pancake',
  },
  {
    id: 3,
    title: 'Tea and Pancake',
  },
  {
    id: 4,
    title: 'Tea and Pancake',
  },
  {
    id: 5,
    title: 'Tea and Pancake',
  },
];

const theme = Theme();
const MealsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended</Text>
      <VirtualizedList
        getItemCount={() => dummyData.length}
        getItem={(data, index) => {
          return {
            id: index,
            title: data.name,
          };
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(item) => <MealsCard />}
        data={dummyData}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MealsSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: theme.font.sansRegular,
  },
});
