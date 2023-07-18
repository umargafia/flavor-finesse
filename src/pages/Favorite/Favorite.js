import { FlatList, StyleSheet, View } from 'react-native';
import { Divider } from '@rneui/base';
import React from 'react';

import Header from '../../components/global/Header';
import { FavoriteClassList } from '../../constants/FavoriteConstant';
import FavoriteCard from '../../components/FavoritePage/FavoriteCard';

const Favorite = () => {
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
