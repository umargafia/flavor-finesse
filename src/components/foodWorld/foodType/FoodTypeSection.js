import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import FoodTypeCard from "./FoodTypeCard";
import { FoodTypes } from "../../../constants/FoodType";
import { Theme } from "../../../constants/Theme";

const theme = Theme();
const FoodTypeSection = () => {
  const [selected, setSelected] = useState("all");

  const handleItemPress = (itemId) => {
    setSelected(itemId);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(item) => (
          <FoodTypeCard
            icon={item.item.icon}
            title={item.item.name}
            active={item.item.id === selected ? true : false}
            onPress={() => handleItemPress(item.item.id)}
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
