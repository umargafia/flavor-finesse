import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Theme } from '../../../constants/Theme';
import MyIcon from '../../global/MyIcon';
import MyGrid from '../../global/MyGrid';
import MyCard from '../../global/MyCard';
import RecipeItem from './RecipeItem';
import InstructionCard from './InstructionCard';

const theme = Theme();

const MealPlanning = ({ recipe, instruction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{recipe?.title}</Text>
        </View>

        <MyGrid style={styles.grid}>
          <MyGrid>
            <MyIcon name="time" color={theme.palette.white} />
            <Text style={styles.subHeaderText}>
              Ready in {recipe?.readyInMinutes} minutes
            </Text>
          </MyGrid>

          <MyGrid>
            <MyIcon name="people" color={theme.palette.white} />
            <Text style={styles.subHeaderText}>{recipe?.servings} people</Text>
          </MyGrid>
        </MyGrid>
        <MyCard style={styles.ingredientsContainer}>
          <Text style={styles.ingredientText}>Ingredients</Text>
          <FlatList
            data={recipe?.extendedIngredients}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <RecipeItem item={item} />}
            style={styles.flatList}
            keyExtractor={() => `${Date.now()}-${Math.random()}`}
          />
        </MyCard>
        <MyCard style={styles.ingredientsContainer}>
          <Text style={styles.ingredientText}>Instructions</Text>
          <FlatList
            data={instruction}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <InstructionCard item={item} />}
            style={styles.flatList}
            keyExtractor={() => `${Date.now()}-${Math.random()}`}
          />
        </MyCard>
      </View>
    </View>
  );
};

export default MealPlanning;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 2,
  },
  header: {
    fontSize: theme.window.windowWidth > 600 ? 30 : 20,
    fontFamily: theme.font.firasansBold,
    letterSpacing: 3,
    textAlign: 'center',
    color: theme.palette.primary,
  },
  headerContainer: {
    backgroundColor: theme.palette.white,
    ...theme.shadow,
    transform: [
      {
        translateY: -30,
      },
    ],
    borderRadius: 10,
    padding: 5,
  },
  grid: {
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: 25,
    flexWrap: 'wrap',
    width: theme.window.windowWidth < 600 ? '90%' : '80%',
  },
  subHeaderText: {
    color: theme.palette.white,
    fontFamily: theme.font.sansRegular,
    fontSize: 16,
    letterSpacing: theme.window.windowWidth >= 600 ? 2 : 0,
  },
  ingredientsContainer: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
  ingredientText: {
    fontSize: theme.window.windowWidth <= 360 ? 30 : 40,
    color: 'black',
    fontFamily: theme.font.DancingScriptMedium,
    marginBottom: 20,
    marginLeft: 20,
  },
});
