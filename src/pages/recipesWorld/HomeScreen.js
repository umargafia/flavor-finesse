import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Theme } from '../../constants/Theme';
import Course from '../../components/foodWorld/courseSection/Course';
import MealsSection from '../../components/global/mealsSection/MealsScetion';
import FoodTypeSection from '../../components/foodWorld/foodType/FoodTypeSection';
import CountrySection from '../../components/foodWorld/countrySection/CountrySection';
import Header from '../../components/global/Header';
import Recipe from '../../components/global/recepiesSection/Recipe';

const theme = Theme();

const HomeScreen = () => {
  const { type } = useSelector((state) => state.foodWorld);
  const data = [{ id: 1 }];
  return (
    <View style={styles.container}>
      <Header text="Flavor Finesse" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <Recipe item={item} data={type} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.contentContainer}>
            <FoodTypeSection />
            {type === 'all' && (
              <>
                <Course />
                <MealsSection />
                <CountrySection />
              </>
            )}
          </View>
        }
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
