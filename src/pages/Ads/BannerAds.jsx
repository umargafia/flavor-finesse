import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adId = 'ca-app-pub-1591256891479203/5478059595';
export default function BannerAds() {
  return (
    <View>
      <BannerAd
        unitId={adId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
