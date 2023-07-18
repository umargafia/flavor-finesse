import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { SharedElement } from 'react-native-shared-element';

import { Theme } from '../../constants/Theme';
import IconCard from '../../components/global/IconCard';
import { LinearGradient } from 'expo-linear-gradient';
import MealPlanning from '../../components/foodWorld/mealPlanning/MealPlanning';
import MyGrid from '../../components/global/MyGrid';

const theme = Theme();
const data = [
  {
    id: 1,
  },
];
const RecipePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconCard
          name="chevron-back-outline"
          onPress={() => navigation.goBack()}
          component
          style={styles.backIcon}
          color={theme.palette.white}
        />
        <MyGrid>
          <IconCard
            name="share"
            component
            color={theme.palette.white}
            style={styles.icon}
          />
          <IconCard
            name="star"
            component
            color={theme.palette.white}
            style={styles.icon}
          />
        </MyGrid>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <>
            <SharedElement
              id="image"
              sharedTransitionTag="image"
              style={styles.sharedElement}
            >
              <Image
                style={styles.image}
                source={require('../../images/american.jpg')}
              />
            </SharedElement>
            <LinearGradient
              colors={[theme.palette.primary, theme.palette.tertiary]}
              style={styles.textContainer}
            >
              <MealPlanning />
            </LinearGradient>
          </>
        )}
        keyExtractor={(item) => item.id}
        style={styles.scrolview}
      />
    </View>
  );
};

export default RecipePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  icon: {
    backgroundColor: theme.palette.primary,
    marginRight: 10,
  },

  backIcon: {
    height: 50,
    marginRight: 10,
    backgroundColor: theme.palette.tertiary,
    alignSelf: 'center',
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
    marginHorizontal: 10,
  },

  scrolview: {
    minHeight: 100,
    marginTop: -58,
    zIndex: 10,
    backgroundColor: theme.palette.white,
    overflow: 'hidden',
  },
  sharedElement: {
    position: 'relative',
    top: -60,
    left: 0,
    zIndex: 10,
    overflow: 'hidden',
    ...theme.ShadowLight,
  },
  image: {
    width: '100%',
    height: theme.window.windowHeight / 1.9,
    borderTopLeftRadius: 10,
  },
  textContainer: {
    zIndex: 20,
    minHeight: 50,
    marginTop: -100,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 10,
  },
});
