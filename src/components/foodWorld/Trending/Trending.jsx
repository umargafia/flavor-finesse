import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import Title from '../../global/Title';
import { useNavigation } from '@react-navigation/native';
import { apiKey, getRandomRecipes, searchRecipesv2 } from '../../../store/api';
import { Image } from 'react-native';
import { Theme } from '../../../constants/Theme';
import Recipe from '../../global/recepiesSection/Recipe';
import RecipeCard from '../../global/recepiesSection/RecipeCard';

const theme = Theme();

const Trending = ({ horizontal }) => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    try {
      const data = await getRandomRecipes();
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  const handleItemPress = (item) => {
    navigation.navigate('rw/recipe', { item });
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCardContainer}
      onPress={() => handleItemPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Title text="Trending Recipes" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            uri={item?.image}
            text={item?.title}
            item={item}
            onPress={() => handleItemPress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  recipeCardContainer: {
    // width: 200,
    backgroundColor: theme.palette.white,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    backgroundColor: theme.palette.tertiary,
  },
  recipeImage: {
    height: 200, // Increased height for the image
    width: 260, // Increased width for the image
    resizeMode: 'cover',
    borderRadius: 10,
  },

  recipeTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.palette.white,
  },
});

export default Trending;
