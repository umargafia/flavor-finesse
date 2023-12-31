import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Theme } from '../../../constants/Theme';
import RecipeCard from './RecipeCard';
import { getRandomRecipes, searchRecipes } from '../../../store/api';
import Loading from '../Loading';

const theme = Theme();

const Recipe = ({ data }) => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const { type } = useSelector((state) => state.foodWorld);

  useEffect(() => {
    getRecipes();
  }, [data]);

  async function getRecipes() {
    setLoading(true);
    if (type === 'all') {
      const data = await getRandomRecipes();
      setRecipes(data.recipes);
    } else {
      const data = await searchRecipes({ query: type, type });
      setRecipes(data);
    }
    setLoading(false);
  }

  const handleItemPress = (item) => {
    navigation.navigate('rw/recipe', { item });
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <Loading
          style={{
            transform: [
              {
                translateY: -130,
              },
            ],
          }}
        />
      )}
      <Text style={styles.title}>Recipes World</Text>
      <VirtualizedList
        getItemCount={() => (recipes ? recipes.length : 0)} // Use a ternary operator to handle the case when 'recipes' is null or undefined.
        getItem={(data, index) => {
          const item = data[index];
          return {
            key: item.id.toString(), // Ensure 'key' is a string.
            id: item.id,
            title: item.title,
            image: item.image,
            item: item,
          };
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        data={recipes}
        renderItem={({ item }) => (
          <RecipeCard
            uri={item.image}
            text={item.title}
            item={item}
            onPress={() => handleItemPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure 'keyExtractor' returns a string.
        numColumns={theme.window.windowWidth > 600 ? 2 : 1}
      />
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
    fontFamily: theme.font.DancingScriptMedium,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 1,
    flex: 1,
    width: '100%',
  },
});
