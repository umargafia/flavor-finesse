import {
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import React from 'react';

import { Theme } from '../../../constants/Theme';
import CourseCard from './CourseCard';
import { CourseList } from '../../../constants/Course';
import Title from '../../global/Title';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();
const Course = () => {
  const navigation = useNavigation();
  const handleItemPress = (item) => {
    navigation.navigate('recipesPage', { item: item });
  };

  return (
    <View style={styles.container}>
      <Title text="Recipes by Course" />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={8}
          renderItem={({ item }) => (
            <CourseCard
              image={item.image}
              text={item.name}
              onPress={() => handleItemPress(item)}
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

export default React.memo(Course);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.os === 'web' ? -150 : 0,
    marginBottom: theme.window.windowWidth > 800 ? 50 : 0,
  },
});
