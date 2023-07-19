import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from '@rneui/base';
import { SharedElement } from 'react-native-shared-element';

import { Theme } from '../../../constants/Theme';
import MyCard from '../MyCard';
import IconCard from '../IconCard';

const theme = Theme();

const RecipeCard = ({ image, text, onPress, time, uri }) => {
  const [isFavorite, setFavorite] = useState(false);

  return (
    <MyCard style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <LinearGradient
          style={styles.container}
          colors={[theme.palette.primary, theme.palette.tertiary]}
        >
          <IconCard
            name={isFavorite ? 'star' : 'star-outline'}
            component
            style={styles.favIcon}
            color={theme.palette.tertiary}
            onPress={() => setFavorite((prev) => !prev)}
          />
          <IconCard
            name="share"
            component
            style={styles.shareIcon}
            color={theme.palette.tertiary}
            onPress={() => setFavorite((prev) => !prev)}
          />
          <SharedElement id="image">
            <Image source={uri ? { uri: uri } : image} style={styles.image} />
          </SharedElement>
          <Divider width={2} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
          {time && <Text style={styles.time}>{time}</Text>}
        </LinearGradient>
      </TouchableOpacity>
    </MyCard>
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
    minHeight: 239,
    width: theme.window.windowWidth < 800 ? '90%' : 350,
    alignSelf: 'center',
  },
  container: {
    minHeight: 239,
  },
  image: {
    height: 180,
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
    padding: 15,
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
