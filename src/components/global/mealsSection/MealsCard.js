import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { Theme } from '../../../constants/Theme';
import MyCard from '../../global/MyCard';
import { LinearGradient } from 'expo-linear-gradient';
import IconCard from '../../global/IconCard';
import { Divider } from '@rneui/base';

const theme = Theme();
const MealsCard = () => {
  const [isFavorite, setFavorite] = useState(false);
  const [isLike, setLike] = useState(false);

  return (
    <MyCard style={styles.container}>
      <LinearGradient
        colors={[theme.palette.primary, theme.palette.tertiary]}
        style={{ flex: 1, width: 250 }}
      >
        <View style={styles.imageContainer}>
          <IconCard
            name={isFavorite ? 'star' : 'star-outline'}
            component
            style={styles.favIcon}
            color={theme.palette.tertiary}
            onPress={() => setFavorite((prev) => !prev)}
          />
          <TouchableOpacity>
            <Image
              source={require('../../../images/breakfast.jpg')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <Divider width={2} />
        <View style={styles.reactContainer}>
          <Text style={styles.title}>Tea And pancake</Text>
          <View style={styles.reactionContainers}>
            <IconCard
              name="share"
              component
              style={styles.reactionCard}
              color={theme.palette.tertiary}
              title={29}
            />

            <IconCard
              name="chatbubble"
              component
              style={styles.reactionCard}
              color={theme.palette.tertiary}
              title={100}
            />
            <IconCard
              name={isLike ? 'heart' : 'heart-outline'}
              component
              style={styles.reactionCard}
              color={theme.palette.tertiary}
              onPress={() => setLike((prev) => !prev)}
              title={'110k'}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 10,
            }}
          >
            <Image style={styles.dp} />
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                color: theme.palette.white,
                fontWeight: 'bold',
              }}
            >
              Umar Musa
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </MyCard>
  );
};

export default MealsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    ...theme.shadow,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 10,
    marginHorizontal: 15,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: 250,
    height: 200,
  },
  favIcon: {
    width: 50,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
    opacity: 0.9,
  },
  reactContainer: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: theme.palette.white,
    fontFamily: theme.font.sansRegular,
    textTransform: 'capitalize',
  },
  reactionContainers: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reactionCard: {
    margin: 10,
    width: 60,
    padding: 5,
  },
  dp: {
    width: 40,
    height: 40,
    backgroundColor: theme.palette.white,
    borderRadius: 30,
  },
});
