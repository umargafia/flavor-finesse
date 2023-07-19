import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';

import AuthPage from './src/pages/AuthPage';
import { useCallback, useEffect } from 'react';
import RecipePage from './src/pages/recipesWorld/RecipePage';
import { checkUser } from './src/store/authSlice';
import RecipesPage from './src/pages/recipesPage/RecipesPage';
import BottomTabScreens from './src/pages/BottomTabScreens';

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
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          {/* {!user && (
            <Stack.Screen
              name="welcomeScreen"
              component={WelcomeScreen}
              options={{
                headerShown: false,
              }}
            />
          )} */}
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
