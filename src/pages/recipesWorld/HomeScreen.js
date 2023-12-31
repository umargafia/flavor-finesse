import { FlatList, StyleSheet, View, VirtualizedList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Theme } from '../../constants/Theme';
import Course from '../../components/foodWorld/courseSection/Course';
import FoodTypeSection from '../../components/foodWorld/foodType/FoodTypeSection';
import CountrySection from '../../components/foodWorld/countrySection/CountrySection';
import Header from '../../components/global/Header';
import Recipe from '../../components/global/recepiesSection/Recipe';
import { getFavorites } from '../../store/api';
import { saveFavorites } from '../../store/authSlice';
import Trending from '../../components/foodWorld/Trending/Trending';

const theme = Theme();

const HomeScreen = () => {
  const { type } = useSelector((state) => state.foodWorld);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const data = [{ id: 1 }];

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const data = await getFavorites(token);
    dispatch(saveFavorites(data?.data?.favorites));
  };

  return (
    <View style={styles.container}>
      <Header text="Flavor Finesse" />
      <VirtualizedList
        showsVerticalScrollIndicator={false}
        getItemCount={() => data?.length}
        getItem={(data, index) => {
          return {
            id: index,
            title: data.name,
          };
        }}
        data={data}
        renderItem={({ item }) => <Recipe item={item} data={type} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.contentContainer}>
            <FoodTypeSection />
            {type === 'all' && (
              <>
                <Course />
                <Trending />
                <CountrySection />
              </>
            )}
          </View>
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },

  inputContainer: {
    marginTop: 30,
    width: '95%',
  },
  input: {
    backgroundColor: theme.palette.white,
    borderColor: theme.palette.primary,
    borderWidth: 1,
    ...theme.ShadowLight,
  },
  scrollView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 1,
  },
});
