import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import WelcomeScreen from './src/pages/WelcomeScreen';
import AuthPage from './src/pages/AuthPage';
import HomeScreen from './src/pages/recipesWorld/HomeScreen';
import { useCallback, useEffect } from 'react';
import SearchPage from './src/pages/recipesWorld/SearchPage';
import RecipePage from './src/pages/recipesWorld/RecipePage';
import MyIcon from './src/components/global/MyIcon';
import { Theme } from './src/constants/Theme';
import Favorite from './src/pages/Favorite/Favorite';
import Settings from './src/pages/Settings/Settings';
import { checkUser } from './src/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
const BottomTabs = createBottomTabNavigator();
const theme = Theme();

function BottomTabScreens() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.palette.tertiary,
        tabBarIconStyle: () => {},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'rw/home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'rw/Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'favorite') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'settings') {
            iconName = focused ? 'grid' : 'grid-outline';
          }
          return <MyIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTabs.Screen
        name="rw/home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="rw/Search"
        component={SearchPage}
        options={{
          title: 'Search',
        }}
      />
      <BottomTabs.Screen
        name="favorite"
        component={Favorite}
        options={{
          title: 'Favorite',
        }}
      />
      <BottomTabs.Screen
        name="settings"
        component={Settings}
        options={{
          title: 'More',
        }}
      />
    </BottomTabs.Navigator>
  );
}

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
