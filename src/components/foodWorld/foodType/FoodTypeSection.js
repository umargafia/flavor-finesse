import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, VirtualizedList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import FoodTypeCard from './FoodTypeCard';
import { FoodTypes } from '../../../constants/FoodType';
import { Theme } from '../../../constants/Theme';
import { setFoodType } from '../../../store/foodWorldSlice';

const theme = Theme();

const FoodTypeSection = () => {
  const { type } = useSelector((state) => state.foodWorld);
  const [selected, setSelected] = useState(type);
  const dispatch = useDispatch();

  const handleItemPress = (item) => {
    setSelected(item.id);
    dispatch(setFoodType(item.id));
  };

  useEffect(() => {
    setSelected(type);
  }, [type]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <FoodTypeCard
            icon={item.icon}
            title={item.name}
            active={item.id === selected ? true : false}
            onPress={() => handleItemPress(item)}
          />
        )}
        data={FoodTypes}
        keyExtractor={(item) => item.id}
        style={styles.foodItemContainer}
      />
    </View>
  );
};

export default FoodTypeSection;

const styles = StyleSheet.create({
  foodItemContainer: {
    maxHeight: theme.window.windowWidth > 600 ? 200 : 100,
    marginTop: 10,
  },
});
