import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Theme } from '../../../constants/Theme';
import MyIcon from '../../global/MyIcon';
import MyGrid from '../../global/MyGrid';
import MyCard from '../../global/MyCard';
import RecipeItem from './RecipeItem';
import InstructionCard from './InstructionCard';
import { getRecipeInstruction } from '../../../store/api';

const theme = Theme();

const MealPlanning = ({ recipe, instruction }) => {
  useEffect(() => {
    console.log(instruction);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>{recipe?.title}</Text>
        <MyGrid style={styles.grid}>
          <MyGrid>
            <MyIcon name="time" color={theme.palette.white} />
            <Text style={styles.subHeaderText}>
              Ready in {recipe?.readyInMinutes} minutes
            </Text>
          </MyGrid>
          <Text style={styles.subHeaderText}>Some dummy text</Text>
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
            keyExtractor={(item) => item.id}
          />
        </MyCard>
        <MyCard style={styles.ingredientsContainer}>
          <Text style={styles.ingredientText}>Instructions</Text>
          <FlatList
            data={instruction}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <InstructionCard item={item} />}
            style={styles.flatList}
            keyExtractor={(item) => item.number}
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
    padding: 10,
  },
  header: {
    fontSize: 30,
    fontFamily: theme.font.firasansBold,
    letterSpacing: 3,
    color: theme.palette.white,
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
