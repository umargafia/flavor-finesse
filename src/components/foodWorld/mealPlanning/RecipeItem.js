import { Image, StyleSheet, Text } from 'react-native';

import MyGrid from '../../global/MyGrid';
import MyCard from '../../global/MyCard';
import { Theme } from '../../../constants/Theme';

const theme = Theme();
const RecipeItem = ({ item }) => {
  return (
    <MyCard style={styles.container}>
      <MyGrid>
        <Image
          source={{
            uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.amount}>
          {item.measures.us.amount} {item.measures.us.unitShort}
        </Text>
      </MyGrid>
    </MyCard>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 0,
    ...theme.shadow,
    backgroundColor: theme.palette.white,
  },

  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  innerContainer: {
    justifyContent: 'space-evenly',
    width: '90%',
  },
  name: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: theme.font.sansRegular,
    marginRight: 'auto',
    flex: 3,
  },
  amount: {
    fontSize: 20,
    margin: 10,
    fontFamily: theme.font.firasansBold,
  },
});
