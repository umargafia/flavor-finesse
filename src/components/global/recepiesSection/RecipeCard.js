import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Share,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from '@rneui/base';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../../../constants/Theme';
import MyCard from '../MyCard';
import IconCard from '../IconCard';
import { AddToFavorite, DeleteFromFavorites } from '../../../store/api';
import CustomAlert from '../CustomAlert';
import LoginPrompt from '../LoginPrompt';

const theme = Theme();

const RecipeCard = ({ image, text, onPress, time, uri, item }) => {
  const [isFavorite, setFavorite] = useState(false);
  const { token, favorites, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (favorites) {
      const isItemFavorite = favorites?.some(
        (fav) => fav === item?.id?.toString()
      );
      setFavorite(isItemFavorite);
    }
  }, [favorites]);

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }

    setLoading(true);
    if (!isFavorite) {
      await AddToFavorite({ id: item.id, token });
      setFavorite(true);
    }

    if (isFavorite) {
      await DeleteFromFavorites({ id: item.id, token });
      setFavorite(false);
    }
    setLoading(false);
  };

  const shareRecipe = async () => {
    try {
      const recipeText = `Check out this delicious recipe: ${text}`;
      await Share.share({
        message: recipeText,
      });
    } catch (error) {
      // Handle error here
      console.error('Error sharing recipe:', error);
    }
  };

  return (
    <>
      <MyCard style={styles.card}>
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <LinearGradient
            style={styles.container}
            colors={[theme.palette.primary, theme.palette.tertiary]}
          >
            {isLoading ? (
              <MyCard style={[styles.favIcon, { height: 50, width: 50 }]}>
                <ActivityIndicator
                  size="large"
                  color={theme.palette.tertiary}
                />
              </MyCard>
            ) : (
              <IconCard
                name={isFavorite ? 'heart' : 'heart-outline'}
                component
                style={styles.favIcon}
                color={theme.palette.tertiary}
                onPress={handleFavorite}
              />
            )}
            {/* <IconCard
            name="share"
            component
            style={styles.shareIcon}
            color={theme.palette.tertiary}
            onPress={shareRecipe}
          /> */}

            <Image source={uri ? { uri: uri } : image} style={styles.image} />

            <Divider width={2} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{text}</Text>
            </View>
            {time && <Text style={styles.time}>{time}</Text>}
          </LinearGradient>
        </TouchableOpacity>
      </MyCard>
      <LoginPrompt setShowAlert={setShowAlert} showAlert={showAlert} />
    </>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    padding: 0,
    ...theme.shadow,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
    height: 280,
    width: 300,
    alignSelf: 'center',
  },
  container: {},
  image: {
    height: 180,
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    padding: 15,
    height: '100%',
  },
  text: {
    fontSize: 20,
    color: theme.palette.white,
    fontFamily: theme.font.firasansBold,
    letterSpacing: 3,
    textAlign: 'center',
  },
  favIcon: {
    width: 50,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
    opacity: 0.9,
  },
  shareIcon: {
    width: 50,
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 10,
    opacity: 0.9,
  },
  time: {
    fontFamily: theme.font.sansRegular,
    color: theme.palette.white,
    marginLeft: 16,
    marginBottom: 5,
  },
});
