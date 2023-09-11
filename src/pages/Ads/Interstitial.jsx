import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function Interstitial() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleAdLoaded = () => {
      setLoaded(true);
    };

    const handleAdClosed = () => {
      setLoaded(false);
      interstitial.load(); // Load a new interstitial after it's closed
    };

    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      handleAdLoaded
    );
    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      handleAdClosed
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  useEffect(() => {
    let timer;

    const showInterstitial = () => {
      if (loaded) {
        interstitial.show();
        timer = setTimeout(showInterstitial, 30000); // Restart the timer
      }
    };

    showInterstitial(); // Start the timer immediately

    return () => {
      clearTimeout(timer);
    };
  }, [loaded]);

  return <View />;
}
