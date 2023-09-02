import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Divider } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/global/Header';
import FavoriteCard from '../../components/FavoritePage/FavoriteCard';
import { getFavorites, searchRecipesByIds } from '../../store/api';

const Favorites = () => {
  const { token } = useSelector((state) => state.auth);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    const favorites = await getFavorites(token);
    try {
      const recipes = await searchRecipesByIds({
        recipeIds: favorites.data.favorites,
      });
      setFavoriteRecipes(recipes.reverse());
      setError(null);
    } catch (err) {
      setError('Error fetching favorite recipes. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Header text="Favorites" />
      <Divider />
      <View style={styles.container}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={favoriteRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FavoriteCard item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
});
