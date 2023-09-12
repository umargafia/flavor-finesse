import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { searchRecipes } from '../../store/api';
import RecipeCard from '../../components/global/recepiesSection/RecipeCard';
import { Theme } from '../../constants/Theme';
import Loading from '../../components/global/Loading';
import BannerAds from '../Ads/BannerAds';
import useInterstitial from '../Ads/Interstitial';

const theme = Theme();

const RecipesPage = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useInterstitial();

  useEffect(() => {
    navigation.setOptions({
      title: item.name,
    });
    getRecipes();
  }, [item.name, navigation]);

  async function getRecipes() {
    try {
      setLoading(true);
      const result = await searchRecipes({ query: item.name, type: item.name });
      setRecipes(result);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
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
          keyExtractor={(recipe) => recipe?.id.toString()}
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
    marginTop: 10,
  },
  scrollView: {
    padding: 1,
    flexGrow: 1,
    width: '100%',
  },
  loader: {
    transform: [{ translateY: -70 }],
  },
});
