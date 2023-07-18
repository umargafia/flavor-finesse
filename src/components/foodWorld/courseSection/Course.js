import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import { Theme } from "../../../constants/Theme";
import CourseCard from "./CourseCard";
import { CourseList } from "../../../constants/Course";
import Title from "../../global/Title";

const theme = Theme();
const Course = () => {
  const handleItemPress = (itemId) => {
    console.log(itemId);
  };

  return (
    <View style={styles.container}>
      <Title text="Recipes by Course" />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => (
            <CourseCard
              image={item.item.image}
              text={item.item.name}
              onPress={() => handleItemPress(item.item.id)}
            />
          )}
          data={CourseList}
          keyExtractor={(item) => item.id}
          style={styles.foodItemContainer}
        />
      </View>
    </View>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.os === "web" ? -150 : 0,
    marginBottom: theme.window.windowWidth > 800 ? 50 : 0,
  },
});
