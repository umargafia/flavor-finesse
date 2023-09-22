import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Text, TouchableOpacity } from 'react-native';
import { AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
import MyIcon from '../../components/global/MyIcon';
import MyGrid from '../../components/global/MyGrid';
import { Theme } from '../../constants/Theme';

const adUnitId = 'ca-app-pub-1591256891479203/9345529718';
const adKeywords = [
  'Cooking Recipes',
  'Recipe Ideas',
  'Culinary Delights',
  'Gourmet Dishes',
  'Kitchen Inspiration',
  'Flavorful Creations',
  "Chef's Specials",
  'Homemade Meals',
  'Culinary Adventures',
  'Gastronomic Delights',
  'Cooking Tutorials',
  'Recipe Finder',
  'Quick & Easy Recipes',
  'Healthy Cooking',
  'Family-Friendly Meals',
  'Taste Sensations',
  'Meal Planning Made Easy',
  'Fresh Ingredients',
  'Recipe Collections',
  'International Flavors',
];

const theme = Theme();

const useInterstitial = () => {
  const [interstitial, setInterstitial] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigation = useNavigation();

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          console.log(interstitial);
          if (interstitial && interstitial._loaded) {
            interstitial.show();
          }
          navigation.goBack();
        }}
      >
        <MyGrid style={{ marginRight: 20 }}>
          <MyIcon name="chevron-back" color={theme.palette.tertiary} />
          <Text style={{ color: theme.palette.tertiary }}>Back</Text>
        </MyGrid>
      </TouchableOpacity>
    ),
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        console.log(interstitial);
        if (interstitial && interstitial._loaded) {
          interstitial.show();
        }
        return false;
      }
    );

    return () => {
      BackHandler.removeEventListener();
    };
  }, [interstitial]);

  const loadInterstitial = useCallback(() => {
    const interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: false,
      keywords: adKeywords,
    });

    const unsubscribeLoaded = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
        // console.log('load');
      }
    );

    interstitialAd.load();
    setInterstitial(interstitialAd);

    return () => {
      unsubscribeLoaded();
    };
  }, []);

  useEffect(() => {
    if (!interstitial) {
      loadInterstitial();
    }
  }, [interstitial, loadInterstitial]);

  return {
    handleBack: () => {
      if (interstitial && interstitial._loaded) {
        interstitial.show();
      }
      navigation.goBack();
    },
  };
};

export default useInterstitial;
