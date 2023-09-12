import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/global/Header';
import FavoriteCard from '../../components/FavoritePage/FavoriteCard';
import { getFavorites, searchRecipesByIds } from '../../store/api';
import { Theme } from '../../constants/Theme';
import LoginRedirectButton from '../../components/global/LoginRedirecButton';

const theme = Theme();
const Favorites = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    if (!isAuthenticated) {
      return;
    }

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
    setIsRefreshing(true);
    fetchFavorites();
  }, []);

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { margin: 20 }]}>
        <Header text="Favorites" />
        <Divider />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>No Favorites😢</Text>
          <LoginRedirectButton />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header text="Favorites" />
      <Divider />
      <View style={styles.container}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <VirtualizedList
            getItemCount={() => favoriteRecipes.length}
            getItem={(data, index) => {
              return {
                id: index,
                title: data.name,
              };
            }}
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
  },
  loginContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 30,
    color: theme.palette.tertiary,
    borderBottomColor: theme.palette.tertiary,
    fontFamily: theme.font.sansRegular,
  },
});
