import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { searchRecipes } from '../../store/api';
import RecipeCard from '../../components/global/recepiesSection/RecipeCard';
import { Theme } from '../../constants/Theme';
import Loading from '../../components/global/Loading';
import BannerAds from '../Ads/BannerAds';

const theme = Theme();

const RecipesPage = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [recipes, setRecipees] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: item.name,
    });
    getRecipes();
  }, []);

  async function getRecipes() {
    setLoading(true);
    const result = await searchRecipes({ query: item.name, type: item.name });
    setRecipees(result);
    setLoading(false);
  }

  function handleItemPress(recipe) {
    navigation.navigate('rw/recipe', { item: recipe });
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading style={styles.loader} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          data={recipes}
          renderItem={({ item: recipe }) => (
            <RecipeCard
              uri={recipe?.image}
              text={recipe?.title}
              item={item}
              onPress={() => handleItemPress(recipe)}
            />
          )}
          keyExtractor={(recipe) => recipe?.id}
          numColumns={theme.window.windowWidth > 600 ? 2 : 1}
        />
      )}
      <BannerAds />
    </View>
  );
};

export default RecipesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginTop: 10,
  },

  scrollView: {
    padding: 1,
    flexGrow: 1,
    width: '100%',
  },
  loader: {
    transform: [
      {
        translateY: -70,
      },
    ],
  },
});
