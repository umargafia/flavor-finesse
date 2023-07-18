import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Theme } from '../../../constants/Theme';
import RecipeCard from './RecipeCard';
import { recipeTypes } from '../../../constants/RecipeConstant';

const theme = Theme();

const Recipe = () => {
  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('rw/recipe', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes World</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        data={recipeTypes}
        renderItem={({ item }) => (
          <RecipeCard
            image={item.image}
            text={item.name}
            onPress={() => handleItemPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={theme.window.windowWidth > 600 ? 2 : 1}
      ></FlatList>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: theme.font.sansRegular,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 1,
    flex: 1,
    width: '100%',
  },
});
