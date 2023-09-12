import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  VirtualizedList,
} from 'react-native';
import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Theme } from '../../constants/Theme';
import IconCard from '../../components/global/IconCard';
import { LinearGradient } from 'expo-linear-gradient';
import MealPlanning from '../../components/foodWorld/mealPlanning/MealPlanning';
import MyGrid from '../../components/global/MyGrid';
import {
  AddToFavorite,
  DeleteFromFavorites,
  getFavorites,
  getRecipe,
  getRecipeInstruction,
} from '../../store/api';
import Loading from '../../components/global/Loading';
import MyCard from '../../components/global/MyCard';
import LoginPrompt from '../../components/global/LoginPrompt';
import BannerAds from '../Ads/BannerAds';
import useInterstitial from '../Ads/Interstitial';
const theme = Theme();
const data = [
  {
    id: 1,
  },
];
const RecipePage = ({ navigation, route }) => {
  const { item } = route.params;
  const [recipe, setRecipe] = useState('');
  const [instruction, setInstruction] = useState('');
  const [isFavorite, setFavorite] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { handleBack } = useInterstitial();

  useEffect(() => {
    checkFavorite();
  }, [token, item]);

  const checkFavorite = async () => {
    if (!isAuthenticated) {
      return;
    }
    setFavLoading(true);
    try {
      const favorites = await getFavorites(token);

      const isItemFavorite = favorites.data.favorites?.some(
        (fav) => fav === item?.id?.toString()
      );

      setFavorite(isItemFavorite);
    } catch (error) {
      // console.log(error);
    }
    setFavLoading(false);
  };

  useEffect(() => {
    const getRecipeInfo = async () => {
      setLoading(true);
      try {
        const data = await getRecipe(item?.id);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        // Handle error here
        setLoading(false);
      }
    };

    getRecipeInfo();
  }, [item]);

  useEffect(() => {
    const handleInstructions = async () => {
      try {
        const data = await getRecipeInstruction(item?.id);
        setInstruction(data[0].steps);
      } catch (error) {
        // Handle error here
      }
    };

    handleInstructions();
  }, [item]);

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }
    setFavLoading(true);
    try {
      if (!isFavorite) {
        await AddToFavorite({ id: item.id, token });
        setFavorite(true);
      } else {
        await DeleteFromFavorites({ id: item.id, token });
        setFavorite(false);
      }
    } catch (error) {
      // Handle error here
    }

    setFavLoading(false);
  };

  return (
    <>
      <LoginPrompt setShowAlert={setShowAlert} showAlert={showAlert} />
      <View style={styles.container}>
        {isLoading && <Loading />}
        <View style={styles.iconContainer}>
          <IconCard
            name="chevron-back-outline"
            onPress={handleBack}
            component
            style={styles.backIcon}
            color={theme.palette.white}
          />
          <MyGrid>
            {/* <IconCard
              name="share"
              component
              color={theme.palette.white}
              style={styles.icon}
            /> */}

            {favLoading ? (
              <MyCard style={[styles.favIcon]}>
                <ActivityIndicator size="large" color={theme.palette.white} />
              </MyCard>
            ) : (
              <IconCard
                name={isFavorite ? 'heart' : 'heart-outline'}
                component
                color={theme.palette.white}
                style={styles.icon}
                onPress={handleFavorite}
              />
            )}
          </MyGrid>
        </View>

        <VirtualizedList
          getItemCount={() => data?.length}
          getItem={(data, index) => {
            return {
              id: index,
              title: data.name,
            };
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <>
              <Image style={styles.image} source={{ uri: recipe?.image }} />
              <LinearGradient
                colors={[theme.palette.primary, theme.palette.tertiary]}
                style={styles.textContainer}
              >
                <MealPlanning recipe={recipe} instruction={instruction} />
              </LinearGradient>
            </>
          )}
          keyExtractor={() => `${Date.now()}-${Math.random()}`}
          style={styles.scrolview}
        />
        <BannerAds />
      </View>
    </>
  );
};

export default React.memo(RecipePage);

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
  favIcon: {
    height: 50,
    width: 50,
    backgroundColor: theme.palette.primary,
  },
});
