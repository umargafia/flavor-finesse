import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import MyCard from "../../global/MyCard";
import { Theme } from "../../../constants/Theme";

const theme = Theme();

const CountryCard = ({ country, image }) => {
  return (
    <MyCard style={styles.container}>
      <View style={styles.innerContainer} />
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{country}</Text>
    </MyCard>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    width: 400,
    height: 200,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    width: 400,
    height: 200,
    zIndex: 10,
  },
  title: {
    position: "absolute",
    fontSize: 40,
    top: "50%",
    left: "50%",
    color: theme.palette.white,
    zIndex: 20,
    fontFamily: theme.font.firasansBold,
    letterSpacing: 4,
    transform: [{ translateX: -100 }, { translateY: -40 }],
    textTransform: "uppercase",
  },
});
