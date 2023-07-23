import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { Theme } from '../../../constants/Theme';
import RecipeCard from './RecipeCard';
import { getRandomRecipes, searchRecipes } from '../../../store/api';

const theme = Theme();

const Recipe = ({ data }) => {
  const [recipes, setRecipees] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getRecipes();
  }, [data]);

  async function getRecipes() {
    // const result = await searchRecipes({ query: data, type: data });
    const randomRecipes = await getRandomRecipes({ tags: 'juice' });
    setRecipees(randomRecipes);
  }

  const handleItemPress = (item) => {
    navigation.navigate('rw/recipe', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes World</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        data={recipes}
        renderItem={({ item }) => (
          <RecipeCard
            uri={item?.image}
            text={item?.title}
            onPress={() => handleItemPress(item)}
          />
        )}
        keyExtractor={(item) => item?.id}
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
