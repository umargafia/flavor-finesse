import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import MyCard from '../global/MyCard';
import MyGrid from '../global/MyGrid';
import { Theme } from '../../constants/Theme';
import MyIcon from '../global/MyIcon';
import { AddToFavorite, DeleteFromFavorites } from '../../store/api';

const theme = Theme();
const FavoriteCard = ({ item, notFav }) => {
  const navigation = useNavigation();
  const [isFavorite, setFavorite] = useState(true);
  const { token } = useSelector((state) => state.auth);

  async function toggleFavorite() {
    if (isFavorite) {
      await DeleteFromFavorites({ id: item.id, token });
      setFavorite((prev) => !prev);
      return;
    }
    if (isFavorite === false) {
      await AddToFavorite({ id: item.id, token });
      setFavorite((prev) => !prev);
      return;
    }
  }

  return (
    <MyCard style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('rw/recipe', { item })}
      >
        <MyGrid style={styles.grid}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.header}>{item.title}</Text>
          </View>
          {notFav !== true ? (
            <TouchableOpacity onPress={toggleFavorite} style={styles.icon}>
              <MyIcon
                name={isFavorite ? 'heart' : 'heart-outline'}
                color={theme.palette.tertiary}
              />
            </TouchableOpacity>
          ) : null}
        </MyGrid>
      </TouchableOpacity>
    </MyCard>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 0,
    ...theme.shadow,
    backgroundColor: theme.palette.primary,
    height: 100,
  },
  grid: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    ...theme.shadow,
    backgroundColor: theme.palette.primary,
  },
  image: {
    width: 100,
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  header: {
    fontSize: theme.window.windowWidth <= 600 ? 20 : 30,
    color: theme.palette.white,
    fontFamily: theme.font.sansRegular,
    textAlign: 'center',
  },
  time: {
    fontSize: 18,
    color: theme.palette.white,
    fontFamily: theme.font.DancingScriptMedium,
    marginTop: 10,
    textAlign: 'center',
  },
  icon: {
    margin: 10,
  },
});
