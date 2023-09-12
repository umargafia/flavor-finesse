import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Text, TouchableOpacity } from 'react-native';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import MyIcon from '../../components/global/MyIcon';
import MyGrid from '../../components/global/MyGrid';
import { Theme } from '../../constants/Theme';

const adUnitId = TestIds.INTERSTITIAL;
const adKeywords = ['food', 'recipes'];
const theme = Theme();

const useInterstitial = () => {
  const [interstitial, setInterstitial] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigation = useNavigation();

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          if (interstitial && loaded) {
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
        // console.log(interstitial);
        if (interstitial) {
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
      requestNonPersonalizedAdsOnly: true,
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
      if (interstitial && loaded) {
        interstitial.show();
      }
      navigation.goBack();
    },
  };
};

export default useInterstitial;
