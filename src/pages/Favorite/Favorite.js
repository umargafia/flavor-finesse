import { FlatList, StyleSheet, View } from 'react-native';
import { Divider } from '@rneui/base';
import React, { useEffect, useState } from 'react';

import Header from '../../components/global/Header';
import { FavoriteClassList } from '../../constants/FavoriteConstant';
import FavoriteCard from '../../components/FavoritePage/FavoriteCard';
import { useSelector } from 'react-redux';
import { searchRecipesByIds } from '../../store/api';

const Favorite = () => {
  const { favorites } = useSelector((state) => state.auth);
  const [FavoriteClassList, setFavoriteClassList] = useState([]);

  useEffect(() => {
    getFavorites();
  }, [favorites]);

  const getFavorites = async () => {
    const recipes = await searchRecipesByIds({ recipeIds: favorites });
    setFavoriteClassList(recipes);
  };

  return (
    <View style={styles.container}>
      <Header text="Favorites" />
      <Divider />
      <View style={styles.container}>
        <FlatList
          data={FavoriteClassList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FavoriteCard item={item} />}
        />
      </View>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
