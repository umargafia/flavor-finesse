import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';

import Loading from '../components/global/Loading';
import { Theme } from '../constants/Theme';

const theme = Theme();
export default function PrivacyPolicy() {
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://flavorfinesseweb.onrender.com/privacypolicy`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loader}>
          <Loading style={styles.loader} />
        </View>
      )}
      <WebView
        style={styles.webview}
        source={{ uri: url }}
        onLoad={handleLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 100,
    height: theme.window.windowHeight,
    width: theme.window.windowWidth,
  },
  webview: {
    flex: 1,
  },
  loader: {
    transform: [{ translateY: -30 }],
  },
});
