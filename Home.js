import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';

import { checkUser } from './src/store/authSlice';
const AuthPage = lazy(() => import('./src/pages/AuthPage'));
const RecipePage = lazy(() => import('./src/pages/recipesWorld/RecipePage'));
const RecipesPage = lazy(() => import('./src/pages/recipesPage/RecipesPage'));
const BottomTabScreens = lazy(() => import('./src/pages/BottomTabScreens'));
const WelcomeScreen = lazy(() => import('./src/pages/WelcomeScreen'));
const ProfilePage = lazy(() => import('./src/pages/Settings/Profile'));
const AboutScreen = lazy(() => import('./src/pages/Settings/AboutPage'));
const PrivacyPolicy = lazy(() => import('./src/pages/Privacypolicy'));
const TermsAndCondition = lazy(() => import('./src/pages/TermsAndCondition'));
const Loading = lazy(() => import('./src/components/global/Loading'));

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [fontsLoaded] = useFonts({
    'firaSans-Bold': require('./assets/font/FiraSans-Bold.ttf'),
    'DancingScript-Medium': require('./assets/font/DancingScript-Medium.ttf'),
    'Belanosima-Regular': require('./assets/font/Belanosima-Regular.ttf'),
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    checkUser(dispatch);
    onLayoutRootView();
  }, [onLayoutRootView, checkUser]);

  return (
    <Suspense fallback={<Loading />}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          {!user && (
            <Stack.Screen
              name="welcomeScreen"
              component={WelcomeScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          <Stack.Screen
            name={'buttonTabs'}
            component={BottomTabScreens}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name={'recipesPage'} component={RecipesPage} />
          <Stack.Screen
            name="rw/recipe"
            component={RecipePage}
            options={{
              headerShown: false,
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="authPage"
            component={AuthPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="profilePage"
            component={ProfilePage}
            options={{
              title: 'Profile',
            }}
          />
          <Stack.Screen
            name="aboutPage"
            component={AboutScreen}
            options={{
              title: 'About',
            }}
          />
          <Stack.Screen
            name="privacyPolicy"
            component={PrivacyPolicy}
            options={{
              title: 'Privacy Policy',
            }}
          />
          <Stack.Screen
            name="termsAndCondition"
            component={TermsAndCondition}
            options={{
              title: 'Terms And Condition',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}
